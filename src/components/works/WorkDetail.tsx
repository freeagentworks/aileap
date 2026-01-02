'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import type { Work } from '@/types'

interface WorkDetailProps {
  work: Work
  relatedWorks?: Work[]
  className?: string
}

/**
 * Work詳細コンポーネント
 * プロジェクトの詳細情報を表示
 */
export function WorkDetail({ work, relatedWorks = [], className }: WorkDetailProps) {
  const categoryLabels: Record<string, string> = {
    'ai-education': 'AI教育',
    'web-development': 'Web制作',
    'tool-development': 'ツール開発',
  }

  return (
    <div className={cn('', className)}>
      {/* Hero */}
      <motion.div
        className="relative aspect-video md:aspect-[21/9] bg-background-surface rounded-2xl overflow-hidden mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {work.images[0] ? (
          <Image
            src={work.images[0]}
            alt={work.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent-blue/20 to-accent-purple/20">
            <span className="text-text-muted font-mono">Project Image</span>
          </div>
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <motion.div
          className="lg:col-span-2 space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Title & Category */}
          <div>
            <span className="text-caption text-accent-blue uppercase tracking-wider font-medium">
              {categoryLabels[work.category] || work.category}
            </span>
            <h1 className="text-h1 font-bold mt-2 text-text-primary">
              {work.title}
            </h1>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-h3 font-semibold mb-4 text-text-primary">概要</h2>
            <p className="text-body-lg text-text-secondary leading-relaxed">
              {work.description}
            </p>
          </div>

          {/* Features */}
          {work.features && work.features.length > 0 && (
            <div>
              <h2 className="text-h3 font-semibold mb-4 text-text-primary">主な機能</h2>
              <ul className="space-y-3">
                {work.features.map((feature, index) => (
                  <motion.li
                    key={feature}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                  >
                    <svg
                      className="w-5 h-5 text-accent-blue mt-0.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-text-secondary">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {/* Challenge & Solution */}
          {(work.challenge || work.solution) && (
            <div className="grid md:grid-cols-2 gap-6">
              {work.challenge && (
                <div className="card-base p-6">
                  <h3 className="text-body font-semibold mb-3 text-accent-purple">
                    課題
                  </h3>
                  <p className="text-small text-text-secondary">{work.challenge}</p>
                </div>
              )}
              {work.solution && (
                <div className="card-base p-6">
                  <h3 className="text-body font-semibold mb-3 text-accent-blue">
                    解決策
                  </h3>
                  <p className="text-small text-text-secondary">{work.solution}</p>
                </div>
              )}
            </div>
          )}

          {/* Screenshots Gallery */}
          {work.images.length > 1 && (
            <div>
              <h2 className="text-h3 font-semibold mb-4 text-text-primary">
                スクリーンショット
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {work.images.slice(1).map((image, index) => (
                  <motion.div
                    key={image}
                    className="aspect-video bg-background-surface rounded-lg overflow-hidden"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  >
                    <Image
                      src={image}
                      alt={`${work.title} screenshot ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Sidebar */}
        <motion.aside
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Tech Stack */}
          <div className="card-base p-6">
            <h3 className="text-body font-semibold mb-4 text-text-primary">
              技術スタック
            </h3>
            <div className="flex flex-wrap gap-2">
              {work.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-small bg-background rounded-lg text-text-secondary border border-border"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="card-base p-6 space-y-4">
            <h3 className="text-body font-semibold text-text-primary">
              リンク
            </h3>
            
            {work.liveUrl && (
              <a
                href={work.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-text-secondary hover:text-accent-blue transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center group-hover:bg-accent-blue/10 transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-small font-medium">Live Demo</div>
                  <div className="text-caption text-text-muted">サイトを見る</div>
                </div>
              </a>
            )}
            
            {work.githubUrl && (
              <a
                href={work.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-text-secondary hover:text-accent-blue transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center group-hover:bg-accent-blue/10 transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </div>
                <div>
                  <div className="text-small font-medium">GitHub</div>
                  <div className="text-caption text-text-muted">ソースコード</div>
                </div>
              </a>
            )}
          </div>

          {/* Published Date */}
          <div className="card-base p-6">
            <h3 className="text-body font-semibold mb-2 text-text-primary">
              公開日
            </h3>
            <p className="text-text-secondary">
              {new Date(work.publishedAt).toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          {/* CTA */}
          <div className="card-base p-6 bg-gradient-to-br from-accent-blue/10 to-accent-purple/10 border-accent-blue/20">
            <h3 className="text-body font-semibold mb-2 text-text-primary">
              同じようなプロジェクトを依頼したい？
            </h3>
            <p className="text-small text-text-secondary mb-4">
              お気軽にご相談ください。
            </p>
            <Button
              variant="primary"
              size="md"
              className="w-full"
              onClick={() => {
                window.location.href = '/#contact'
              }}
            >
              無料相談する
            </Button>
          </div>
        </motion.aside>
      </div>

      {/* Related Works */}
      {relatedWorks.length > 0 && (
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-h2 font-bold mb-8">
            <span className="gradient-text">Related Works</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedWorks.slice(0, 3).map((relatedWork) => (
              <Link
                key={relatedWork.slug}
                href={`/works/${relatedWork.slug}`}
                className="card-base overflow-hidden group"
              >
                <div className="aspect-video bg-background-elevated relative">
                  {relatedWork.thumbnail ? (
                    <Image
                      src={relatedWork.thumbnail}
                      alt={relatedWork.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent-blue/20 to-accent-purple/20">
                      <span className="text-text-muted font-mono text-sm">Preview</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-body font-semibold text-text-primary group-hover:text-accent-blue transition-colors">
                    {relatedWork.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default WorkDetail
