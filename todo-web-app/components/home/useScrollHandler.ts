import { useRef, useEffect, useState } from 'react'

export const useScrollHandler = (totalSections: number) => {
  const [activeSection, setActiveSection] = useState(0)
  const isScrollingRef = useRef(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastScrollTimeRef = useRef(0)
  const scrollBufferRef = useRef(0)
  const scrollThrottleTimeRef = useRef<NodeJS.Timeout | null>(null)

  const navigateToSection = (index: number) => {
    if (isScrollingRef.current) return
    const nextSection = Math.max(0, Math.min(totalSections - 1, index))
    if (nextSection === activeSection) return

    isScrollingRef.current = true
    setActiveSection(nextSection)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false
      scrollBufferRef.current = 0
    }, 700)
  }

  const processWheelEvents = () => {
    if (isScrollingRef.current) return
    if (Math.abs(scrollBufferRef.current) > 10) {
      const direction = scrollBufferRef.current > 0 ? 1 : -1
      navigateToSection(activeSection + direction)
      scrollBufferRef.current = 0
    }
  }

  useEffect(() => {
    const SCROLL_ACCUMULATION_WINDOW = 200

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const now = Date.now()
      scrollBufferRef.current += e.deltaY

      if (scrollThrottleTimeRef.current) {
        clearTimeout(scrollThrottleTimeRef.current)
      }

      if (!isScrollingRef.current) {
        if (now - lastScrollTimeRef.current > SCROLL_ACCUMULATION_WINDOW) {
          scrollThrottleTimeRef.current = setTimeout(() => {
            processWheelEvents()
            lastScrollTimeRef.current = now
          }, 50)
        } else {
          lastScrollTimeRef.current = now
        }
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (scrollThrottleTimeRef.current) clearTimeout(scrollThrottleTimeRef.current)
    }
  }, [activeSection])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrollingRef.current) return

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault()
        navigateToSection(activeSection + 1)
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        navigateToSection(activeSection - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeSection])

  useEffect(() => {
    let touchStartY = 0
    let touchStartTime = 0

    const handleTouchStart = (e: TouchEvent) => {
      if (isScrollingRef.current) return
      touchStartY = e.touches[0].clientY
      touchStartTime = Date.now()
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrollingRef.current) return
      const touchEndY = e.changedTouches[0].clientY
      const touchDuration = Date.now() - touchStartTime
      const touchDistance = touchStartY - touchEndY

      if (Math.abs(touchDistance) > 50 && touchDuration < 300) {
        const direction = touchDistance > 0 ? 1 : -1
        navigateToSection(activeSection + direction)
      }
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [activeSection])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (scrollThrottleTimeRef.current) clearTimeout(scrollThrottleTimeRef.current)
      isScrollingRef.current = false
    }
  }, [])

  return {
    activeSection,
    navigateToSection,
    isScrollingRef
  }
}