'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface EdgesProps {
  positions: THREE.Vector3[]
  connections: Array<[number, number]>
  pulseSpeed?: number
}

/**
 * 強化版エッジ（接続線）コンポーネント
 * 実際のニューロン軸索をイメージした暖色系
 */
export function Edges({ positions, connections, pulseSpeed = 2 }: EdgesProps) {
  const linesRef = useRef<THREE.LineSegments>(null)
  const pulseRef = useRef<THREE.Points>(null)
  
  // パルスデータ（接続線上を流れる光の点 - 神経インパルスをイメージ）
  const pulseData = useMemo(() => {
    return connections.map((_, i) => ({
      progress: Math.random(),
      speed: 0.3 + Math.random() * 0.4,
      size: 0.02 + Math.random() * 0.03,
      direction: Math.random() > 0.5 ? 1 : -1,
    }))
  }, [connections])

  // ライン用シェーダーマテリアル（マゼンタ→オレンジ→ゴールド）
  const lineMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        // マゼンタ/ディープピンク
        color1: { value: new THREE.Color('#FF1493') },
        // オレンジ
        color2: { value: new THREE.Color('#FF6B00') },
        // ゴールド
        color3: { value: new THREE.Color('#FFB800') },
      },
      vertexShader: `
        attribute float lineIndex;
        varying float vLineIndex;
        varying vec3 vPosition;
        
        void main() {
          vLineIndex = lineIndex;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        varying float vLineIndex;
        varying vec3 vPosition;
        
        void main() {
          // 3色間でのグラデーション
          float t = sin(time * 1.5 + vLineIndex * 0.3 + vPosition.y * 0.2) * 0.5 + 0.5;
          vec3 color;
          if (t < 0.5) {
            color = mix(color1, color2, t * 2.0);
          } else {
            color = mix(color2, color3, (t - 0.5) * 2.0);
          }
          
          // 距離に応じたフェード
          float dist = length(vPosition);
          float alpha = 0.18 + 0.15 * sin(time + vLineIndex);
          alpha *= smoothstep(6.0, 2.0, dist);
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  }, [])

  // パルス用シェーダーマテリアル（神経インパルス - 明るいオレンジ/ゴールド）
  const pulseMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color('#FFAA00') },
      },
      vertexShader: `
        attribute float size;
        varying float vSize;
        uniform float time;
        
        void main() {
          vSize = size;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform float time;
        varying float vSize;
        
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          
          float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
          alpha *= 0.9;
          
          // 中心は白〜淡いピンクに
          vec3 finalColor = mix(color, vec3(1.0, 0.95, 0.9), smoothstep(0.3, 0.0, dist));
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  }, [])

  // ジオメトリ生成
  const { lineGeometry, pulseGeometry } = useMemo(() => {
    // ライン用
    const linePositions = new Float32Array(connections.length * 6)
    const lineIndices = new Float32Array(connections.length * 2)
    
    connections.forEach(([i, j], index) => {
      const offset = index * 6
      linePositions[offset] = positions[i].x
      linePositions[offset + 1] = positions[i].y
      linePositions[offset + 2] = positions[i].z
      linePositions[offset + 3] = positions[j].x
      linePositions[offset + 4] = positions[j].y
      linePositions[offset + 5] = positions[j].z
      
      lineIndices[index * 2] = index
      lineIndices[index * 2 + 1] = index
    })
    
    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    lineGeo.setAttribute('lineIndex', new THREE.BufferAttribute(lineIndices, 1))
    
    // パルス用
    const pulsePositions = new Float32Array(connections.length * 3)
    const pulseSizes = new Float32Array(connections.length)
    
    const pulseGeo = new THREE.BufferGeometry()
    pulseGeo.setAttribute('position', new THREE.BufferAttribute(pulsePositions, 3))
    pulseGeo.setAttribute('size', new THREE.BufferAttribute(pulseSizes, 1))
    
    return { lineGeometry: lineGeo, pulseGeometry: pulseGeo }
  }, [positions, connections])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    lineMaterial.uniforms.time.value = time
    pulseMaterial.uniforms.time.value = time
    
    if (!pulseRef.current) return
    
    const pulsePositions = pulseGeometry.attributes.position.array as Float32Array
    const pulseSizes = pulseGeometry.attributes.size.array as Float32Array
    
    connections.forEach(([i, j], index) => {
      const pulse = pulseData[index]
      
      // 進捗を更新
      pulse.progress += pulse.speed * 0.01 * pulse.direction
      if (pulse.progress > 1 || pulse.progress < 0) {
        pulse.direction *= -1
        pulse.progress = Math.max(0, Math.min(1, pulse.progress))
      }
      
      // 位置を補間
      const x = positions[i].x + (positions[j].x - positions[i].x) * pulse.progress
      const y = positions[i].y + (positions[j].y - positions[i].y) * pulse.progress
      const z = positions[i].z + (positions[j].z - positions[i].z) * pulse.progress
      
      pulsePositions[index * 3] = x
      pulsePositions[index * 3 + 1] = y
      pulsePositions[index * 3 + 2] = z
      
      // サイズをパルス
      pulseSizes[index] = pulse.size * (1 + Math.sin(time * 3 + index) * 0.3)
    })
    
    pulseGeometry.attributes.position.needsUpdate = true
    pulseGeometry.attributes.size.needsUpdate = true
  })

  return (
    <group>
      <lineSegments ref={linesRef} geometry={lineGeometry} material={lineMaterial} />
      <points ref={pulseRef} geometry={pulseGeometry} material={pulseMaterial} />
    </group>
  )
}

export default Edges
