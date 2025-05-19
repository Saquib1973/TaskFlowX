import React, { useEffect, useState } from 'react'
import { MicroProgressBar } from './MicroProgressBar'
import { SECTION_BAR_COLORS } from './constants'
import { SectionBackground } from './SectionBackground'
import { SectionSlides } from './SectionSlides'
import { SectionNavigation } from './SectionNavigation'

interface SectionContainerProps {
  sections: React.ReactNode[]
  activeSection: number
  navigateToSection: (index: number) => void
  isScrollingRef: React.MutableRefObject<boolean>
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  sections,
  activeSection,
  navigateToSection,
  isScrollingRef
}) => {
  const [showBar, setShowBar] = useState(false)

  useEffect(() => {
    setShowBar(true)
    const barTimeout = setTimeout(() => setShowBar(false), 1200)
    return () => clearTimeout(barTimeout)
  }, [activeSection])

  return (
    <div className="fixed inset-0">
      <MicroProgressBar
        activeSection={activeSection}
        totalSections={sections.length}
        colorClass={SECTION_BAR_COLORS[activeSection]}
        visible={showBar}
      />

      <SectionBackground activeSection={activeSection} />

      <SectionSlides
        sections={sections}
        activeSection={activeSection}
        onTransitionEnd={() => {
          isScrollingRef.current = false
        }}
      />

      <SectionNavigation
        activeSection={activeSection}
        totalSections={sections.length}
        onNavigate={navigateToSection}
      />
    </div>
  )
}