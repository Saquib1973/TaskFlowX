import React from 'react'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { SectionWithInView } from '../SectionWithInView'

const heroItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 16 } },
}

export const SecuritySection = () => (
  <SectionWithInView className="flex flex-col items-center justify-center px-4 h-full">
    <motion.h3
      variants={heroItemVariants}
      className="mb-6 text-center text-5xl md:text-7xl text-pink-900 font-unique"
    >
      Seamless Data Sync
    </motion.h3>
    <motion.p
      variants={heroItemVariants}
      className="mb-8 max-w-lg text-center text-base md:text-lg text-pink-800 font-simple"
    >
      Your tasks are securely stored in our cloud database and instantly synchronized
      across all your devices. Access your tasks anywhere - on the web or through our
      mobile app.
    </motion.p>
    <motion.div variants={heroItemVariants}>
      <Link
        href="/privacy"
        className="flex items-center gap-2 rounded px-6 py-4 text-base font-medium uppercase text-white transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 md:text-lg bg-pink-600 hover:bg-pink-800 shadow-[4px_4px_0px_black] hover:shadow-[8px_8px_0px_black] font-simple"
      >
        <span>View Security Details</span>
        <FaArrowRight />
      </Link>
    </motion.div>
  </SectionWithInView>
)