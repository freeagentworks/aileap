'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { Work } from '@/types'

interface WorkCardProps {
  work: Work
  index?: number
  className?: string
}

/**
 * Workカードコンポーネント
 * プロジェクトのサムネイルと基本情報を表示
 */
export function WorkCard({ work, index = 0, className }: WorkCardProps) {
  const categoryLabels: Record<string, string> = {
    'ai-education': 'AI教育',
    'web-development': 'Web制作',
    'tool-development': 'ツール開発',
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={className}
    >
      <Link href={`/works/${work.slug}`}>
        <motion.article
          className="card-base overflow-hidden group cursor-pointer h-full"
          whileHover={{ y: -8 }}
          transition={{ duration: 0.3 }}
        >
          {/* Thumbnail */}
          <div className="aspect-video bg-background-elevated relative overflow-hidden">
            {work.thumbnail ? (
              <Image
                src={work.thumbnail}
                alt={work.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent-blue/20 to-accent-purple/20">
                <span className="text-text-muted font-mono text-sm">Preview</span>
              </div>
            )}
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* View Project Button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="px-4 py-2 bg-accent-blue text-background text-sm font-semibold rounded-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                View Project →
              </span>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <span className="text-caption text-accent-blue uppercase tracking-wider font-medium">
              {categoryLabels[work.category] || work.category}
            </span>
            <h3 className="text-h3 font-semibold mt-2 text-text-primary group-hover:text-accent-blue transition-colors line-clamp-1">
              {work.title}
            </h3>
            <p className="text-small text-text-secondary mt-2 line-clamp-2">
              {work.description}
            </p>
            
            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mt-4">
              {work.techStack.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-caption bg-background rounded text-text-secondary"
                >
                  {tech}
                </span>
              ))}
              {work.techStack.length > 3 && (
                <span className="px-2 py-1 text-caption text-text-muted">
                  +{work.techStack.length - 3}
                </span>
              )}
            </div>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  )
}

export default WorkCard
