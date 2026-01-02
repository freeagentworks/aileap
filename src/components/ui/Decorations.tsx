'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * 背景グリッド装飾
 */
export function GridBackground({ className }: { className?: string }) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {/* 水平線 */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(to bottom, transparent 0%, transparent 49%, rgba(0, 212, 255, 0.02) 50%, transparent 51%, transparent 100%)
        `,
        backgroundSize: '100% 80px',
      }} />
      
      {/* 垂直線 */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(to right, transparent 0%, transparent 49%, rgba(0, 212, 255, 0.02) 50%, transparent 51%, transparent 100%)
        `,
        backgroundSize: '80px 100%',
      }} />
      
      {/* 中央の強調線（水平） */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-blue/15 to-transparent"
        style={{ top: '50%' }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />
      
      {/* 中央の強調線（垂直） */}
      <motion.div
        className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent-blue/15 to-transparent"
        style={{ left: '50%' }}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />
    </div>
  )
}

/**
 * コーナー装飾
 */
export function CornerDecorations({ className }: { className?: string }) {
  const corners = [
    { position: 'top-8 left-8', rotate: 0 },
    { position: 'top-8 right-8', rotate: 90 },
    { position: 'bottom-8 right-8', rotate: 180 },
    { position: 'bottom-8 left-8', rotate: 270 },
  ]

  return (
    <div className={cn('absolute inset-0 pointer-events-none', className)}>
      {corners.map((corner, index) => (
        <motion.div
          key={index}
          className={`absolute ${corner.position}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
          style={{ transform: `rotate(${corner.rotate}deg)` }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path
              d="M0 0 L15 0 L15 2 L2 2 L2 15 L0 15 Z"
              fill="rgba(0, 212, 255, 0.25)"
            />
            <circle cx="0" cy="0" r="2" fill="#00D4FF" />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}

/**
 * 光の軌跡アニメーション
 */
export function LightTrails({ className }: { className?: string }) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {/* 上からの光線 - 水色 */}
      <motion.div
        className="absolute top-0 left-1/4 w-px h-40 bg-gradient-to-b from-[#00D4FF] to-transparent"
        initial={{ y: -160, opacity: 0 }}
        animate={{ 
          y: ['0%', '100vh'],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 3,
          delay: 2,
          repeat: Infinity,
          repeatDelay: 5,
        }}
      />
      
      {/* 右からの光線 - ピンク */}
      <motion.div
        className="absolute top-1/3 right-0 w-40 h-px bg-gradient-to-l from-[#FF69B4] to-transparent"
        initial={{ x: 160, opacity: 0 }}
        animate={{ 
          x: [0, '-100vw'],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 4,
          delay: 3,
          repeat: Infinity,
          repeatDelay: 6,
        }}
      />
      
      {/* 斜めの光線 - ターコイズ */}
      <motion.div
        className="absolute top-0 right-1/3 w-px h-60 bg-gradient-to-b from-[#40E0D0]/50 to-transparent origin-top"
        style={{ transform: 'rotate(30deg)' }}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ 
          scaleY: [0, 1, 1, 0],
          opacity: [0, 0.6, 0.6, 0],
        }}
        transition={{
          duration: 2,
          delay: 4,
          repeat: Infinity,
          repeatDelay: 8,
        }}
      />
    </div>
  )
}

/**
 * フローティングシェイプ
 */
export function FloatingShapes({ className }: { className?: string }) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {/* 六角形 - 水色 */}
      <motion.div
        className="absolute top-1/4 left-[10%] opacity-20"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <polygon
            points="30,0 55,15 55,45 30,60 5,45 5,15"
            stroke="#00D4FF"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </motion.div>
      
      {/* 三角形 - ピンク */}
      <motion.div
        className="absolute bottom-1/4 right-[15%] opacity-15"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -90, -180, -270, -360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <polygon
            points="20,0 40,40 0,40"
            stroke="#FF69B4"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </motion.div>
      
      {/* 円 - ターコイズ */}
      <motion.div
        className="absolute top-1/3 right-[25%] opacity-10"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle
            cx="40"
            cy="40"
            r="38"
            stroke="#40E0D0"
            strokeWidth="1"
            strokeDasharray="4 4"
            fill="none"
          />
        </svg>
      </motion.div>
    </div>
  )
}

/**
 * グロー効果の円
 */
export function GlowOrbs({ className }: { className?: string }) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {/* メインのグロー（水色） */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)',
          top: '20%',
          left: '20%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* サブのグロー（ピンク） */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,105,180,0.08) 0%, transparent 70%)',
          bottom: '20%',
          right: '15%',
          transform: 'translate(50%, 50%)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
      
      {/* 小さなグロー（ターコイズ） */}
      <motion.div
        className="absolute w-[200px] h-[200px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(64,224,208,0.15) 0%, transparent 70%)',
          top: '60%',
          left: '60%',
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
    </div>
  )
}

export default GridBackground
