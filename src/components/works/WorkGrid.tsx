'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { WorkCard } from './WorkCard'
import type { Work } from '@/types'

interface WorkGridProps {
  works: Work[]
  className?: string
}

/**
 * Worksグリッドコンポーネント
 * フィルタリング結果をアニメーション付きで表示
 */
export function WorkGrid({ works, className }: WorkGridProps) {
  return (
    <motion.div
      layout
      className={cn('grid md:grid-cols-2 lg:grid-cols-3 gap-8', className)}
    >
      <AnimatePresence mode="popLayout">
        {works.map((work, index) => (
          <WorkCard key={work.slug} work={work} index={index} />
        ))}
      </AnimatePresence>
      
      {/* 結果がない場合 */}
      {works.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="col-span-full text-center py-20"
        >
          <p className="text-text-secondary">
            該当するプロジェクトが見つかりませんでした。
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}

export default WorkGrid
