'use client'

import React from 'react'
import { useAuth } from '../context/AuthContext'
import { HeroSection } from '../components/home/sections/HeroSection'
import { SecuritySection } from '../components/home/sections/SecuritySection'
import { AndroidSection } from '../components/home/sections/AndroidSection'
import { GitHubSection } from '../components/home/sections/GitHubSection'
import { SectionContainer } from '../components/home/SectionContainer'
import { useScrollHandler } from '../components/home/useScrollHandler'
import PageAnimateWrapper from '../components/PageAnimateWrapper'
const HomePage = () => {
  const { isAuthenticated } = useAuth()
  const sections = [
    <HeroSection key="hero" isAuthenticated={isAuthenticated} />,
    <SecuritySection key="security" />,
    <AndroidSection key="android" />,
    <GitHubSection key="github" />,
  ]

  const { activeSection, navigateToSection, isScrollingRef } = useScrollHandler(sections.length)

  return (
    <PageAnimateWrapper>
      <SectionContainer
        sections={sections}
        activeSection={activeSection}
        navigateToSection={navigateToSection}
        isScrollingRef={isScrollingRef}
      />
    </PageAnimateWrapper>
  )
}

export default HomePage
