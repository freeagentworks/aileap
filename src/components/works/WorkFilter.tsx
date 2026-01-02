'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { WORK_CATEGORIES } from '@/lib/constants'

interface WorkFilterProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
  className?: string
}

/**
 * Worksカテゴリフィルター
 * カテゴリによるフィルタリング機能
 */
export function WorkFilter({
  activeCategory,
  onCategoryChange,
  className,
}: WorkFilterProps) {
  return (
    <div className={cn('flex flex-wrap gap-3', className)}>
      {WORK_CATEGORIES.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            'relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300',
            activeCategory === category.id
              ? 'text-background'
              : 'text-text-secondary hover:text-text-primary'
          )}
        >
          {/* アクティブ状態の背景 */}
          {activeCategory === category.id && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 bg-accent-blue rounded-full"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
          
          {/* 非アクティブ状態の背景 */}
          {activeCategory !== category.id && (
            <div className="absolute inset-0 bg-background-surface border border-border rounded-full" />
          )}
          
          <span className="relative z-10">{category.label}</span>
        </button>
      ))}
    </div>
  )
}

export default WorkFilter
