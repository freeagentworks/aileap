'use client'

import { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import * as THREE from 'three'
import { NeuralNetwork } from './NeuralNetwork'
import { Particles } from './Particles'

interface SceneProps {
  className?: string
}

// 環境グロー（背景のソフトな水色光）
function AmbientGlow() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    
    const scale = 1 + Math.sin(time * 0.3) * 0.1
    meshRef.current.scale.setScalar(scale)
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <sphereGeometry args={[8, 32, 32]} />
      <meshBasicMaterial
        color="#00D4FF"
        transparent
        opacity={0.02}
        side={THREE.BackSide}
      />
    </mesh>
  )
}

// カメラアニメーション
function CameraAnimation() {
  const { camera } = useThree()
  const initialPosition = useRef(new THREE.Vector3(0, 0, 6))
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    camera.position.x = initialPosition.current.x + Math.sin(time * 0.2) * 0.1
    camera.position.y = initialPosition.current.y + Math.cos(time * 0.15) * 0.1
    
    camera.lookAt(0, 0, 0)
  })

  return null
}

/**
 * Three.jsシーン
 * 水色クリスタル + マゼンタ核のニューロン
 */
export function Scene({ className }: SceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    setIsReady(true)
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!isReady) {
    return (
      <div className={className}>
        <div className="absolute inset-0 bg-gradient-to-b from-background-surface to-background" />
      </div>
    )
  }

  return (
    <div ref={containerRef} className={className} style={{ position: 'relative' }}>
      <Canvas
        camera={{
          position: [0, 0, 6],
          fov: 60,
          near: 0.1,
          far: 100,
        }}
        dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.3,
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <Suspense fallback={null}>
          {/* 基本ライティング */}
          <ambientLight intensity={0.15} />
          
          {/* メインライト - 白 */}
          <pointLight position={[10, 10, 10]} intensity={0.25} color="#FFFFFF" />
          
          {/* 水色アクセントライト */}
          <pointLight position={[-8, 5, -5]} intensity={0.3} color="#00D4FF" />
          <pointLight position={[5, -8, 5]} intensity={0.25} color="#40E0D0" />
          
          {/* ピンクアクセントライト */}
          <pointLight position={[0, 8, 3]} intensity={0.15} color="#FF69B4" />
          
          {/* カメラアニメーション */}
          <CameraAnimation />
          
          {/* 環境グロー */}
          <AmbientGlow />
          
          {/* ニューラルネットワーク */}
          <NeuralNetwork
            nodeCount={isMobile ? 50 : 90}
            connectionDistance={isMobile ? 1.8 : 2.0}
            mouseInfluence={0.6}
          />
          
          {/* 背景パーティクル */}
          <Particles count={isMobile ? 300 : 600} />
          
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Scene
