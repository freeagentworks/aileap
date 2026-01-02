'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'

interface EdgesProps {
  positions: THREE.Vector3[]
  connections: Array<[number, number]>
  pulseSpeed?: number
}

/**
 * エッジ（接続線）コンポーネント
 * 太い水色の軸索風ライン
 */
export function Edges({ positions, connections, pulseSpeed = 2 }: EdgesProps) {
  const groupRef = useRef<THREE.Group>(null)
  const pulseRef = useRef<THREE.Points>(null)
  
  // パルスデータ
  const pulseData = useMemo(() => {
    return connections.map(() => ({
      progress: Math.random(),
      speed: 0.3 + Math.random() * 0.4,
      size: 0.025 + Math.random() * 0.035,
      direction: Math.random() > 0.5 ? 1 : -1,
    }))
  }, [connections])

  // 各接続線のデータを準備
  const lineData = useMemo(() => {
    return connections.map(([i, j]) => ({
      points: [
        [positions[i].x, positions[i].y, positions[i].z] as [number, number, number],
        [positions[j].x, positions[j].y, positions[j].z] as [number, number, number],
      ],
      // 距離に応じて色の明るさを変える
      distance: positions[i].distanceTo(positions[j]),
    }))
  }, [positions, connections])

  // パルス用ジオメトリ
  const pulseGeometry = useMemo(() => {
    const pulsePositions = new Float32Array(connections.length * 3)
    const pulseSizes = new Float32Array(connections.length)
    
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pulsePositions, 3))
    geo.setAttribute('size', new THREE.BufferAttribute(pulseSizes, 1))
    
    return geo
  }, [connections])

  // パルス用シェーダーマテリアル（ピンク - 神経インパルス）
  const pulseMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color('#FF69B4') },
      },
      vertexShader: `
        attribute float size;
        varying float vSize;
        uniform float time;
        
        void main() {
          vSize = size;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (350.0 / -mvPosition.z);
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
          alpha *= 0.95;
          
          vec3 finalColor = mix(color, vec3(1.0, 0.95, 0.98), smoothstep(0.3, 0.0, dist));
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    pulseMaterial.uniforms.time.value = time
    
    if (!pulseRef.current) return
    
    const pulsePositions = pulseGeometry.attributes.position.array as Float32Array
    const pulseSizes = pulseGeometry.attributes.size.array as Float32Array
    
    connections.forEach(([i, j], index) => {
      const pulse = pulseData[index]
      
      pulse.progress += pulse.speed * 0.01 * pulse.direction
      if (pulse.progress > 1 || pulse.progress < 0) {
        pulse.direction *= -1
        pulse.progress = Math.max(0, Math.min(1, pulse.progress))
      }
      
      const x = positions[i].x + (positions[j].x - positions[i].x) * pulse.progress
      const y = positions[i].y + (positions[j].y - positions[i].y) * pulse.progress
      const z = positions[i].z + (positions[j].z - positions[i].z) * pulse.progress
      
      pulsePositions[index * 3] = x
      pulsePositions[index * 3 + 1] = y
      pulsePositions[index * 3 + 2] = z
      
      pulseSizes[index] = pulse.size * (1 + Math.sin(time * 3 + index) * 0.3)
    })
    
    pulseGeometry.attributes.position.needsUpdate = true
    pulseGeometry.attributes.size.needsUpdate = true
  })

  return (
    <group ref={groupRef}>
      {/* 太い接続線 */}
      {lineData.map((line, index) => (
        <Line
          key={index}
          points={line.points}
          color="#00D4FF"
          lineWidth={2.5}
          transparent
          opacity={0.4 + (1 - line.distance / 2) * 0.3}
        />
      ))}
      
      {/* 神経インパルス（流れる光点） */}
      <points ref={pulseRef} geometry={pulseGeometry} material={pulseMaterial} />
    </group>
  )
}

export default Edges
