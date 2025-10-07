'use client'

import { useState, useEffect, useRef } from 'react'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import PayRevealSection from '@/components/PayRevealSection'
import Features from '@/components/Features'
import HowItWorks from '@/components/HowItWorks'
import CTASection from '@/components/CTASection'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const scrollPathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      
      // Update scroll path animation
      if (scrollPathRef.current) {
        const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
        scrollPathRef.current.style.strokeDashoffset = `${100 - (scrollProgress * 100)}%`
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white overflow-x-hidden relative">
     
      <Header />
      <HeroSection />
      <PayRevealSection />
      <Features scrollY={scrollY} />
      <CTASection />
      <Testimonials />
      <Footer />
    </div>
  )
}
