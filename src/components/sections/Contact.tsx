'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { ContactForm } from '@/components/form/ContactForm'

/**
 * Contactセクション
 * 無料相談の説明＋お問い合わせフォーム
 */
export function Contact() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const benefits = [
    { icon: '💬', text: '30分のオンライン相談' },
    { icon: '🎯', text: '現状の課題をヒアリング' },
    { icon: '📋', text: '最適なプランをご提案' },
    { icon: '⚡', text: '24時間以内に返信' },
  ]

  return (
    <section
      ref={ref}
      id="contact"
      className="section-padding relative overflow-hidden"
    >
      {/* 背景装飾 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-accent-blue/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-accent-purple/5 blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* セクションタイトル */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle
            title="CONTACT"
            subtitle="まずは無料でご相談ください"
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mt-16">
          {/* 左: 無料相談について */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-h3 font-bold text-text-primary mb-8">
              無料相談について
            </h3>

            {/* メリットリスト */}
            <div className="space-y-4 mb-10">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.text}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center text-2xl">
                    {benefit.icon}
                  </div>
                  <span className="text-body text-text-secondary">{benefit.text}</span>
                </motion.div>
              ))}
            </div>

            {/* 補足文 */}
            <div className="p-6 rounded-xl bg-background-surface border border-border">
              <p className="text-body text-text-muted leading-relaxed">
                お気軽にご相談ください。
                <br />
                「AIって何から始めればいいの？」という
                <span className="text-text-secondary">初歩的な質問も大歓迎</span>です。
              </p>
            </div>

            {/* 連絡先情報 */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 text-text-muted">
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
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span className="text-small">contact@aileap.com</span>
              </div>
            </div>
          </motion.div>

          {/* 右: フォーム */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="card-base p-8 lg:p-10">
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
