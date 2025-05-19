import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const heroVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 60,
      damping: 18,
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

interface SectionWithInViewProps {
  children: React.ReactNode
  className?: string
}

export const SectionWithInView = ({ children, ...props }: SectionWithInViewProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })

  return (
    <motion.div
      ref={ref}
      variants={heroVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={props.className}
    >
      {children}
    </motion.div>
  )
}