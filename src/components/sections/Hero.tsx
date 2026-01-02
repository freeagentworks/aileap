'use client'

import { useRef, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion'
import { cn } from '@/lib/utils'
import { AnimatedText, CountUp } from '@/components/ui/AnimatedText'
import { ScrollIndicator } from '@/components/ui/ScrollIndicator'
import { Button } from '@/components/ui/Button'
import { 
  GridBackground, 
  CornerDecorations, 
  LightTrails, 
  FloatingShapes,
  GlowOrbs 
} from '@/components/ui/Decorations'

// Three.jsシーンは動的にインポート（SSR無効）
const Scene = dynamic(() => import('@/components/three/Scene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-radial from-background-surface to-background" />
  ),
})

interface HeroProps {
  className?: string
}

/**
 * 究極のHeroセクション
 * Three.js + 多層装飾 + 洗練されたアニメーション
 */
export function Hero({ className }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null)
  const controls = useAnimation()
  const [isLoaded, setIsLoaded] = useState(false)
  
  // スクロールに連動したパララックス効果
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.4], [0, 150])
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.9])
  const blur = useTransform(scrollYProgress, [0, 0.4], [0, 10])

  useEffect(() => {
    // 初期ロードアニメーション
    const timer = setTimeout(() => {
      setIsLoaded(true)
      controls.start('visible')
    }, 100)
    
    return () => clearTimeout(timer)
  }, [controls])

  // アニメーションバリアント
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <section
      ref={containerRef}
      id="hero"
      className={cn(
        'relative min-h-screen flex items-center justify-center overflow-hidden',
        className
      )}
    >
      {/* ===== Layer 1: Three.js Background ===== */}
      <div className="absolute inset-0 z-0">
        <Scene className="w-full h-full" />
      </div>

      {/* ===== Layer 2: 背景装飾 ===== */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {/* グリッドパターン */}
        <GridBackground className="opacity-50" />
        
        {/* グロー効果の球 */}
        <GlowOrbs />
        
        {/* 浮遊するシェイプ */}
        <FloatingShapes />
        
        {/* 光の軌跡 */}
        <LightTrails />
      </div>

      {/* ===== Layer 3: グラデーションオーバーレイ ===== */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        {/* 上部のビネット */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-transparent" />
        
        {/* 下部のフェード */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        {/* 中央のラジアル */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/60" />
      </div>

      {/* ===== Layer 4: コーナー装飾 ===== */}
      <CornerDecorations className="z-[3]" />

      {/* ===== Layer 5: メインコンテンツ ===== */}
      <motion.div
        className="relative z-10 container-custom text-center px-4"
        style={{ 
          opacity, 
          y, 
          scale,
          filter: blur.get() > 0 ? `blur(${blur.get()}px)` : 'none',
        }}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* プレタイトル */}
        <motion.div
          variants={itemVariants}
          className="mb-6"
        >
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-blue/30 bg-accent-blue/5 text-accent-blue text-sm font-medium"
            whileHover={{ scale: 1.05, borderColor: 'rgba(0, 212, 255, 0.6)' }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-blue opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-blue"></span>
            </span>
            AI教育・導入支援サービス
          </motion.span>
        </motion.div>

        {/* メインキャッチコピー */}
        <motion.div variants={itemVariants} className="mb-4">
          <h1 className="text-hero font-black leading-[1.1] tracking-tight">
            <AnimatedText
              text="始めるなら、今。"
              className="text-text-primary drop-shadow-[0_0_30px_rgba(0,212,255,0.3)]"
              delay={0.5}
              glow
            />
          </h1>
        </motion.div>

        {/* サブコピー */}
        <motion.div variants={itemVariants} className="mb-10">
          <p className="text-h3 md:text-h2 font-medium max-w-3xl mx-auto">
            <span className="text-text-secondary">AIを味方に、</span>
            <span className="gradient-text font-bold">ビジネスを次のステージへ</span>
          </p>
        </motion.div>

        {/* 説明文 */}
        <motion.p
          variants={itemVariants}
          className="text-body-lg text-text-muted mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          最新のAIツールを実践レベルで習得。
          <br className="hidden md:block" />
          自立してAIを活用できる力を身につけます。
        </motion.p>

        {/* CTAボタン */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            rightIcon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            }
            className="min-w-[200px]"
          >
            無料相談する
          </Button>
          
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="min-w-[200px]"
          >
            サービスを見る
          </Button>
        </motion.div>

        {/* 実績バッジ */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
        >
          {[
            { value: 50, suffix: '+', label: 'Projects', desc: 'プロジェクト完了' },
            { value: 5, suffix: '', label: 'Industries', desc: '業界での実績' },
            { value: 4, suffix: '', label: 'Languages', desc: '言語対応' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="group relative"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-3">
                <div className="text-3xl md:text-4xl font-bold text-accent-blue">
                  <CountUp end={stat.value} suffix={stat.suffix} duration={2.5} />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-text-primary">{stat.label}</div>
                  <div className="text-xs text-text-muted">{stat.desc}</div>
                </div>
              </div>
              
              {/* ホバー時のグロー */}
              <motion.div
                className="absolute -inset-4 rounded-xl bg-accent-blue/5 opacity-0 group-hover:opacity-100 -z-10"
                transition={{ duration: 0.3 }}
              />
              
              {/* 区切り線（最後以外） */}
              {index < 2 && (
                <div className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 w-px h-12 bg-gradient-to-b from-transparent via-border to-transparent" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* ===== Layer 6: スクロールインジケーター ===== */}
      <ScrollIndicator className="z-20" />

      {/* ===== Layer 7: ノイズテクスチャ ===== */}
      <div 
        className="absolute inset-0 z-[15] pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </section>
  )
}

export default Hero
