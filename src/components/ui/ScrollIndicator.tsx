'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ScrollIndicatorProps {
  className?: string
}

/**
 * 強化版スクロールインジケーター
 * より洗練されたデザインとアニメーション
 */
export function ScrollIndicator({ className }: ScrollIndicatorProps) {
  return (
    <motion.div
      className={cn(
        'absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
    >
      {/* テキスト */}
      <motion.div
        className="flex items-center gap-3"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <motion.div
          className="w-8 h-px bg-gradient-to-r from-transparent to-accent-blue/50"
          animate={{ scaleX: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
        <span className="text-xs text-text-muted uppercase tracking-[0.3em] font-medium">
          Scroll
        </span>
        <motion.div
          className="w-8 h-px bg-gradient-to-l from-transparent to-accent-blue/50"
          animate={{ scaleX: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      </motion.div>
      
      {/* マウスアイコン + 矢印 */}
      <div className="relative flex flex-col items-center">
        {/* マウスフレーム */}
        <div className="relative w-6 h-10 border-2 border-text-secondary/40 rounded-full overflow-hidden">
          {/* スクロールホイール */}
          <motion.div
            className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-2 rounded-full bg-accent-blue"
            animate={{
              y: [0, 14, 0],
              opacity: [1, 0.3, 1],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          
          {/* グロー効果 */}
          <motion.div
            className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent-blue/30 blur-sm"
            animate={{
              y: [0, 14, 0],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
        
        {/* 下向き矢印 */}
        <motion.div
          className="mt-2 flex flex-col items-center"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg
            width="16"
            height="24"
            viewBox="0 0 16 24"
            fill="none"
            className="text-accent-blue/60"
          >
            <motion.path
              d="M8 0 L8 18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 2.5 }}
            />
            <motion.path
              d="M2 14 L8 20 L14 14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 3 }}
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ScrollIndicator
