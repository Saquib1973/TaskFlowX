import React from 'react'
import { FaCalendarAlt, FaShieldAlt, FaTools, FaStar, FaAndroid, FaGithub } from 'react-icons/fa'

export const SECTION_COLORS = [
  'bg-violet-200',
  'bg-pink-200',
  'bg-emerald-200',
  'bg-indigo-200',
]

export const SECTION_LABELS = [
  { label: 'Home', icon: React.createElement(FaCalendarAlt) },
  { label: 'Security', icon: React.createElement(FaShieldAlt) },
  { label: 'Features', icon: React.createElement(FaTools) },
  { label: 'Reviews', icon: React.createElement(FaStar) },
  { label: 'Download', icon: React.createElement(FaAndroid) },
  { label: 'GitHub', icon: React.createElement(FaGithub) },
]

export const SECTION_BAR_COLORS = [
  'bg-violet-500',
  'bg-pink-500',
  'bg-green-600',
  'bg-yellow-500',
  'bg-emerald-600',
  'bg-indigo-600',
]