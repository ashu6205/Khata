'use client'

import { useEffect, useRef, useState } from 'react'
import { Gift, Users, DollarSign, Clock, FileText, CreditCard, QrCode, Calendar, Repeat, Zap } from 'lucide-react'

const services = [
  { name: 'Transaction Tracking', icon: FileText, description: 'Monitor all your income and expenses in real-time' },
  { name: 'Budget Management', icon: DollarSign, description: 'Set and track budgets with smart insights' },
  { name: 'Expense Analytics', icon: Zap, description: 'Detailed analysis of your spending patterns' },
  { name: 'Payment Reminders', icon: Clock, description: 'Never miss important payment deadlines' },
  { name: 'Financial Reports', icon: FileText, description: 'Generate comprehensive financial reports' },
  { name: 'Categories & Tags', icon: FileText, description: 'Organize transactions with custom categories' },
  { name: 'Multi-Currency Support', icon: DollarSign, description: 'Track payments in multiple currencies' },
  { name: 'AI Financial Advisor', icon: Zap, description: 'Get personalized financial advice from AI' },
  { name: 'Secure Cloud Sync', icon: FileText, description: 'Your data synced securely across devices' },
  { name: 'Export & Backup', icon: FileText, description: 'Export data for taxes and accounting' }
]

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0)

  // Escalator animation for services
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentServiceIndex((prev) => (prev + 1) % services.length)
    }, 2000) // Change service every 2 seconds

    return () => clearInterval(interval)
  }, [])

  // Morphing bubbles animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight * 0.7 // Only for blue section

    // Morphing bubbles animation
    const bubbles: Array<{
      x: number
      y: number
      radius: number
      vx: number
      vy: number
      opacity: number
    }> = []

    // Create bubbles
    for (let i = 0; i < 6; i++) {
      bubbles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 80 + 40,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.2 + 0.1
      })
    }

    function animate() {
      if (!ctx || !canvas) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      bubbles.forEach((bubble, index) => {
        // Update position
        bubble.x += bubble.vx
        bubble.y += bubble.vy

        // Bounce off edges
        if (bubble.x <= 0 || bubble.x >= canvas.width) bubble.vx *= -1
        if (bubble.y <= 0 || bubble.y >= canvas.height) bubble.vy *= -1

        // Professional solid colors: Light Blue, Green, White
        const colorOptions = [
          `rgba(59, 130, 246, ${bubble.opacity})`, // blue-500 (lighter)
          `rgba(34, 197, 94, ${bubble.opacity})`, // green-500  
          `rgba(255, 255, 255, ${bubble.opacity * 0.3})`, // white with lower opacity
        ]
        const solidColor = colorOptions[index % 3]
        
        ctx.fillStyle = solidColor
        ctx.beginPath()
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2)
        ctx.fill()

        // Morph the bubble
        bubble.radius += Math.sin(Date.now() * 0.001 + index) * 0.3
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 0.7
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden px-1 sm:px-1 lg:px-1">
      {/* Minimal White Top Section */}
      <div className="bg-white h-8"></div>
      
      {/* Professional Blue Section */}
      <div className="relative bg-blue-500 rounded-t-[4rem] min-h-[calc(100vh-2rem)] mx-1 sm:mx-2 lg:mx-4 xl:mx-8">
        {/* Animated Background Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full rounded-t-[4rem]"
        />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 lg:px-12 max-w-7xl pt-16 pb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-12rem)]">
            {/* Left Content */}
            <div className="text-white space-y-8">
              

              {/* Main Headlines */}
              <div className="space-y-6 mb-12">
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-none tracking-tight">
                  Smart.
                </h1>
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-none tracking-tight">
                  Financial. Control.
                </h1>
              </div>

              {/* Description */}
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl leading-relaxed font-medium">
                Take control of your finances with KHATA - the ultimate personal finance management platform. Track expenses, manage budgets, and get AI-powered insights to achieve your financial goals.
              </p>
            </div>

            {/* Right Content - Services Escalator */}
            <div className="relative lg:pl-8">
              <div className="bg-white/15 backdrop-blur-xl border border-white/30 rounded-[3rem] p-8 shadow-2xl h-96 overflow-hidden">
                <h3 className="text-white text-2xl font-bold mb-8 pb-4 text-center">Our Services</h3>
                
                {/* Services Container */}
                <div className="relative h-[calc(100%-7rem)]">
                  {services.map((service, index) => {
                    // Calculate position based on current index
                    const position = (index - currentServiceIndex + services.length) % services.length
                    const translateY = position * 80 - 40 // Each service is 80px apart
                    const isVisible = position >= 0 && position < 4 // Show 4 services at once
                    const opacity = isVisible ? (position === 0 ? 1 : position === 3 ? 0.3 : 0.8) : 0
                    
                    return (
                      <div
                        key={service.name}
                        className="absolute w-full transition-all duration-500 ease-in-out"
                        style={{
                          transform: `translateY(${translateY}px)`,
                          opacity: opacity,
                          zIndex: position === 0 ? 10 : 1
                        }}
                      >
                        <div className={`flex items-center gap-4 p-4 rounded-2xl backdrop-blur-sm border transition-all duration-500 ${
                          position === 0 
                            ? 'bg-white/30 border-white/50 scale-105' 
                            : 'bg-white/10 border-white/20'
                        }`}>
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            position === 0 
                              ? 'bg-green-500 shadow-lg' 
                              : index % 3 === 0 
                                ? 'bg-blue-500/70'
                                : index % 3 === 1
                                  ? 'bg-green-500/70'
                                  : 'bg-white/20'
                          }`}>
                            <service.icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-white font-semibold text-lg truncate">{service.name}</div>
                            <div className="text-white/70 text-sm line-clamp-1">{service.description}</div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                
                {/* Gradient Overlays for smooth fade */}
                <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/15 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/15 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
