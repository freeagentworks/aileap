'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionTitle } from '@/components/ui/SectionTitle'

interface ArticleCardProps {
  title: string
  date: string
  category: string
  url: string
  index: number
  isInView: boolean
}

function ArticleCard({ title, date, category, url, index, isInView }: ArticleCardProps) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-base p-6 group hover:border-accent-blue/30 block"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
    >
      {/* カテゴリ＋日付 */}
      <div className="flex items-center gap-3 mb-4">
        <span className="px-3 py-1 rounded-full bg-accent-blue/10 text-accent-blue text-caption font-medium">
          {category}
        </span>
        <span className="text-caption text-text-muted">{date}</span>
      </div>

      {/* タイトル */}
      <h4 className="text-body-lg font-semibold text-text-primary group-hover:text-accent-blue transition-colors line-clamp-2 mb-4">
        {title}
      </h4>

      {/* 読むリンク */}
      <div className="flex items-center gap-2 text-small text-text-muted group-hover:text-accent-blue transition-colors">
        <span>続きを読む</span>
        <svg
          width="16"
          height="16"
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
      </div>
    </motion.a>
  )
}

interface SocialLinkProps {
  name: string
  icon: React.ReactNode
  url: string
  color: string
}

function SocialLink({ name, icon, url, color }: SocialLinkProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-4 p-4 rounded-xl border border-border hover:border-${color}/50 bg-background hover:bg-background-elevated transition-all group`}
    >
      <div className={`w-12 h-12 rounded-full bg-${color}/10 flex items-center justify-center text-${color} group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <div>
        <div className="text-body font-medium text-text-primary">{name}</div>
        <div className="text-small text-text-muted">フォローする</div>
      </div>
    </a>
  )
}

/**
 * Insightsセクション
 * note連携＋SNSリンク
 */
export function Insights() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // 仮のnote記事データ（実際はRSSフィードから取得）
  const articles = [
    {
      title: 'ChatGPTを業務で活用するための5つのポイント',
      date: '2025.01.15',
      category: 'AI活用',
      url: '#',
    },
    {
      title: '中小企業のためのAI導入ロードマップ',
      date: '2025.01.10',
      category: 'AI導入',
      url: '#',
    },
    {
      title: 'n8nで始める業務自動化入門',
      date: '2025.01.05',
      category: '自動化',
      url: '#',
    },
  ]

  const socialLinks = [
    {
      name: 'YouTube',
      url: '#',
      color: 'red-500',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
    {
      name: 'note',
      url: '#',
      color: 'green-500',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.5 8.5h-3v7h-2v-7h-3v-2h8v2z"/>
        </svg>
      ),
    },
    {
      name: 'Facebook',
      url: '#',
      color: 'blue-500',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
  ]

  return (
    <section
      ref={ref}
      id="insights"
      className="section-padding relative overflow-hidden"
    >
      {/* 背景装飾 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -right-32 w-64 h-64 rounded-full bg-accent-purple/5 blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* セクションタイトル */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle
            title="INSIGHTS"
            subtitle="最新のAI情報やノウハウを発信しています"
          />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mt-16">
          {/* 記事一覧 */}
          <div className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {articles.map((article, index) => (
                <ArticleCard
                  key={article.title}
                  {...article}
                  index={index}
                  isInView={isInView}
                />
              ))}
              
              {/* noteへのリンク */}
              <motion.a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="card-base p-6 flex items-center justify-center gap-3 text-text-muted hover:text-accent-blue hover:border-accent-blue/30 transition-all group"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <span className="text-body font-medium">noteですべて読む</span>
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
              </motion.a>
            </div>
          </div>

          {/* SNSリンク */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h3 className="text-small font-semibold text-text-muted uppercase tracking-wider mb-6">
              Follow Us
            </h3>
            
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-accent-blue/30 bg-background hover:bg-background-elevated transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-accent-blue/10 flex items-center justify-center text-accent-blue group-hover:scale-110 transition-transform">
                  {link.icon}
                </div>
                <div>
                  <div className="text-body font-medium text-text-primary">{link.name}</div>
                  <div className="text-small text-text-muted">フォローする</div>
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Insights
