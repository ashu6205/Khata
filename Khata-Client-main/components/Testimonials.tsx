"use client";

import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Software Engineer",
    company: "TechCorp",
    image: "https://images.unsplash.com/photo-1494790108755-2616b332c647?w=150&h=150&fit=crop&crop=face",
    content: "KHATA transformed how I manage my finances. The AI insights helped me identify spending patterns I never noticed. I've saved ₹50,000 in just 6 months!",
    rating: 5,
    category: "budgeting"
  },
  {
    id: 2,
    name: "Rahul Verma",
    role: "Marketing Manager",
    company: "Digital Solutions",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    content: "The expense tracking is incredibly intuitive. I love how it automatically categorizes my transactions and the monthly reports help me stay on budget effortlessly.",
    rating: 5,
    category: "tracking"
  },
  {
    id: 3,
    name: "Anita Singh",
    role: "Financial Analyst",
    company: "InvestCorp",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    content: "The AI financial advisor is like having a personal finance expert in my pocket. It gives actionable advice based on my actual spending data. Absolutely brilliant!",
    rating: 5,
    category: "ai-advisor"
  },
  {
    id: 4,
    name: "Vikram Patel",
    role: "Business Owner",
    company: "Local Restaurant",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    content: "Managing both personal and business expenses was chaotic until I found KHATA. The multi-currency support and detailed analytics are perfect for my needs.",
    rating: 5,
    category: "business"
  },
  {
    id: 5,
    name: "Sneha Reddy",
    role: "Student",
    company: "University",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    content: "As a student, budgeting was always stressful. KHATA makes it simple and actually fun! The spending insights help me manage my limited income effectively.",
    rating: 5,
    category: "student"
  },
  {
    id: 6,
    name: "Arjun Kumar",
    role: "Freelancer",
    company: "Independent",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    content: "Managing irregular freelance income was a nightmare. KHATA's budgeting tools and expense tracking help me plan for lean months and save during good ones.",
    rating: 5,
    category: "freelancer"
  },
  {
    id: 7,
    name: "Meera Iyer",
    role: "Doctor",
    company: "City Hospital",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    content: "With my busy schedule, I had no time for financial planning. KHATA's automated tracking and AI insights keep my finances organized without any effort.",
    rating: 5,
    category: "professional"
  },
  {
    id: 8,
    name: "Ravi Gupta",
    role: "Startup Founder",
    company: "Tech Startup",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
    content: "Running a startup means every rupee counts. KHATA helps me track both personal and business expenses with clarity I never had before. Absolutely essential!",
    rating: 5,
    category: "entrepreneur"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Loved by{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Financial Champions
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how organizations worldwide are transforming their payment operations with VietBuild-Pay
          </p>
        </div>

        {/* Scrolling Testimonials Container */}
        <div className="relative">
          {/* Gradient Overlays for fade effect */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-slate-50 via-blue-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-slate-50 via-blue-50 to-transparent z-10 pointer-events-none"></div>
          
          {/* First Row - Left to Right */}
          <div className="mb-8">
            <div className="flex animate-scroll-left space-x-6">
              {/* Duplicate testimonials for seamless loop */}
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <TestimonialCard key={`row1-${index}`} testimonial={testimonial} />
              ))}
            </div>
          </div>

          {/* Second Row - Right to Left */}
          <div className="mb-8">
            <div className="flex animate-scroll-right space-x-6">
              {/* Reverse and duplicate for opposite direction */}
              {[...testimonials.slice().reverse(), ...testimonials.slice().reverse()].map((testimonial, index) => (
                <TestimonialCard key={`row2-${index}`} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 60s linear infinite;
          width: fit-content;
        }

        .animate-scroll-right {
          animation: scroll-right 60s linear infinite;
          width: fit-content;
        }

        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'payroll':
        return 'from-green-500 to-emerald-500';
      case 'airdrop':
        return 'from-purple-500 to-violet-500';
      case 'dao':
        return 'from-orange-500 to-amber-500';
      default:
        return 'from-blue-500 to-indigo-500';
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'payroll':
        return { text: 'Payroll', emoji: '💼' };
      case 'airdrop':
        return { text: 'Airdrop', emoji: '🎯' };
      case 'dao':
        return { text: 'DAO', emoji: '🏛️' };
      default:
        return { text: 'Platform', emoji: '⚡' };
    }
  };

  const categoryInfo = getCategoryBadge(testimonial.category);

  return (
    <div className="flex-shrink-0 w-96 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:scale-105">
      {/* Category Badge */}
      <div className="flex justify-between items-start mb-4">
        <div className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getCategoryColor(testimonial.category)}`}>
          {categoryInfo.emoji} {categoryInfo.text}
        </div>
        <Quote className="text-gray-300" size={24} />
      </div>

      {/* Content */}
      <p className="text-gray-700 text-sm leading-relaxed mb-6 line-clamp-4">
        "{testimonial.content}"
      </p>

      {/* Rating */}
      <div className="flex items-center mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
        ))}
      </div>

      {/* User Info */}
      <div className="flex items-center">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h4>
          <p className="text-gray-600 text-xs">{testimonial.role}</p>
          <p className="text-gray-500 text-xs">{testimonial.company}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
