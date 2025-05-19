'use client'
import React from 'react'
import { motion } from 'framer-motion'

interface PageAnimateWrapperProps {
  children: React.ReactNode
  className?: string
}

const PageAnimateWrapper: React.FC<PageAnimateWrapperProps> = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 20,
        duration: 0.3
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default PageAnimateWrapper