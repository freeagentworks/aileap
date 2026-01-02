'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Nodes } from './Nodes'
import { Edges } from './Edges'

interface NeuralNetworkProps {
  nodeCount?: number
  connectionDistance?: number
  mouseInfluence?: number
  pulseSpeed?: number
}

/**
 * 強化版ニューラルネットワーク
 * より美しく、よりインタラクティブに
 */
export function NeuralNetwork({
  nodeCount = 80,
  connectionDistance = 2.0,
  mouseInfluence = 0.5,
  pulseSpeed = 2,
}: NeuralNetworkProps) {
  const groupRef = useRef<THREE.Group>(null)
  const innerGroupRef = useRef<THREE.Group>(null)
  const { mouse, viewport } = useThree()
  
  // ノード位置の初期化（多層フィボナッチ球面分布）
  const nodePositions = useMemo(() => {
    const positions: THREE.Vector3[] = []
    const phi = Math.PI * (3 - Math.sqrt(5))
    
    // 3層構造
    const layers = [
      { count: Math.floor(nodeCount * 0.3), radiusMin: 1.5, radiusMax: 2.2 },
      { count: Math.floor(nodeCount * 0.4), radiusMin: 2.5, radiusMax: 3.3 },
      { count: Math.floor(nodeCount * 0.3), radiusMin: 3.5, radiusMax: 4.2 },
    ]
    
    layers.forEach((layer) => {
      for (let i = 0; i < layer.count; i++) {
        const y = 1 - (i / (layer.count - 1)) * 2
        const radius = Math.sqrt(1 - y * y)
        const theta = phi * i
        
        const r = layer.radiusMin + Math.random() * (layer.radiusMax - layer.radiusMin)
        
        positions.push(
          new THREE.Vector3(
            Math.cos(theta) * radius * r,
            y * r,
            Math.sin(theta) * radius * r
          )
        )
      }
    })
    
    return positions
  }, [nodeCount])

  // エッジの接続情報を計算
  const connections = useMemo(() => {
    const edges: Array<[number, number]> = []
    const maxConnectionsPerNode = 4
    const connectionCounts = new Array(nodePositions.length).fill(0)
    
    // 距離でソートしてから接続を決定
    const potentialConnections: Array<{ i: number; j: number; dist: number }> = []
    
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        const distance = nodePositions[i].distanceTo(nodePositions[j])
        if (distance < connectionDistance) {
          potentialConnections.push({ i, j, dist: distance })
        }
      }
    }
    
    // 距離が短い順にソート
    potentialConnections.sort((a, b) => a.dist - b.dist)
    
    // 接続を作成
    for (const conn of potentialConnections) {
      if (
        connectionCounts[conn.i] < maxConnectionsPerNode &&
        connectionCounts[conn.j] < maxConnectionsPerNode
      ) {
        edges.push([conn.i, conn.j])
        connectionCounts[conn.i]++
        connectionCounts[conn.j]++
      }
    }
    
    return edges
  }, [nodePositions, connectionDistance])

  // アニメーションループ
  useFrame((state) => {
    if (!groupRef.current || !innerGroupRef.current) return
    
    const time = state.clock.getElapsedTime()
    
    // 外側グループ：ゆっくりとした回転
    groupRef.current.rotation.y = time * 0.03
    
    // 内側グループ：マウス追従 + 呼吸アニメーション
    const breathe = 1 + Math.sin(time * 0.5) * 0.03
    innerGroupRef.current.scale.setScalar(breathe)
    
    // マウスに追従する回転（スムーズに）
    const targetRotationX = (mouse.y * viewport.height) / 40
    const targetRotationY = (mouse.x * viewport.width) / 40
    
    innerGroupRef.current.rotation.x += (targetRotationX - innerGroupRef.current.rotation.x) * 0.03
    innerGroupRef.current.rotation.y += (targetRotationY - innerGroupRef.current.rotation.y) * 0.03
  })

  return (
    <group ref={groupRef}>
      <group ref={innerGroupRef}>
        <Nodes
          positions={nodePositions}
          mouseInfluence={mouseInfluence}
        />
        <Edges
          positions={nodePositions}
          connections={connections}
          pulseSpeed={pulseSpeed}
        />
      </group>
    </group>
  )
}

export default NeuralNetwork
