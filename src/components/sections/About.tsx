'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionTitle } from '@/components/ui/SectionTitle'

/**
 * Aboutセクション
 * ビジョン＋プロフィール
 */
export function About() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  const skills = [
    { name: 'AI/機械学習', icon: '🤖' },
    { name: 'Webアプリ開発', icon: '💻' },
    { name: '業務自動化', icon: '⚡' },
    { name: '多言語対応', icon: '🌏' },
  ]

  const stats = [
    { value: '50+', label: 'Projects', desc: 'プロジェクト完了' },
    { value: '5', label: 'Industries', desc: '業界での実績' },
    { value: '4', label: 'Languages', desc: '言語対応' },
  ]

  return (
    <section
      ref={ref}
      id="about"
      className="section-padding relative overflow-hidden"
    >
      {/* 背景装飾 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-accent-blue/5 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full bg-accent-purple/5 blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* セクションタイトル */}
          <motion.div variants={itemVariants}>
            <SectionTitle
              title="ABOUT"
              subtitle="AILEAPについて"
            />
          </motion.div>

          {/* ビジョン */}
          <motion.div
            variants={itemVariants}
            className="mt-16 mb-20"
          >
            <div className="max-w-4xl">
              <h3 className="text-h2 font-bold mb-6">
                <span className="text-text-primary">「教えて終わり」</span>
                <span className="gradient-text">ではない</span>
              </h3>
              <p className="text-body-lg text-text-secondary leading-relaxed">
                私たちのゴールは、あなたが自立してAIを活用できるようになること。
                <br />
                新しいAIツールが登場しても、自分で学び、使いこなせる力を身につける。
                <br />
                それがAILEAPの約束です。
              </p>
            </div>
          </motion.div>

          {/* プロフィールカード */}
          <motion.div
            variants={itemVariants}
            className="grid md:grid-cols-2 gap-8 lg:gap-12"
          >
            {/* 左: プロフィール情報 */}
            <div className="card-base p-8 lg:p-10">
              <div className="flex items-start gap-6 mb-8">
                {/* プロフィール画像プレースホルダー */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 border border-border flex items-center justify-center flex-shrink-0">
                  <span className="text-4xl">👨‍💻</span>
                </div>
                <div>
                  <h4 className="text-h3 font-bold text-text-primary mb-1">
                    代表
                  </h4>
                  <p className="text-body text-text-muted">
                    AILEAP 代表 / AIエンジニア
                  </p>
                </div>
              </div>

              <p className="text-body text-text-secondary leading-relaxed mb-8">
                エンジニアとして10年以上の経験を持ち、AI/機械学習の分野で多数のプロジェクトを手がける。
                カメラマンとしての経験も活かし、技術とクリエイティブの両面からビジネスをサポート。
              </p>

              {/* スキルタグ */}
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border text-small text-text-secondary"
                  >
                    <span>{skill.icon}</span>
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>

            {/* 右: 実績 */}
            <div className="flex flex-col gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="card-base p-6 flex items-center gap-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                >
                  <div className="text-4xl lg:text-5xl font-bold text-accent-blue">
                    {stat.value}
                  </div>
                  <div>
                    <div className="text-body font-semibold text-text-primary">
                      {stat.label}
                    </div>
                    <div className="text-small text-text-muted">
                      {stat.desc}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* 対応ツール */}
              <div className="card-base p-6">
                <h5 className="text-small font-semibold text-text-muted uppercase tracking-wider mb-4">
                  対応AIツール
                </h5>
                <div className="flex flex-wrap gap-2">
                  {['ChatGPT', 'Claude', 'Gemini', 'n8n', 'Dify', 'Cursor'].map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1 rounded bg-accent-blue/10 text-accent-blue text-small font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
