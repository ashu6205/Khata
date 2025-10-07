'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  ArrowUp, 
  Wallet, 
  Shield, 
  Zap, 
  Globe,
  DollarSign,
  Users,
  Clock,
  Lock
} from 'lucide-react'

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const services = [
    { name: "Expense Tracking", href: "#tracking", icon: DollarSign },
    { name: "Budget Management", href: "#budgeting", icon: Users },
    { name: "AI Insights", href: "#ai", icon: Clock },
    { name: "Financial Reports", href: "#reports", icon: Zap },
  ]

  const company = [
    { name: "About KHATA", href: "#about" },
    { name: "Blog & News", href: "#blog" },
    { name: "Careers", href: "#careers" },
    { name: "Contact Us", href: "#contact" },
  ]

  const resources = [
    { name: "Documentation", href: "#docs" },
    { name: "API Reference", href: "#api" },
    { name: "Support Center", href: "#support" },
    { name: "Tutorials", href: "#tutorials" },
  ]

  const legal = [
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Terms of Service", href: "#terms" },
    { name: "Security Policy", href: "#security" },
    { name: "Compliance", href: "#compliance" },
  ]

  return (
    <>
      {/* Sticky Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="sticky bottom-0 bg-white border-t border-gray-200 shadow-lg"
      >
        {/* Sky Blue Gradient Border */}
        <div className="h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-sky-600"></div>
        
        <div className="container mx-auto px-6 py-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
            {/* Brand Section */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-sky-400 to-blue-600 rounded-xl flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900">KHATA</span>
              </div>
              <p className="text-gray-600 mb-6 max-w-md leading-relaxed">
                The ultimate Web3 payment platform for streaming, distributing, and automating payments directly from your wallet across 14+ networks. Simple, secure, and scalable.
              </p>
              
              {/* Key Features */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-sky-500" />
                  <span className="text-sm text-gray-600">Bank-Grade Security</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-sky-500" />
                  <span className="text-sm text-gray-600">Instant Payments</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-sky-500" />
                  <span className="text-sm text-gray-600">14+ Networks</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-sky-500" />
                  <span className="text-sm text-gray-600">Non-Custodial</span>
                </div>
              </div>
            </motion.div>

            {/* Services */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Services</h3>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.name}>
                    <a
                      href={service.href}
                      className="flex items-center space-x-2 text-gray-600 hover:text-sky-600 transition-colors duration-300 group"
                    >
                      <service.icon className="w-4 h-4 group-hover:text-sky-500 transition-colors" />
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {service.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Resources */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Resources</h3>
              <ul className="space-y-3">
                {resources.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-gray-600 hover:text-sky-600 transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Company</h3>
              <ul className="space-y-3">
                {company.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-gray-600 hover:text-sky-600 transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Social Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex justify-center space-x-6 mb-8"
          >
            {[
              { Icon: Twitter, href: "#twitter", label: "Follow us on Twitter" },
              { Icon: Github, href: "#github", label: "View our GitHub" },
              { Icon: Linkedin, href: "#linkedin", label: "Connect on LinkedIn" },
              { Icon: Mail, href: "#contact", label: "Contact us" },
            ].map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all duration-300"
                aria-label={label}
                title={label}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </motion.div>

          {/* Legal Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center space-x-6 mb-8"
          >
            {legal.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm text-gray-500 hover:text-sky-600 transition-colors duration-300"
              >
                {item.name}
              </a>
            ))}
          </motion.div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center"
          >
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} KHATA. All rights reserved. Built with ❤️ for personal finance management.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center space-x-1">
                <Shield className="w-3 h-3" />
                <span>SOC2 Compliant</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Globe className="w-3 h-3" />
                <span>14+ Networks</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Zap className="w-3 h-3" />
                <span>24/7 Support</span>
              </span>
            </div>
          </motion.div>
        </div>
      </motion.footer>

      {/* Scroll to Top Button */}
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </>
  )
}
