'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionTitle } from '@/components/ui/SectionTitle'

interface ServiceCardProps {
  title: string
  description: string
  icon: string
  features: string[]
  index: number
  isInView: boolean
}

function ServiceCard({ title, description, icon, features, index, isInView }: ServiceCardProps) {
  return (
    <motion.div
      className="card-base p-8 lg:p-10 group hover:border-accent-blue/30"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* アイコン */}
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 border border-accent-blue/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        <span className="text-3xl">{icon}</span>
      </div>

      {/* タイトル */}
      <h3 className="text-h3 font-bold text-text-primary mb-4">
        {title}
      </h3>

      {/* 説明 */}
      <p className="text-body text-text-secondary mb-6 leading-relaxed">
        {description}
      </p>

      {/* 機能リスト */}
      <ul className="space-y-3">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-small text-text-muted">
            <span className="text-accent-blue mt-0.5">✓</span>
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

interface TimelineStepProps {
  period: string
  title: string
  description: string
  index: number
  isInView: boolean
  isLast?: boolean
}

function TimelineStep({ period, title, description, index, isInView, isLast }: TimelineStepProps) {
  return (
    <motion.div
      className="relative flex gap-6"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.6 + index * 0.15, duration: 0.5 }}
    >
      {/* タイムライン */}
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-accent-blue/20 border-2 border-accent-blue flex items-center justify-center text-accent-blue font-bold">
          {index + 1}
        </div>
        {!isLast && (
          <div className="w-0.5 h-full bg-gradient-to-b from-accent-blue/50 to-transparent mt-2" />
        )}
      </div>

      {/* コンテンツ */}
      <div className="pb-10">
        <span className="text-small text-accent-blue font-medium uppercase tracking-wider">
          {period}
        </span>
        <h4 className="text-body-lg font-bold text-text-primary mt-1 mb-2">
          {title}
        </h4>
        <p className="text-body text-text-muted">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

/**
 * Servicesセクション
 * 3つのサービスカード＋伴走プログラムタイムライン
 */
export function Services() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const services = [
    {
      title: 'AI活用教育',
      description: '最新のAIツールを実践レベルで習得。明日から業務に活かせるスキルを身につけます。',
      icon: '🎓',
      features: [
        'ChatGPT / Claude / Gemini の実践活用',
        '効果的なプロンプトエンジニアリング',
        'GPTs・Gemの作成指導',
        '画像生成・動画生成（Veo3, Sora2）',
        'Vibeコーディングでアプリ開発',
      ],
    },
    {
      title: 'ワークフロー構築',
      description: 'AIを活用した業務自動化ワークフローを構築。あなたの業務に合わせたカスタム設計をお届けします。',
      icon: '⚡',
      features: [
        'n8n / Dify でのワークフロー設計',
        '業務プロセスの自動化',
        '既存システムとの連携',
        'JSON形式でのワークフロー納品',
        '自社運用のためのドキュメント整備',
      ],
    },
    {
      title: 'プロダクト開発',
      description: 'アイデアを形にするWebアプリ・ツールを開発。業界特化の機能で、あなたのビジネスを加速します。',
      icon: '🚀',
      features: [
        'Webアプリケーション開発',
        'デスクトップアプリ開発',
        '業界特化ツール（不動産、人事、投資等）',
        '多言語対応（日英中韓）',
        'レスポンシブデザイン',
      ],
    },
  ]

  const timeline = [
    {
      period: 'Month 1-2',
      title: '現状分析・ツール導入',
      description: '業務フローの分析、最適なAIツールの選定と導入',
    },
    {
      period: 'Month 3-4',
      title: '実践・カスタマイズ',
      description: '実際の業務でAIを活用、フィードバックを元に最適化',
    },
    {
      period: 'Month 5-6',
      title: '自立支援・引き継ぎ',
      description: '自走できる体制づくり、ドキュメント整備、サポート移行',
    },
  ]

  return (
    <section
      ref={ref}
      id="services"
      className="section-padding relative overflow-hidden bg-background-surface"
    >
      {/* 背景装飾 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-accent-blue/3 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-accent-purple/3 blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* セクションタイトル */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle
            title="SERVICES"
            subtitle="あなたのAI活用を、始めから自立まで伴走します"
          />
        </motion.div>

        {/* サービスカード */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-16 mb-24">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              {...service}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* 伴走プログラム */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-h3 font-bold text-text-primary mb-2">
              伴走プログラムの流れ
            </h3>
            <p className="text-body text-text-muted">
              3〜6ヶ月であなたのAI自立をサポート
            </p>
          </div>

          <div className="pl-4">
            {timeline.map((step, index) => (
              <TimelineStep
                key={step.period}
                {...step}
                index={index}
                isInView={isInView}
                isLast={index === timeline.length - 1}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Services
