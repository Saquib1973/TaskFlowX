import React from 'react'
import { PopupNavButton } from './PopupNavButton'
import { SECTION_LABELS } from './constants'

interface SectionNavigationProps {
  activeSection: number
  totalSections: number
  onNavigate: (index: number) => void
}

export const SectionNavigation: React.FC<SectionNavigationProps> = ({
  activeSection,
  totalSections,
  onNavigate
}) => {
  return (
    <>
      <PopupNavButton
        direction="prev"
        section={activeSection > 0 ? SECTION_LABELS[activeSection - 1] : null}
        onClick={() => onNavigate(activeSection - 1)}
        show={activeSection > 0}
      />
      <PopupNavButton
        direction="next"
        section={activeSection < totalSections - 1 ? SECTION_LABELS[activeSection + 1] : null}
        onClick={() => onNavigate(activeSection + 1)}
        show={activeSection < totalSections - 1}
      />
    </>
  )
}