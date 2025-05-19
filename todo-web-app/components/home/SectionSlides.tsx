import React from 'react'

interface SectionSlidesProps {
  sections: React.ReactNode[]
  activeSection: number
  onTransitionEnd: () => void
}

export const SectionSlides: React.FC<SectionSlidesProps> = ({
  sections,
  activeSection,
  onTransitionEnd
}) => {
  return (
    <div
      className="h-screen w-screen overflow-hidden"
      onTransitionEnd={onTransitionEnd}
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
  )
}