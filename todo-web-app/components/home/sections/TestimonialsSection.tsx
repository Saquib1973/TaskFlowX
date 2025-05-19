import React from 'react'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { SectionWithInView } from '../SectionWithInView'

const heroItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 16 } },
}

export const TestimonialsSection = () => (
  <SectionWithInView className="flex flex-col items-center justify-center px-4 h-full">
    <motion.h3
      variants={heroItemVariants}
      className="mb-6 text-center text-5xl md:text-7xl text-yellow-900 font-unique"
    >
      Trusted by Users Worldwide
    </motion.h3>
    <motion.p
      variants={heroItemVariants}
      className="mb-8 max-w-lg text-center text-base md:text-lg text-yellow-800 font-simple"
    >
      &ldquo;This app has transformed how I manage my daily tasks. The sync
      feature is flawless!&rdquo;
      <br />
      - Sarah M., Project Manager
      <br />
      <br />
      &ldquo;The best task manager I&apos;ve used. Simple yet powerful
      features.&rdquo;
      <br />
      - John D., Software Developer
      <br />
      <br />
      &ldquo;Perfect for both personal and team task management.&rdquo;
      <br />- Lisa K., Team Lead
    </motion.p>
    <motion.div variants={heroItemVariants}>
      <Link
        href="/testimonials"
        className="flex items-center gap-2 rounded px-6 py-4 text-base font-medium uppercase text-white transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 md:text-lg bg-yellow-500 hover:bg-yellow-700 shadow-[4px_4px_0px_black] hover:shadow-[8px_8px_0px_black] font-simple"
      >
        <span>Read More Reviews</span>
        <FaArrowRight />
      </Link>
    </motion.div>
  </SectionWithInView>
)