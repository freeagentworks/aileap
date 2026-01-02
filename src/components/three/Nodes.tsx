'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface NodesProps {
  positions: THREE.Vector3[]
  mouseInfluence?: number
}

/**
 * リアルなニューロン風ノードコンポーネント
 * 核（中心）は明るく、細胞膜（周囲）は半透明
 */
export function Nodes({ positions, mouseInfluence = 0.5 }: NodesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const glowMeshRef = useRef<THREE.InstancedMesh>(null)
  const outerMeshRef = useRef<THREE.InstancedMesh>(null)
  const { mouse, viewport } = useThree()
  
  // 各ノードの初期状態を保存
  const nodeData = useMemo(() => {
    return positions.map((pos, i) => ({
      originalPosition: pos.clone(),
      size: 0.03 + Math.random() * 0.05,
      phase: Math.random() * Math.PI * 2,
      speed: 0.3 + Math.random() * 0.4,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.5 + Math.random() * 0.5,
    }))
  }, [positions])

  const dummy = useMemo(() => new THREE.Object3D(), [])
  
  // 核マテリアル（中心 - 明るく不透明）
  const nucleusMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        baseColor: { value: new THREE.Color('#FFFFFF') },
        glowColor: { value: new THREE.Color('#FFE4E1') },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec2 vUv;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 baseColor;
        uniform vec3 glowColor;
        varying vec3 vNormal;
        varying vec2 vUv;
        
        void main() {
          // 中心ほど明るく
          float fresnel = dot(vNormal, vec3(0.0, 0.0, 1.0));
          fresnel = pow(fresnel, 1.5);
          
          // 脈動
          float pulse = 0.9 + 0.1 * sin(time * 2.0);
          
          vec3 color = mix(glowColor, baseColor, fresnel * pulse);
          float alpha = 0.95;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      depthWrite: true,
    })
  }, [])

  // 細胞質グローマテリアル（核の周り - やや透明）
  const cytoplasmMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color('#FF1493') },
        color2: { value: new THREE.Color('#FF6B00') },
        color3: { value: new THREE.Color('#FFB800') },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          // フレネル効果 - エッジを強調
          float fresnel = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
          fresnel = pow(fresnel, 2.0);
          
          // 3色間でのグラデーション
          float t = sin(time * 0.3 + vPosition.x * 0.5 + vPosition.y * 0.3) * 0.5 + 0.5;
          vec3 color;
          if (t < 0.5) {
            color = mix(color1, color2, t * 2.0);
          } else {
            color = mix(color2, color3, (t - 0.5) * 2.0);
          }
          
          // 透過度を高めに（0.3 - 0.5程度）
          float alpha = fresnel * 0.45;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      depthWrite: false,
    })
  }, [])

  // 細胞膜マテリアル（最外層 - 非常に透明な膜）
  const membraneMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color('#FF8C69') },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          // エッジのみ見える薄い膜
          float fresnel = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
          fresnel = pow(fresnel, 3.0);
          
          // 脈動
          float pulse = 0.8 + 0.2 * sin(time * 1.5 + vPosition.x * 2.0);
          
          // 非常に透明（0.1 - 0.2程度）
          float alpha = fresnel * 0.18 * pulse;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
  }, [])

  useFrame((state) => {
    if (!meshRef.current || !glowMeshRef.current || !outerMeshRef.current) return
    
    const time = state.clock.getElapsedTime()
    nucleusMaterial.uniforms.time.value = time
    cytoplasmMaterial.uniforms.time.value = time
    membraneMaterial.uniforms.time.value = time
    
    const mouseX = (mouse.x * viewport.width) / 2
    const mouseY = (mouse.y * viewport.height) / 2
    
    nodeData.forEach((node, i) => {
      // パルスアニメーション
      const pulse = 1 + Math.sin(time * node.pulseSpeed + node.pulsePhase) * 0.12
      
      // 浮遊アニメーション
      const floatY = Math.sin(time * node.speed + node.phase) * 0.15
      const floatX = Math.cos(time * node.speed * 0.7 + node.phase) * 0.08
      const floatZ = Math.sin(time * node.speed * 0.5 + node.phase) * 0.05
      
      let x = node.originalPosition.x + floatX
      let y = node.originalPosition.y + floatY
      let z = node.originalPosition.z + floatZ
      
      // マウスへの引力
      const dx = mouseX - x
      const dy = mouseY - y
      const dist = Math.sqrt(dx * dx + dy * dy)
      
      if (dist < 4) {
        const force = (1 - dist / 4) * mouseInfluence * 0.4
        x += dx * force
        y += dy * force
        z += (1 - dist / 4) * 0.3
      }
      
      // 核（中心）- 一番小さい
      dummy.position.set(x, y, z)
      dummy.scale.setScalar(node.size * pulse * 0.6)
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
      
      // 細胞質グロー - 中間サイズ
      dummy.scale.setScalar(node.size * pulse * 1.8)
      dummy.updateMatrix()
      glowMeshRef.current!.setMatrixAt(i, dummy.matrix)
      
      // 細胞膜 - 一番大きい（薄い膜）
      dummy.scale.setScalar(node.size * pulse * 3.0)
      dummy.updateMatrix()
      outerMeshRef.current!.setMatrixAt(i, dummy.matrix)
    })
    
    meshRef.current.instanceMatrix.needsUpdate = true
    glowMeshRef.current.instanceMatrix.needsUpdate = true
    outerMeshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <group>
      {/* 細胞膜（最外層 - 非常に透明） */}
      <instancedMesh
        ref={outerMeshRef}
        args={[undefined, undefined, positions.length]}
        material={membraneMaterial}
      >
        <sphereGeometry args={[1, 24, 24]} />
      </instancedMesh>
      
      {/* 細胞質グロー（中間層 - 半透明） */}
      <instancedMesh
        ref={glowMeshRef}
        args={[undefined, undefined, positions.length]}
        material={cytoplasmMaterial}
      >
        <sphereGeometry args={[1, 20, 20]} />
      </instancedMesh>
      
      {/* 核（中心 - 明るく不透明） */}
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, positions.length]}
        material={nucleusMaterial}
      >
        <sphereGeometry args={[1, 16, 16]} />
      </instancedMesh>
    </group>
  )
}

export default Nodes
