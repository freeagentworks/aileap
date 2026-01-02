'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticlesProps {
  count?: number
}

/**
 * 強化版背景パーティクル
 * ニューロン環境をイメージした暖色系
 */
export function Particles({ count = 500 }: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const starsRef = useRef<THREE.Points>(null)
  
  // メインパーティクル
  const [positions, velocities, sizes, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    const size = new Float32Array(count)
    const col = new Float32Array(count * 3)
    
    // 暖色系のカラーパレット
    const color1 = new THREE.Color('#FF6B6B') // 淡い赤/コーラル
    const color2 = new THREE.Color('#FFB347') // オレンジ
    const color3 = new THREE.Color('#FFDA77') // ゴールド/イエロー
    const color4 = new THREE.Color('#FFFFFF') // 白
    const color5 = new THREE.Color('#FFE4E1') // ミスティローズ
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      // 球状 + ランダム分布
      const radius = 5 + Math.random() * 10
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      
      pos[i3] = radius * Math.sin(phi) * Math.cos(theta)
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      pos[i3 + 2] = radius * Math.cos(phi)
      
      vel[i3] = (Math.random() - 0.5) * 0.003
      vel[i3 + 1] = (Math.random() - 0.5) * 0.003
      vel[i3 + 2] = (Math.random() - 0.5) * 0.003
      
      size[i] = Math.random() * 1.5 + 0.5
      
      // 色をランダムに割り当て
      const colorChoice = Math.random()
      let chosenColor
      if (colorChoice < 0.25) {
        chosenColor = color1 // コーラル
      } else if (colorChoice < 0.45) {
        chosenColor = color2 // オレンジ
      } else if (colorChoice < 0.65) {
        chosenColor = color3 // ゴールド
      } else if (colorChoice < 0.85) {
        chosenColor = color4 // 白
      } else {
        chosenColor = color5 // ミスティローズ
      }
      
      col[i3] = chosenColor.r
      col[i3 + 1] = chosenColor.g
      col[i3 + 2] = chosenColor.b
    }
    
    return [pos, vel, size, col]
  }, [count])

  // 遠くの星（静的 - 淡いピンク〜白）
  const starData = useMemo(() => {
    const starCount = 200
    const pos = new Float32Array(starCount * 3)
    const size = new Float32Array(starCount)
    
    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3
      const radius = 15 + Math.random() * 15
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      
      pos[i3] = radius * Math.sin(phi) * Math.cos(theta)
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      pos[i3 + 2] = radius * Math.cos(phi)
      
      size[i] = Math.random() * 0.8 + 0.2
    }
    
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    geo.setAttribute('size', new THREE.BufferAttribute(size, 1))
    
    return geo
  }, [])

  // メインパーティクルジオメトリ
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return geo
  }, [positions, sizes, colors])

  // メインマテリアル
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying float vOpacity;
        varying vec3 vColor;
        uniform float time;
        
        void main() {
          vColor = color;
          vOpacity = 0.4 + 0.4 * sin(time * 0.5 + position.x * 0.3 + position.y * 0.2);
          
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (250.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying float vOpacity;
        varying vec3 vColor;
        
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          
          float alpha = 1.0 - smoothstep(0.1, 0.5, dist);
          alpha *= vOpacity;
          
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  }, [])

  // 星マテリアル（淡いピンク〜白の瞬き）
  const starMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        attribute float size;
        uniform float time;
        varying float vTwinkle;
        
        void main() {
          vTwinkle = 0.3 + 0.7 * abs(sin(time * 2.0 + position.x * 10.0));
          
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (200.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying float vTwinkle;
        
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          
          float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
          alpha *= vTwinkle * 0.5;
          
          // 淡いピンク〜白
          vec3 color = mix(vec3(1.0, 0.9, 0.95), vec3(1.0), vTwinkle);
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    material.uniforms.time.value = time
    starMaterial.uniforms.time.value = time
    
    if (!pointsRef.current) return
    
    // パーティクル移動
    const positionAttribute = geometry.attributes.position as THREE.BufferAttribute
    const posArray = positionAttribute.array as Float32Array
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      posArray[i3] += velocities[i3]
      posArray[i3 + 1] += velocities[i3 + 1]
      posArray[i3 + 2] += velocities[i3 + 2]
      
      const dist = Math.sqrt(
        posArray[i3] ** 2 +
        posArray[i3 + 1] ** 2 +
        posArray[i3 + 2] ** 2
      )
      
      if (dist > 15 || dist < 4) {
        velocities[i3] *= -1
        velocities[i3 + 1] *= -1
        velocities[i3 + 2] *= -1
      }
    }
    
    positionAttribute.needsUpdate = true
    
    // 全体回転
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.015
      pointsRef.current.rotation.x = Math.sin(time * 0.01) * 0.1
    }
    
    if (starsRef.current) {
      starsRef.current.rotation.y = time * 0.005
    }
  })

  return (
    <group>
      <points ref={starsRef} geometry={starData} material={starMaterial} />
      <points ref={pointsRef} geometry={geometry} material={material} />
    </group>
  )
}

export default Particles
