'use client'

import { RevealText } from '@/components/reveal-text'
import { CircularRevealHeading } from '@/components/ui/circular-reveal-heading'
import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"

// Web3 payments platform items for circular reveal
const paymentItems = [
  {
    text: "INSTANT",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  },
  {
    text: "SECURE",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  },
  {
    text: "GLOBAL",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  },
  {
    text: "AUTOMATED",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  }
]

// Custom component for ANYWHERE that shows images by default
function AnywhereRevealText({ shouldAnimate }: { shouldAnimate: boolean }) {
  const [showRedText, setShowRedText] = useState(false)
  const text = "ANYWHERE"
  const letterImages = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // A
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // N
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // Y
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // W
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // H
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // E
    "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // R
    "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // E
  ]
  
  useEffect(() => {
    if (shouldAnimate) {
      const timer = setTimeout(() => {
        setShowRedText(true)
      }, 1200) // Delay for overlay effect
      
      return () => clearTimeout(timer)
    }
  }, [shouldAnimate])

  return (
    <div className="flex justify-start">
      <div className="flex">
        {text.split("").map((letter, index) => (
          <motion.span
            key={index}
            className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tight relative overflow-hidden"
            initial={{ scale: 0, opacity: 0 }}
            animate={shouldAnimate ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{
              delay: shouldAnimate ? (index * 0.12) + 0.5 : 0, // Start after other texts
              type: "spring",
              damping: 8,
              stiffness: 200,
              mass: 0.8,
            }}
          >
            {/* Image text layer always visible */}
            <motion.span
              className="text-transparent bg-clip-text bg-cover bg-no-repeat"
              animate={shouldAnimate ? { 
                backgroundPosition: "10% center"
              } : {}}
              transition={{ 
                backgroundPosition: { 
                  duration: 3,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse"
                }
              }}
              style={{
                backgroundImage: `url('${letterImages[index % letterImages.length]}')`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {letter}
            </motion.span>
            
            {/* Overlay text layer */}
            {showRedText && shouldAnimate && (
              <motion.span
                className="absolute inset-0 text-sky-500 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.4,
                  times: [0, 0.1, 0.7, 1],
                  ease: "easeInOut"
                }}
              >
                {letter}
              </motion.span>
            )}
          </motion.span>
        ))}
      </div>
    </div>
  )
}

export default function PayRevealSection() {
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true)
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: '-50px 0px' // Start animation slightly before the section is fully visible
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [isInView])

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-8 lg:px-16 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content - Reveal Text */}
          <div className="space-y-4 text-left">
            <div className="flex justify-start">
              {isInView && (
                <RevealText 
                  text="TRACK"
                  textColor="text-gray-900"
                  overlayColor="text-sky-500"
                  fontSize="text-4xl md:text-6xl lg:text-8xl"
                  letterDelay={0.08}
                  overlayDelay={0.05}
                  overlayDuration={0.4}
                  springDuration={600}
                />
              )}
            </div>
            <div className="flex justify-start">
              {isInView && (
                <RevealText 
                  text="EVERY"
                  textColor="text-gray-900"
                  overlayColor="text-sky-500"
                  fontSize="text-4xl md:text-6xl lg:text-8xl"
                  letterDelay={0.1}
                  overlayDelay={0.05}
                  overlayDuration={0.4}
                  springDuration={600}
                />
              )}
            </div>
            <div className="flex justify-start">
              {isInView && (
                <RevealText 
                  text="RUPEE"
                  textColor="text-gray-900"
                  overlayColor="text-sky-500"
                  fontSize="text-4xl md:text-6xl lg:text-8xl"
                  letterDelay={0.12}
                  overlayDelay={0.05}
                  overlayDuration={0.4}
                  springDuration={600}
                />
              )}
            </div>
            
            <p className="mt-12 text-xl text-gray-600 max-w-2xl">
              Take complete control of your finances with intelligent expense tracking, budget management, and AI-powered insights to optimize your financial health.
            </p>
          </div>

          {/* Right Content - Payment Illustration */}
          <div className="flex items-center justify-center lg:justify-end">
            {isInView && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  delay: 1.5, // Start after text animations
                  duration: 0.8,
                  type: "spring",
                  damping: 20,
                  stiffness: 100
                }}
                className="relative max-w-lg w-full"
              >
                {/* Main Payment Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-cyan-50 to-blue-100">
                  <img
                    src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Financial Dashboard Illustration"
                    className="w-full h-[400px] object-cover"
                  />
                  
                  {/* Floating Payment Cards */}
                  <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 2, duration: 0.6 }}
                    className="absolute top-8 -left-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v2H4V6zm0 4h12v4H4v-4z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-800">Monthly Budget</div>
                        <div className="text-xs text-gray-500">₹25,000</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Success Notification */}
                  <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 2.3, duration: 0.6 }}
                    className="absolute top-24 -right-4 bg-emerald-500 text-white rounded-2xl p-4 shadow-lg"
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-sm font-medium">Budget On Track!</span>
                    </div>
                  </motion.div>

                  {/* Mobile Payment Interface */}
                  <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 2.6, duration: 0.6 }}
                    className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-700">Categories</span>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-sky-400 rounded-full"></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-gradient-to-r from-cyan-100 to-blue-100 rounded-lg p-2 text-center">
                        <div className="text-xs font-medium text-gray-700">Food</div>
                      </div>
                      <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-2 text-center">
                        <div className="text-xs font-medium text-gray-700">Travel</div>
                      </div>
                      <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-2 text-center">
                        <div className="text-xs font-medium text-gray-700">Bills</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Animated Background Orbs */}
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute top-1/4 right-1/4 w-16 h-16 bg-cyan-300/30 rounded-full blur-xl"
                  />
                  <motion.div
                    animate={{ 
                      scale: [1.2, 1, 1.2],
                      opacity: [0.2, 0.5, 0.2]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute bottom-1/3 left-1/4 w-20 h-20 bg-blue-300/30 rounded-full blur-xl"
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}