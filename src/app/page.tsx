'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { Hero } from '@/components/sections/Hero'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/form/ContactForm'
import { cn } from '@/lib/utils'

export default function Home() {
  // スムーズスクロールを有効化
  useSmoothScroll()

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <AboutSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Works Section */}
      <WorksSection />

      {/* Insights Section */}
      <InsightsSection />

      {/* Contact Section */}
      <ContactSection />
    </>
  )
}

// =============================================
// About Section
// =============================================
function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="section-padding bg-background-surface">
      <div className="container-custom">
        <SectionTitle
          title="ABOUT"
          subtitle="「教えて終わり」ではない"
        />
        
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Vision */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-body-lg text-text-secondary leading-relaxed mb-6">
              私たちのゴールは、あなたが<span className="text-accent-blue font-semibold">自立してAIを活用できる</span>ようになること。
            </p>
            <p className="text-body text-text-secondary leading-relaxed mb-6">
              新しいAIツールが登場しても、自分で学び、使いこなせる力を身につける。
              それがAILEAPの約束です。
            </p>
            <p className="text-body text-text-muted leading-relaxed">
              エンジニアとして10年以上の経験を持ち、AI/機械学習の分野で
              多数のプロジェクトを手がけてきました。技術とクリエイティブの両面から、
              あなたのビジネスをサポートします。
            </p>
          </motion.div>

          {/* Right - Stats */}
          <motion.div
            className="grid grid-cols-3 gap-4"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              { value: '50+', label: 'Projects', desc: 'プロジェクト完了' },
              { value: '5', label: 'Industries', desc: '業界での実績' },
              { value: '4', label: 'Languages', desc: '言語対応' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="card-base p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <div className="text-h2 font-bold text-accent-blue mb-1">{stat.value}</div>
                <div className="text-small font-medium text-text-primary">{stat.label}</div>
                <div className="text-caption text-text-muted mt-1">{stat.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// =============================================
// Services Section
// =============================================
function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const services = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'AI活用教育',
      description: '最新のAIツールを実践レベルで習得。明日から業務に活かせるスキルを身につけます。',
      features: ['ChatGPT / Claude / Gemini', 'プロンプトエンジニアリング', '画像/動画生成AI', 'GPTs・Gemの作成'],
      color: 'accent-blue',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      title: 'ワークフロー構築',
      description: 'AIを活用した業務自動化ワークフローを構築。あなたの業務に合わせたカスタム設計をお届けします。',
      features: ['n8n / Dify', '業務プロセス自動化', '既存システム連携', 'JSON納品'],
      color: 'accent-purple',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: 'プロダクト開発',
      description: 'アイデアを形にするWebアプリ・ツールを開発。業界特化の機能で、あなたのビジネスを加速します。',
      features: ['Webアプリ開発', '業界特化ツール', '多言語対応', 'レスポンシブ'],
      color: 'semantic-success',
    },
  ]

  return (
    <section id="services" className="section-padding">
      <div className="container-custom">
        <SectionTitle
          title="SERVICES"
          subtitle="あなたのAI活用を、始めから自立まで伴走します"
        />

        <div ref={ref} className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="card-base p-8 group"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={cn(
                'w-14 h-14 rounded-xl flex items-center justify-center mb-6',
                `bg-${service.color}/10 text-${service.color}`
              )}
              style={{
                backgroundColor: service.color === 'accent-blue' ? 'rgba(0, 212, 255, 0.1)' :
                                 service.color === 'accent-purple' ? 'rgba(123, 97, 255, 0.1)' :
                                 'rgba(0, 255, 136, 0.1)',
                color: service.color === 'accent-blue' ? '#00D4FF' :
                       service.color === 'accent-purple' ? '#7B61FF' :
                       '#00FF88'
              }}
              >
                {service.icon}
              </div>
              <h3 className="text-h3 font-semibold mb-3 text-text-primary">{service.title}</h3>
              <p className="text-text-secondary mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-small text-text-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-h3 font-semibold text-center mb-12">
            伴走プログラムの流れ
            <span className="block text-body text-text-secondary font-normal mt-2">
              3〜6ヶ月であなたのAI自立をサポート
            </span>
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-accent-blue via-accent-purple to-semantic-success" />
            
            {[
              { period: 'Month 1-2', title: '現状分析・ツール導入', desc: '業務フローの分析、最適なAIツールの選定と導入' },
              { period: 'Month 3-4', title: '実践・カスタマイズ', desc: '実際の業務でAIを活用、フィードバックを元に最適化' },
              { period: 'Month 5-6', title: '自立支援・引き継ぎ', desc: '自走できる体制づくり、ドキュメント整備' },
            ].map((step, index) => (
              <div key={step.period} className="text-center relative">
                <div className="w-24 h-24 rounded-full bg-background-surface border-2 border-accent-blue flex items-center justify-center mx-auto mb-6 relative z-10">
                  <span className="text-accent-blue font-bold">{step.period}</span>
                </div>
                <h4 className="text-body font-semibold text-text-primary mb-2">{step.title}</h4>
                <p className="text-small text-text-secondary">{step.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// =============================================
// Works Section
// =============================================
function WorksSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const works = [
    { id: 1, title: '芸能系サイト', category: 'Web制作', tech: ['Next.js', 'i18n'] },
    { id: 2, title: '性格診断アプリ', category: 'ツール開発', tech: ['Next.js', 'TypeScript'] },
    { id: 3, title: '物件価格予測アプリ', category: 'ツール開発', tech: ['Python', 'ML'] },
    { id: 4, title: '資産管理アプリ', category: 'ツール開発', tech: ['Next.js', 'Chart.js'] },
    { id: 5, title: 'メタバース タロット占い', category: 'Web制作', tech: ['Three.js', 'Gemini'] },
    { id: 6, title: 'AI/ML教育コンテンツ', category: 'AI教育', tech: ['Python', 'Jupyter'] },
  ]

  return (
    <section id="works" className="section-padding bg-background-surface">
      <div className="container-custom">
        <SectionTitle
          title="WORKS"
          subtitle="手がけたプロジェクト"
        />

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {works.map((work, index) => (
            <motion.div
              key={work.id}
              className="card-base overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <div className="aspect-video bg-background-elevated relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent-blue/20 to-accent-purple/20">
                  <span className="text-text-muted font-mono text-sm">Preview</span>
                </div>
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-accent-blue/0 group-hover:bg-accent-blue/10 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-text-primary font-semibold">
                    View Project →
                  </span>
                </div>
              </div>
              <div className="p-6">
                <span className="text-caption text-accent-blue uppercase tracking-wider font-medium">
                  {work.category}
                </span>
                <h3 className="text-h3 font-semibold mt-2 text-text-primary group-hover:text-accent-blue transition-colors">
                  {work.title}
                </h3>
                <div className="flex flex-wrap gap-2 mt-4">
                  {work.tech.map((t) => (
                    <span key={t} className="px-2 py-1 text-caption bg-background rounded text-text-secondary">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <a
            href="/works"
            className="inline-flex items-center gap-2 text-accent-blue font-semibold hover:gap-3 transition-all"
          >
            すべてのWorksを見る
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// =============================================
// Insights Section
// =============================================
function InsightsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="insights" className="section-padding">
      <div className="container-custom">
        <SectionTitle
          title="INSIGHTS"
          subtitle="最新のAI情報やノウハウを発信しています"
        />

        <div ref={ref} className="grid md:grid-cols-3 gap-8 mb-12">
          {[1, 2, 3].map((i, index) => (
            <motion.div
              key={i}
              className="card-base p-6 group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="text-caption text-text-muted mb-3">2025.01.0{i}</div>
              <h3 className="text-body font-semibold text-text-primary mb-3 group-hover:text-accent-blue transition-colors">
                AIツールの最新活用法 Vol.{i}
              </h3>
              <p className="text-small text-text-secondary line-clamp-2">
                最新のAI関連情報をお届けします。ビジネスに活かせる実践的なノウハウを解説...
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a
            href="https://note.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent-blue font-semibold hover:gap-3 transition-all"
          >
            noteですべて読む
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// =============================================
// Contact Section
// =============================================
function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contact" className="section-padding bg-background-surface">
      <div className="container-custom">
        <SectionTitle
          title="CONTACT"
          subtitle="まずは無料でご相談ください"
        />

        <div ref={ref} className="grid lg:grid-cols-2 gap-12">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-h3 font-semibold mb-6 text-text-primary">
              無料相談について
            </h3>
            <ul className="space-y-4 mb-8">
              {[
                '30分のオンライン相談',
                '現状の課題をヒアリング',
                '最適なプランをご提案',
                '24時間以内に返信',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-accent-blue mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-text-secondary">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-text-muted text-small">
              お気軽にご相談ください。<br />
              「AIって何から始めればいいの？」という初歩的な質問も大歓迎です。
            </p>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
