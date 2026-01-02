'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { WorkDetail } from '@/components/works/WorkDetail'
import type { Work } from '@/types'

interface WorkDetailClientProps {
  work: Work
  relatedWorks: Work[]
}

export function WorkDetailClient({ work, relatedWorks }: WorkDetailClientProps) {
  useSmoothScroll()

  return (
    <>
      {/* Breadcrumb */}
      <section className="pt-28 pb-8 bg-background">
        <div className="container-custom">
          <motion.nav
            className="flex items-center gap-2 text-small"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/"
              className="text-text-muted hover:text-text-secondary transition-colors"
            >
              Home
            </Link>
            <span className="text-text-muted">/</span>
            <Link
              href="/works"
              className="text-text-muted hover:text-text-secondary transition-colors"
            >
              Works
            </Link>
            <span className="text-text-muted">/</span>
            <span className="text-text-secondary">{work.title}</span>
          </motion.nav>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20 bg-background">
        <div className="container-custom">
          <WorkDetail work={work} relatedWorks={relatedWorks} />
        </div>
      </section>

      {/* Back to Works */}
      <section className="pb-20 bg-background">
        <div className="container-custom text-center">
          <Link
            href="/works"
            className="inline-flex items-center gap-2 text-accent-blue font-semibold hover:gap-3 transition-all"
          >
            <svg
              className="w-4 h-4 rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
            Worksに戻る
          </Link>
        </div>
      </section>
    </>
  )
}
