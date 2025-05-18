'use client'

import React, { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import {
  FaCalendarAlt,
  FaShieldAlt,
  FaTools,
  FaStar,
  FaArrowRight,
  FaAndroid,
} from 'react-icons/fa'
import { useAuth } from './context/AuthContext'
import { motion } from 'framer-motion'

const SECTION_COLORS = [
  'bg-violet-400',
  'bg-pink-200',
  'bg-green-200',
  'bg-yellow-200',
  'bg-emerald-200',
]

// Section labels and icons
const SECTION_LABELS = [
  { label: 'Home', icon: <FaCalendarAlt /> },
  { label: 'Security', icon: <FaShieldAlt /> },
  { label: 'Features', icon: <FaTools /> },
  { label: 'Reviews', icon: <FaStar /> },
  { label: 'Download', icon: <FaAndroid /> },
]

// Micro progress bar colors for each section
const SECTION_BAR_COLORS = [
  'bg-violet-500',
  'bg-pink-500',
  'bg-green-600',
  'bg-yellow-500',
  'bg-emerald-600',
]

// Micro progress bar
const MicroProgressBar = ({ activeSection, totalSections, colorClass, visible }: { activeSection: number, totalSections: number, colorClass: string, visible: boolean }) => (
        <motion.div
          initial={{ opacity: 0 }}
    animate={{ opacity: visible ? 1 : 0 }}
    transition={{ duration: 0.4 }}
    className={`fixed top-0 left-0 w-full h-1 z-50 bg-gray-200/40`}
    style={{ pointerEvents: 'none' }}
  >
    <motion.div
      className={`h-full ${colorClass} rounded-r-full`}
      initial={{ width: 0 }}
      animate={{ width: `${((activeSection + 1) / totalSections) * 100}%` }}
      transition={{ duration: 0.5 }}
    />
        </motion.div>
      )

// Add new BubbleNavigation component after the MicroProgressBar component
const BubbleNavigation = ({
  activeSection,
  sections,
  onNavigate,
}: {
  activeSection: number
  sections: typeof SECTION_LABELS
  onNavigate: (index: number) => void
}) => {
  // Use straight line navigation
  return (
    <>
      {/* Desktop Vertical Navigation */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-7 select-none">
        {sections.map((section, index) => {
          const isActive = activeSection === index;
          return (
            <motion.button
              key={index}
              onClick={() => onNavigate(index)}
              className="group flex flex-col items-center focus:outline-none bg-transparent border-none p-0"
              aria-label={`Go to ${section.label} section`}
              tabIndex={0}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                layout
                initial={false}
                animate={isActive ? {
                  width: '7rem',
                  height: '2rem',
                  backgroundColor: '#8b5cf6',
                  color: '#fff',
                  scale: 1.1
                } : {
                  width: '7rem',
                  height: '0.7rem',
                  backgroundColor: '#fff',
                  color: 'rgba(0,0,0,0)',
                  scale: 1
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className={`flex items-center justify-center rounded-full max-w-xs text-base font-medium shadow-lg border border-gray-300 transition-all duration-300
                  ${isActive ? 'bg-violet-500 text-white border-none' : 'bg-white text-transparent group-hover:bg-violet-100'}
                `}
              >
                {isActive ? section.label : '\u00A0'}
              </motion.span>
            </motion.button>
          );
        })}
      </div>
      {/* Mobile Horizontal Navigation */}
      <div className="fixed bottom-0 left-0 w-full z-50 flex md:hidden flex-col items-center pointer-events-none">
        {/* Bubble bar */}
        <div className="w-full flex justify-center gap-7 bg-white/70 backdrop-blur-md py-4 pointer-events-auto shadow-2xl rounded-t-xl">
          {sections.map((section, index) => {
            const isActive = activeSection === index;
            return (
              <button
                key={index}
                onClick={() => onNavigate(index)}
                className={`transition-all duration-300 rounded-full focus:outline-none flex items-center justify-center
                  ${isActive ? 'bg-violet-500 text-white px-5 py-2 rounded-full min-w-[90px] max-w-xs text-base font-medium shadow-lg scale-110'
                  : 'bg-white w-10 h-10 rounded-full border border-gray-300 group-hover:bg-violet-100 scale-100'}
                `}
                style={{
                  height: isActive ? '2.2rem' : '2.5rem',
                  minWidth: isActive ? '90px' : '2.5rem',
                  boxShadow: isActive ? '0 2px 8px 0 rgba(124,58,237,0.10)' : '0 1px 4px 0 rgba(0,0,0,0.04)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  whiteSpace: 'nowrap',
                  fontSize: isActive ? '1rem' : 0,
                  padding: isActive ? '0 1.25rem' : 0,
                  border: isActive ? 'none' : undefined,
                  transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)'
                }}
                aria-label={`Go to ${section.label} section`}
              >
                {isActive ? section.label : ''}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

const HomePage = () => {
  const { isAuthenticated } = useAuth()
  const [activeSection, setActiveSection] = useState(0)
  const isScrollingRef = useRef(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastScrollTimeRef = useRef(0)
  const scrollBufferRef = useRef(0)
  const scrollThrottleTimeRef = useRef<NodeJS.Timeout | null>(null)
  const [showBar, setShowBar] = useState(false)

  // Navigate to a specific section
  const navigateToSection = (index: number) => {
    // Only prevent navigation during active transitions
    if (isScrollingRef.current) return

    // Validate section index
    const nextSection = Math.max(0, Math.min(SECTION_COLORS.length - 1, index))
    if (nextSection === activeSection) return

    // Lock scrolling during transition
    isScrollingRef.current = true

    // Change section
    setActiveSection(nextSection)

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Automatically unlock after transition completes
    timeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false
      scrollBufferRef.current = 0 // Reset scroll buffer
    }, 700) // Match with CSS transition duration
  }

  // Process accumulated wheel events with debounce
  const processWheelEvents = () => {
    if (isScrollingRef.current) return

    // Only navigate if we have accumulated enough scroll
    if (Math.abs(scrollBufferRef.current) > 10) {
      const direction = scrollBufferRef.current > 0 ? 1 : -1
      navigateToSection(activeSection + direction)
      scrollBufferRef.current = 0 // Reset buffer after navigation
    }
  }

  // Handle wheel events with better trackpad support
  useEffect(() => {
    // Time window for scroll accumulation
    const SCROLL_ACCUMULATION_WINDOW = 200 // ms

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      const now = Date.now()

      // Accumulate scroll values within time window
      scrollBufferRef.current += e.deltaY

      // Clear any existing throttle timeout
      if (scrollThrottleTimeRef.current) {
        clearTimeout(scrollThrottleTimeRef.current)
      }

      // If we're not currently in a scrolling animation
      if (!isScrollingRef.current) {
        // If enough time has passed since last scroll
        if (now - lastScrollTimeRef.current > SCROLL_ACCUMULATION_WINDOW) {
          // Process wheel events after a short delay to collect more events
          scrollThrottleTimeRef.current = setTimeout(() => {
            processWheelEvents()
            lastScrollTimeRef.current = now
          }, 50) // Short delay to collect trackpad events
        } else {
          // We're scrolling too fast, update the time but don't process yet
          lastScrollTimeRef.current = now
        }
      }
    }

    // Add wheel event listener
    window.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)

      // Clean up all timeouts
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (scrollThrottleTimeRef.current)
        clearTimeout(scrollThrottleTimeRef.current)
    }
  }, [activeSection])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrollingRef.current) return

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault()
        navigateToSection(activeSection + 1)
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        navigateToSection(activeSection - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeSection])

  // Touch navigation
  useEffect(() => {
    let touchStartY = 0
    let touchStartTime = 0

    const handleTouchStart = (e: TouchEvent) => {
      if (isScrollingRef.current) return

      touchStartY = e.touches[0].clientY
      touchStartTime = Date.now()
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrollingRef.current) return

      const touchEndY = e.changedTouches[0].clientY
      const touchDuration = Date.now() - touchStartTime
      const touchDistance = touchStartY - touchEndY

      // Only navigate for intentional swipes
      if (Math.abs(touchDistance) > 50 && touchDuration < 300) {
        const direction = touchDistance > 0 ? 1 : -1
        navigateToSection(activeSection + direction)
      }
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [activeSection])

  // Reset scrolling state when component unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (scrollThrottleTimeRef.current)
        clearTimeout(scrollThrottleTimeRef.current)
      isScrollingRef.current = false
    }
  }, [])

  // Force unlock on any section change
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Set a timeout to ensure the scrolling lock is released
    timeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false
      scrollBufferRef.current = 0 // Reset scroll buffer
    }, 700)

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [activeSection])

  // Show bar and hint on scroll or section change
  useEffect(() => {
    setShowBar(true)
    const barTimeout = setTimeout(() => setShowBar(false), 1200)
    return () => {
      clearTimeout(barTimeout)
    }
  }, [activeSection])

  // Section content with updated button styling
  const sections = [
    // Hero Section
    <div
      key="hero"
      className="flex flex-col items-center justify-center px-4 h-full"
    >
      <FaCalendarAlt className="mb-4 text-5xl text-violet-700" />
      <h3 className="mb-6 text-center text-4xl font-bold md:text-6xl text-violet-900">
        Your Personal Task Manager
      </h3>
      <p className="mb-8 max-w-lg text-center text-base md:text-lg text-violet-800">
        Stay organized and boost your productivity with our intuitive task management app.
        Create, track, and complete your tasks with ease. Perfect for personal goals,
        work projects, and daily routines. Start managing your tasks smarter today!
      </p>
      <Link
        href={isAuthenticated ? "/todos" : "/auth/login"}
        className="flex items-center gap-2 rounded px-6 py-4 text-base font-medium uppercase text-white transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 md:text-lg bg-violet-700 hover:bg-violet-900 shadow-[4px_4px_0px_black] hover:shadow-[8px_8px_0px_black]"
      >
        <span>{isAuthenticated ? "Go to My Tasks" : "Get Started"}</span>
        <FaArrowRight />
      </Link>
    </div>,

    // Security Section
    <div
      key="security"
      className="flex flex-col items-center justify-center px-4 h-full"
    >
      <FaShieldAlt className="mb-4 text-5xl text-pink-600" />
      <h3 className="mb-6 text-center text-4xl font-bold md:text-6xl text-pink-900">
        Seamless Data Sync
      </h3>
      <p className="mb-8 max-w-lg text-center text-base md:text-lg text-pink-800">
        Your tasks are securely stored in our cloud database and instantly synchronized
        across all your devices. Access your tasks anywhere - on the web or through our
        mobile app. Your data is encrypted and backed up automatically, ensuring your
        tasks are always safe and accessible.
      </p>
      <Link
        href="/privacy"
        className="flex items-center gap-2 rounded px-6 py-4 text-base font-medium uppercase text-white transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 md:text-lg bg-pink-600 hover:bg-pink-800 shadow-[4px_4px_0px_black] hover:shadow-[8px_8px_0px_black]"
      >
        <span>View Security Details</span>
        <FaArrowRight />
      </Link>
    </div>,

    // Features Section
    <div
      key="features"
      className="flex flex-col items-center justify-center px-4 h-full"
    >
      <FaTools className="mb-4 text-5xl text-green-700" />
      <h3 className="mb-6 text-center text-4xl font-bold md:text-6xl text-green-900">
        Powerful Features
      </h3>
      <p className="mb-8 max-w-lg text-center text-base md:text-lg text-green-800">
        • Create and organize tasks with custom categories and tags<br />
        • Set due dates and reminders for important tasks<br />
        • Track progress with completion statistics<br />
        • Share tasks and collaborate with others<br />
        • Offline support for uninterrupted productivity<br />
        • Dark mode and customizable themes
      </p>
      <Link
        href="/features"
        className="flex items-center gap-2 rounded px-6 py-4 text-base font-medium uppercase text-white transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 md:text-lg bg-green-600 hover:bg-green-800 shadow-[4px_4px_0px_black] hover:shadow-[8px_8px_0px_black]"
      >
        <span>Explore All Features</span>
        <FaArrowRight />
      </Link>
    </div>,

    // Testimonials Section
    <div
      key="testimonials"
      className="flex flex-col items-center justify-center px-4 h-full"
    >
      <FaStar className="mb-4 text-5xl text-yellow-600" />
      <h3 className="mb-6 text-center text-4xl font-bold md:text-6xl text-yellow-900">
        Trusted by Users Worldwide
      </h3>
      <p className="mb-8 max-w-lg text-center text-base md:text-lg text-yellow-800">
        &ldquo;This app has transformed how I manage my daily tasks. The sync feature is flawless!&rdquo;<br />
        - Sarah M., Project Manager<br /><br />
        &ldquo;The best task manager I&apos;ve used. Simple yet powerful features.&rdquo;<br />
        - John D., Software Developer<br /><br />
        &ldquo;Perfect for both personal and team task management.&rdquo;<br />
        - Lisa K., Team Lead
      </p>
      <Link
        href="/testimonials"
        className="flex items-center gap-2 rounded px-6 py-4 text-base font-medium uppercase text-white transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 md:text-lg bg-yellow-500 hover:bg-yellow-700 shadow-[4px_4px_0px_black] hover:shadow-[8px_8px_0px_black]"
      >
        <span>Read More Reviews</span>
        <FaArrowRight />
      </Link>
    </div>,

    // Android Download Section
    <div
      key="android"
      className="flex flex-col items-center justify-center px-4 h-full"
    >
      <FaAndroid className="mb-4 text-6xl text-emerald-700" />
      <h3 className="mb-6 text-center text-4xl font-bold md:text-5xl text-emerald-900">
        Take Your Tasks Anywhere
      </h3>
      <p className="mb-8 max-w-lg text-center text-base md:text-lg text-emerald-800">
        Download our Android app to manage your tasks on the go. Get instant notifications,
        offline access, and all the features of the web version in your pocket.
        Available on Google Play Store.
      </p>
      <Link
        href="/download-android"
        className="flex items-center gap-2 rounded px-6 py-4 text-base font-medium uppercase text-white transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 md:text-lg bg-emerald-600 hover:bg-emerald-800 shadow-[4px_4px_0px_black] hover:shadow-[8px_8px_0px_black]"
      >
        <span>Download Android App</span>
        <FaAndroid />
      </Link>
    </div>,
  ]

  return (
    <div className="fixed inset-0">
      <MicroProgressBar
        activeSection={activeSection}
        totalSections={sections.length}
        colorClass={SECTION_BAR_COLORS[activeSection]}
        visible={showBar}
      />

      {/* Replace SectionPeek components with BubbleNavigation */}
      <BubbleNavigation
        activeSection={activeSection}
        sections={SECTION_LABELS}
        onNavigate={navigateToSection}
      />

      {/* Current section background with transition */}
      <div
        className={`absolute inset-0 transition-colors duration-700 ease-in-out ${SECTION_COLORS[activeSection]}`}
        style={{ zIndex: -1 }}
      />
      {/* Section container with slide animation */}
      <div
        className="h-screen w-screen overflow-hidden"
        onTransitionEnd={() => {
          isScrollingRef.current = false
          scrollBufferRef.current = 0
        }}
      >
        <div
          className="relative h-full w-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateY(-${activeSection * 100}%)` }}
        >
          {sections.map((section, index) => (
            <div key={index} className="h-full w-full">
              {section}
            </div>
          ))}
        </div>
      </div>

      {/* Add bubble pulse animation */}
      <style jsx global>{`
@keyframes bubble-pulse {
  0% { transform: scale(1.15); box-shadow: 0 2px 8px 0 rgba(124,58,237,0.10); }
  50% { transform: scale(1.22); box-shadow: 0 4px 12px 0 rgba(124,58,237,0.13); }
  100% { transform: scale(1.15); box-shadow: 0 2px 8px 0 rgba(124,58,237,0.10); }
}
.animate-bubble-pulse {
  animation: bubble-pulse 1.2s cubic-bezier(0.4,0,0.2,1) 1;
}
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.4s cubic-bezier(0.4,0,0.2,1);
}
`}</style>
    </div>
  )
}

export default HomePage
