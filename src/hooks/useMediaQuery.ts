'use client'

import { useState, useEffect } from 'react'

/**
 * メディアクエリフック
 * 指定されたメディアクエリの状態を監視
 * 
 * @param query - メディアクエリ文字列
 * @returns boolean - クエリがマッチするかどうか
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // SSRを考慮して初期値を設定
    const media = window.matchMedia(query)
    setMatches(media.matches)

    // 変更を監視
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    media.addEventListener('change', listener)

    return () => {
      media.removeEventListener('change', listener)
    }
  }, [query])

  return matches
}

/**
 * 事前定義されたブレイクポイント用フック
 */
export function useBreakpoint() {
  const isMobile = useMediaQuery('(max-width: 639px)')
  const isTablet = useMediaQuery('(min-width: 640px) and (max-width: 1023px)')
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const isLargeDesktop = useMediaQuery('(min-width: 1280px)')

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
  }
}

export default useMediaQuery
