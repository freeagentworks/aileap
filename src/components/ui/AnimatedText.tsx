'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedTextProps {
  text: string
  className?: string
  once?: boolean
  delay?: number
  splitBy?: 'char' | 'word'
  glow?: boolean
  gradient?: boolean
}

/**
 * 強化版アニメーションテキスト
 * 3Dフリップ、グロー、グラデーション対応
 */
export function AnimatedText({
  text,
  className,
  once = true,
  delay = 0,
  splitBy = 'char',
  glow = false,
  gradient = false,
}: AnimatedTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once, margin: '-50px' })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const items = splitBy === 'char' ? text.split('') : text.split(' ')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: splitBy === 'char' ? 0.04 : 0.1,
        delayChildren: delay,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 80,
      rotateX: -90,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 100,
        mass: 1,
      },
    },
  }

  return (
    <motion.span
      ref={ref}
      className={cn(
        'inline-block',
        glow && 'drop-shadow-[0_0_25px_rgba(0,212,255,0.5)]',
        gradient && 'bg-gradient-to-r from-accent-blue via-white to-accent-purple bg-clip-text text-transparent bg-[length:200%_auto]',
        className
      )}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      aria-label={text}
      style={gradient ? { 
        animation: 'gradient-shift 3s ease infinite',
      } : undefined}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={itemVariants}
          style={{ 
            display: 'inline-block',
            whiteSpace: splitBy === 'word' ? 'pre' : 'normal',
            transformStyle: 'preserve-3d',
            perspective: '1000px',
          }}
        >
          {item === ' ' ? '\u00A0' : item}
          {splitBy === 'word' && index < items.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </motion.span>
  )
}

/**
 * カウントアップアニメーション
 */
interface CountUpProps {
  end: number
  suffix?: string
  duration?: number
  className?: string
}

export function CountUp({ end, suffix = '', duration = 2, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      
      // イーズアウト
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(easeOut * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isInView, end, duration])

  return (
    <span ref={ref} className={className}>
      {count}{suffix}
    </span>
  )
}

export default AnimatedText
