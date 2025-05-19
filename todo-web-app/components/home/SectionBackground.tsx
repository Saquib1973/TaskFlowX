import React from 'react'
import { SECTION_COLORS } from './constants'

interface SectionBackgroundProps {
  activeSection: number
}

export const SectionBackground: React.FC<SectionBackgroundProps> = ({ activeSection }) => {
  return (
    <div
      className={`absolute inset-0 transition-colors duration-700 ease-in-out ${SECTION_COLORS[activeSection]}`}
      style={{ zIndex: -1 }}
    />
  )
}