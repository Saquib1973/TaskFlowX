import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface Section {
  label: string
  icon: React.ReactNode
}

interface PopupNavButtonProps {
  direction: 'prev' | 'next'
  section: Section | null
  onClick: () => void
  show: boolean
}

export const PopupNavButton = ({
  direction,
  section,
  onClick,
  show
}: PopupNavButtonProps) => {
  const [visible, setVisible] = useState(false)
  const hideTimeout = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (show && section) {
      setVisible(true)
      if (hideTimeout.current) clearTimeout(hideTimeout.current)
      hideTimeout.current = setTimeout(() => setVisible(false), 2500)
    } else {
      setVisible(false)
      if (hideTimeout.current) clearTimeout(hideTimeout.current)
    }
    return () => { if (hideTimeout.current) clearTimeout(hideTimeout.current) }
  }, [show, section?.label])

  const handleMouseEnter = () => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current)
    setVisible(true)
  }

  const handleMouseLeave = () => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current)
    hideTimeout.current = setTimeout(() => setVisible(false), 1200)
  }

  const handleFocus = () => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current)
    setVisible(true)
  }

  const handleBlur = () => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current)
    hideTimeout.current = setTimeout(() => setVisible(false), 1200)
  }

  if (!show || !section) return null

  const basePos = direction === 'prev'
    ? 'top-6 left-1/2 -translate-x-1/2 md:top-10'
    : 'bottom-6 left-1/2 -translate-x-1/2 md:bottom-10'

  return (
    <motion.button
      initial={{ opacity: 0, y: direction === 'prev' ? -5 : 5 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: direction === 'prev' ? -5 : 5 }}
      transition={{ type: 'spring', stiffness: 180, damping: 22 }}
      className={`fixed ${basePos} z-50 flex items-center justify-center px-6 py-2 rounded-full bg-white/90 shadow-lg border border-gray-200 text-gray-800 font-semibold text-base md:text-lg transition-all duration-300 cursor-pointer hover:bg-violet-100 focus:bg-violet-100`}
      style={{ minWidth: 0, minHeight: 0 }}
      onClick={onClick}
      aria-label={direction === 'prev' ? `Go to previous section: ${section.label}` : `Go to next section: ${section.label}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <span>{section.label}</span>
    </motion.button>
  )
}