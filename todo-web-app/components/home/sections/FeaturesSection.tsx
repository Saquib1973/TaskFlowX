import React from 'react'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { SectionWithInView } from '../SectionWithInView'

const heroItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 16 } },
}

export const FeaturesSection = () => (
  <SectionWithInView className="flex flex-col items-center justify-center px-4 h-full">
    <motion.h3
      variants={heroItemVariants}
      className="mb-6 text-center text-5xl md:text-7xl text-green-900 font-unique"
    >
      Powerful Features
    </motion.h3>
    <motion.p
      variants={heroItemVariants}
      className="mb-8 max-w-2xl text-center text-base md:text-lg text-green-800 font-simple"
    >
      • Create and organize tasks with custom categories and tags<br />
      • Set due dates and reminders for important tasks<br />
      • Track progress with completion statistics<br />
      • Share tasks and collaborate with others<br />
      • Offline support for uninterrupted productivity<br />
      • Dark mode and customizable themes
    </motion.p>
    <motion.div variants={heroItemVariants}>
      <Link
        href="/features"
        className="flex items-center gap-2 rounded px-6 py-4 text-base font-medium uppercase text-white transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 md:text-lg bg-green-600 hover:bg-green-800 shadow-[4px_4px_0px_black] hover:shadow-[8px_8px_0px_black] font-simple"
      >
        <span>Explore All Features</span>
        <FaArrowRight />
      </Link>
    </motion.div>
  </SectionWithInView>
)