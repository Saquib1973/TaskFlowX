'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaAndroid, FaTimes } from 'react-icons/fa'

const DownloadBanner = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isClosed, setIsClosed] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== '/') {
      setIsClosed(true)
      return
    }

    const hasClosedBanner = localStorage.getItem('downloadBannerClosed')
    if (hasClosedBanner) {
      setIsClosed(true)
      return
    }

    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 10000)

    return () => clearTimeout(timer)
  }, [pathname])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      setIsClosed(true)
      localStorage.setItem('downloadBannerClosed', 'true')
    }, 300)
  }

  if (isClosed) return null

  return (
    <div
      className={`relative bg-green-50 border-b border-green-100 transition-all duration-500 ease-in-out ${
        isVisible
          ? 'h-auto opacity-100 transform translate-y-0'
          : 'h-0 opacity-0 transform -translate-y-full overflow-hidden'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FaAndroid size={20} className="text-green-600 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-green-800">Get the Android App</h3>
              <p className="text-xs text-green-600">Download now for a better experience</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/download-android"
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              Download
            </Link>
            <button
              onClick={handleClose}
              className="text-green-600 hover:text-green-800 focus:outline-none transition-colors duration-200"
              aria-label="Close banner"
            >
              <FaTimes size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DownloadBanner