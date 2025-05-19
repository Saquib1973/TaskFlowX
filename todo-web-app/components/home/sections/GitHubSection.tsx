import React from 'react'
import Link from 'next/link'
import { FaStar, FaCodeBranch } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { SectionWithInView } from '../SectionWithInView'

const heroItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 16 } },
}

export const GitHubSection = () => (
  <SectionWithInView className="flex flex-col items-center justify-center px-4 h-full">
    <motion.h3
      variants={heroItemVariants}
      className="mb-6 text-center text-5xl md:text-7xl text-indigo-900 font-unique"
    >
      Open Source & Community Driven
    </motion.h3>
    <motion.p
      variants={heroItemVariants}
      className="mb-8 max-w-2xl text-center text-base md:text-lg text-indigo-800 font-simple"
    >
      Star the repository to show your support, or contribute by submitting pull
      requests, reporting issues, or suggesting new features.
    </motion.p>
    <motion.div variants={heroItemVariants} className="flex gap-4">
      <Link
        href="https://github.com/Saquib1973/TaskFlowX"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded px-6 py-4 text-base font-medium uppercase text-white transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 md:text-lg bg-indigo-600 hover:bg-indigo-800 shadow-[4px_4px_0px_black] hover:shadow-[8px_8px_0px_black] font-simple"
      >
        <FaStar />
        <span>Star on GitHub</span>
      </Link>
      <Link
        href="https://github.com/Saquib1973/TaskFlowX"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded px-6 py-4 text-base font-medium uppercase text-white transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 md:text-lg bg-indigo-600 hover:bg-indigo-800 shadow-[4px_4px_0px_black] hover:shadow-[8px_8px_0px_black] font-simple"
      >
        <FaCodeBranch />
        <span>Contribute</span>
      </Link>
    </motion.div>
  </SectionWithInView>
)