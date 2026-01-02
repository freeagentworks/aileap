'use client'

import { useState, useEffect, useCallback } from 'react'
import { throttle } from '@/lib/utils'

interface ScrollPosition {
  scrollY: number
  scrollX: number
  scrollDirection: 'up' | 'down' | null
  isScrolled: boolean
  progress: number
}

/**
 * スクロール位置を追跡するフック
 * 
 * @param threshold - スクロール判定のしきい値（デフォルト: 50px）
 * @returns ScrollPosition - スクロール情報
 */
export function useScrollPosition(threshold = 50): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollY: 0,
    scrollX: 0,
    scrollDirection: null,
    isScrolled: false,
    progress: 0,
  })

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY
    const currentScrollX = window.scrollX
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = documentHeight > 0 ? currentScrollY / documentHeight : 0

    setScrollPosition((prev) => ({
      scrollY: currentScrollY,
      scrollX: currentScrollX,
      scrollDirection: currentScrollY > prev.scrollY ? 'down' : currentScrollY < prev.scrollY ? 'up' : prev.scrollDirection,
      isScrolled: currentScrollY > threshold,
      progress,
    }))
  }, [threshold])

  useEffect(() => {
    // 初期値を設定
    handleScroll()

    // スロットルを適用してパフォーマンスを最適化
    const throttledScroll = throttle(handleScroll, 16) // ~60fps

    window.addEventListener('scroll', throttledScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', throttledScroll)
    }
  }, [handleScroll])

  return scrollPosition
}

export default useScrollPosition
