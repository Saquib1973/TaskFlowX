import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Profile } from './Profile'

interface HeaderProps {
  userName?: string
  onLogout: () => void
  isGridLayout: boolean
  onLayoutToggle: () => void
}

export const Header: React.FC<HeaderProps> = ({
  userName,
  onLogout,
  isGridLayout,
  onLayoutToggle
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex justify-between items-center mb-10"
    >
      <div>
        <Link href="/" className="text-3xl font-bold text-textPrimary font-unique">
          TaskFlow<span className="text-accentPrimary text-4xl">X</span>
        </Link>
        {userName && (
          <p className="text-sm text-textSecondary mt-1 font-simple">
            Welcome back, {userName}
          </p>
        )}
      </div>
      <Profile
        userName={userName}
        onLogout={onLogout}
        isGridLayout={isGridLayout}
        onLayoutToggle={onLayoutToggle}
      />
    </motion.div>
  )
}