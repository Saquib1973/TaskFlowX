import React from 'react'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { SectionWithInView } from '../SectionWithInView'

const heroItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 16 } },
}

interface HeroSectionProps {
  isAuthenticated: boolean
}

export const HeroSection = ({ isAuthenticated }: HeroSectionProps) => (
  <SectionWithInView className="flex flex-col items-center justify-center px-4 h-full">
    <motion.h3
      variants={heroItemVariants}
      className="mb-6 text-center text-5xl md:text-7xl text-violet-900 font-unique"
    >
      Your Personal Task Manager
    </motion.h3>
    <motion.p
      variants={heroItemVariants}
      className="mb-8 max-w-2xl text-center text-base md:text-lg text-violet-800 font-simple"
    >
      Stay organized and boost your productivity with our intuitive task management app.
      Create, track, and complete your tasks with ease.
    </motion.p>
    <motion.div variants={heroItemVariants}>
      <Link
        href={isAuthenticated ? "/todos" : "/auth/login"}
        className="flex items-center gap-2 rounded px-6 py-4 text-base font-medium uppercase text-white transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 md:text-lg bg-violet-700 hover:bg-violet-900 shadow-[4px_4px_0px_black] hover:shadow-[8px_8px_0px_black] font-simple"
      >
        <span>{isAuthenticated ? "Go to My Tasks" : "Get Started"}</span>
        <FaArrowRight />
      </Link>
    </motion.div>
  </SectionWithInView>
)