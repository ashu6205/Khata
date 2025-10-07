'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <nav className="relative top-0 left-0 right-0 z-50 px-6 lg:px-12 py-6">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="font-bold text-2xl text-slate-800">
          KHATA
        </div>
        
        {/* Get Started Button */}
        <Link 
          href="/login"
          className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:from-sky-600 hover:to-blue-700 transition-colors"
        >
          Get Started
        </Link>
      </div>
    </nav>
  )
}
