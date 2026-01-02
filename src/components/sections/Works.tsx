'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
// import Image from 'next/image'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { works } from '@/data/works'

interface WorkCardProps {
  work: typeof works[0]
  index: number
  isInView: boolean
}

function WorkCard({ work, index, isInView }: WorkCardProps) {
  // Microlink APIでスクリーンショットURLを生成
  const screenshotUrl = work.liveUrl
    ? `https://api.microlink.io/?url=${encodeURIComponent(work.liveUrl)}&screenshot=true&meta=false&embed=screenshot.url`
    : null

  return (
    <motion.article
      className="card-base overflow-hidden group relative"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
    >
      {/* サムネイル */}
      <div className="aspect-video bg-gradient-to-br from-background-elevated to-background relative overflow-hidden">
        {/* スクリーンショット画像 */}
        {screenshotUrl && (
          <img
            src={screenshotUrl}
            alt={`${work.title}のスクリーンショット`}
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        )}
        
        {/* オーバーレイグラデーション */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent z-10" />

        {/* ホバーオーバーレイ */}
        <div className="absolute inset-0 bg-accent-blue/0 group-hover:bg-accent-blue/10 transition-colors z-20" />
        
        {/* カテゴリバッジ */}
        <div className="absolute top-4 left-4 z-30">
          <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-caption text-text-secondary border border-border">
            {work.category === 'ai-education' && 'AI教育'}
            {work.category === 'web-development' && 'Web制作'}
            {work.category === 'tool-development' && 'ツール開発'}
          </span>
        </div>

        {/* View Project ホバー表示 */}
        <div className="absolute inset-0 flex items-center justify-center z-30 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="px-4 py-2 rounded-full bg-accent-blue text-white text-small font-medium">
            View Project →
          </span>
        </div>
      </div>

      {/* コンテンツ */}
      <div className="p-6">
        <h3 className="text-body-lg font-bold text-text-primary mb-2 group-hover:text-accent-blue transition-colors">
          {work.title}
        </h3>
        <p className="text-small text-text-muted line-clamp-2 mb-4">
          {work.description}
        </p>

        {/* 技術スタック */}
        <div className="flex flex-wrap gap-2">
          {work.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 rounded bg-background text-caption text-text-muted"
            >
              {tech}
            </span>
          ))}
          {work.techStack.length > 3 && (
            <span className="px-2 py-1 rounded bg-background text-caption text-text-muted">
              +{work.techStack.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* リンク */}
      {work.liveUrl && (
        <a
          href={work.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-40"
          aria-label={`${work.title}を見る`}
        />
      )}
    </motion.article>
  )
}

/**
 * Worksセクション（トップページ用）
 */
export function Works() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      id="works"
      className="section-padding relative overflow-hidden bg-background-surface"
    >
      {/* 背景装飾 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full bg-accent-blue/3 blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* セクションタイトル */}
        <div className="flex items-end justify-between mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle
              title="WORKS"
              subtitle="手がけたプロジェクト"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="hidden md:block"
          >
            <Link
              href="/works"
              className="inline-flex items-center gap-2 text-text-muted hover:text-accent-blue transition-colors group"
            >
              <span>すべてのWorksを見る</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:translate-x-1 transition-transform"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* ワークグリッド */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {works.map((work, index) => (
            <WorkCard
              key={work.slug}
              work={work}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* モバイル用リンク */}
        <motion.div
          className="mt-10 text-center md:hidden"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link
            href="/works"
            className="inline-flex items-center gap-2 text-text-muted hover:text-accent-blue transition-colors"
          >
            <span>すべてのWorksを見る</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default Works
