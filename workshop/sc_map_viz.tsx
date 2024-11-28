'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Define our color scheme
const colors = {
  default: '#d3d3d3',
  hover1: '#ff9999',
  hover2: '#99ff99',
  hover3: '#9999ff'
}

// Simplified SVG paths for a few South Carolina counties
const counties = [
  { name: 'Greenville', path: 'M100,50 L150,50 L150,100 L100,100 Z' },
  { name: 'Charleston', path: 'M300,250 L350,250 L350,300 L300,300 Z' },
  { name: 'Columbia', path: 'M200,150 L250,150 L250,200 L200,200 Z' },
  { name: 'Myrtle Beach', path: 'M350,150 L400,150 L400,200 L350,200 Z' },
  // Add more counties here
]

const SouthCarolinaMap: React.FC = () => {
  const [hoveredCounty, setHoveredCounty] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const getCountyColor = (countyName: string) => {
    if (isMobile || !hoveredCounty) return colors.default
    if (hoveredCounty === countyName) {
      const colorIndex = (counties.findIndex(c => c.name === countyName) % 3) + 1
      return colors[`hover${colorIndex}` as keyof typeof colors]
    }
    return colors.default
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Interactive Map of South Carolina</CardTitle>
      </CardHeader>
      <CardContent>
        <svg viewBox="0 0 500 350" className="w-full h-auto">
          {counties.map((county) => (
            <path
              key={county.name}
              d={county.path}
              fill={getCountyColor(county.name)}
              stroke="#ffffff"
              strokeWidth="2"
              onMouseEnter={() => !isMobile && setHoveredCounty(county.name)}
              onMouseLeave={() => !isMobile && setHoveredCounty(null)}
              className={`transition-colors duration-300 ${!isMobile ? 'cursor-pointer' : ''}`}
              role="button"
              aria-label={county.name}
              tabIndex={0}
            />
          ))}
        </svg>
        <div className="mt-4 text-center text-lg font-semibold" aria-live="polite">
          {hoveredCounty ? `Hovering over: ${hoveredCounty}` : 'Hover over a county'}
        </div>
      </CardContent>
    </Card>
  )
}

export default SouthCarolinaMap
