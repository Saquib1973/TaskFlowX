import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EllipsisHorizontalIcon, UserCircleIcon, ArrowRightOnRectangleIcon, Squares2X2Icon, ListBulletIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

interface ProfileProps {
  userName?: string
  onLogout: () => void
  isGridLayout: boolean
  onLayoutToggle: () => void
}

export const Profile: React.FC<ProfileProps> = ({
  userName,
  onLogout,
  isGridLayout,
  onLayoutToggle
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative z-10" ref={profileRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 cursor-pointer text-lg text-textSecondary hover:text-textPrimary transition-colors duration-200 font-simple"
      >
        <EllipsisHorizontalIcon className="size-7" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white border border-gray-200"
          >
            <div className="" role="menu" aria-orientation="vertical">
              <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                <p className="font-medium">{userName}</p>
                <p className="text-gray-500">User Account</p>
              </div>

              <Link
                href="/profile"
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                <UserCircleIcon className="h-5 w-5" />
                <span>Profile</span>
              </Link>

              <button
                onClick={() => {
                  onLayoutToggle()
                  setIsOpen(false)
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                role="menuitem"
              >
                {isGridLayout ? (
                  <>
                    <ListBulletIcon className="h-5 w-5" />
                    <span>List View</span>
                  </>
                ) : (
                  <>
                    <Squares2X2Icon className="h-5 w-5" />
                    <span>Grid View</span>
                  </>
                )}
              </button>

              <button
                onClick={onLogout}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                role="menuitem"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}