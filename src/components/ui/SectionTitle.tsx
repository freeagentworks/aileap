'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionTitleProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

/**
 * セクションタイトルコンポーネント
 * アニメーション付きのセクション見出し
 */
export function SectionTitle({
  title,
  subtitle,
  align = 'left',
  className,
}: SectionTitleProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      className={cn(
        'mb-12',
        align === 'center' && 'text-center',
        className
      )}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* 装飾ライン */}
      <motion.div
        className={cn(
          'h-1 w-12 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full mb-6',
          align === 'center' && 'mx-auto'
        )}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ originX: align === 'center' ? 0.5 : 0 }}
      />
      
      {/* タイトル */}
      <h2 className="text-h2 font-bold">
        <span className="gradient-text">{title}</span>
      </h2>
      
      {/* サブタイトル */}
      {subtitle && (
        <motion.p
          className="text-body-lg text-text-secondary mt-4 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={align === 'center' ? { margin: '1rem auto 0' } : undefined}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}

export default SectionTitle
