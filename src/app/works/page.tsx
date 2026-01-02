'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { WorkFilter, WorkGrid } from '@/components/works'
import { works, getWorksByCategory } from '@/data/works'

export default function WorksPage() {
  useSmoothScroll()
  
  const [activeCategory, setActiveCategory] = useState('all')
  const filteredWorks = getWorksByCategory(activeCategory)

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle
              title="WORKS"
              subtitle="これまでに手がけたプロジェクト一覧です。AI教育からWebアプリ開発まで、幅広い分野で実績があります。"
            />
          </motion.div>
        </div>
      </section>

      {/* Filter & Grid */}
      <section className="pb-20 bg-background">
        <div className="container-custom">
          {/* Filter */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <WorkFilter
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </motion.div>

          {/* Results Count */}
          <motion.p
            className="text-text-secondary mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {filteredWorks.length} プロジェクト
          </motion.p>

          {/* Grid */}
          <WorkGrid works={filteredWorks} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background-surface">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-h2 font-bold mb-4">
              <span className="gradient-text">プロジェクトを依頼する</span>
            </h2>
            <p className="text-body-lg text-text-secondary mb-8 max-w-2xl mx-auto">
              あなたのビジネスに最適なAIソリューションをご提案します。
              まずは無料相談からお気軽にどうぞ。
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-background bg-accent-blue rounded-lg hover:shadow-glow hover:scale-105 transition-all duration-300"
            >
              無料相談する
            </a>
          </motion.div>
        </div>
      </section>
    </>
  )
}
