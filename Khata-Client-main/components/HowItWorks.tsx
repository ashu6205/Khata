'use client'

import { Globe, Zap, Shield } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    { 
      title: 'Track & Organize', 
      icon: Globe, 
      desc: 'Add your income and expenses effortlessly. Categorize transactions automatically with smart AI recognition.',
      step: '01'
    },
    { 
      title: 'Analyze & Budget', 
      icon: Zap, 
      desc: 'Get detailed insights into your spending patterns. Set budgets and receive smart alerts to stay on track.',
      step: '02'
    },
    { 
      title: 'Plan & Grow', 
      icon: Shield, 
      desc: 'Receive personalized financial advice from AI. Plan for future goals and watch your wealth grow.',
      step: '03'
    }
  ]

  return (
    <section id="how-it-works" className="py-24 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Track. Analyze.
            <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent"> Optimize.</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Master your finances with KHATA in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-16 left-0 w-full h-0.5 bg-gradient-to-r from-sky-300 to-blue-400 opacity-30"></div>
          
          {steps.map((step, index) => (
            <div key={step.title} className="text-center group relative">
              <div className="relative mb-8">
                <div className="absolute -top-4 -left-4 text-6xl font-bold text-sky-100 z-0">{step.step}</div>
                <div className="relative z-10 w-20 h-20 bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                  <step.icon className="w-10 h-10 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{step.title}</h3>
              <p className="text-slate-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
