'use client'
import React from 'react'

const Loader = () => {
  return (
    <div className="relative h-10 aspect-square rounded-full flex items-center justify-center loader-container">
      <div className="gradient-spinner"></div>
      <div className="bg-white h-8 rounded-full aspect-square relative z-10 shadow-sm"></div>
    </div>
  )
}

export default Loader
