"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BarChart3, 
  FileText, 
  HelpCircle, 
  Settings,
  MessageCircle
} from 'lucide-react';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { icon: BarChart3, label: 'Analytics', href: '/finance', active: pathname === '/finance' },
    { icon: FileText, label: 'Transactions', href: '/finance/manage/transactions', active: pathname === '/finance/manage/transactions' },
    { icon: MessageCircle, label: 'AI Assistant', href: '/finance/ai-assistant', active: pathname === '/finance/ai-assistant' },
    { icon: Settings, label: 'Settings', href: '/finance/settings', active: pathname === '/finance/settings' },
    { icon: HelpCircle, label: 'Help', href: '/finance/help', active: pathname === '/finance/help' }
  ];

  return (
    <div 
      className={`${isExpanded ? 'w-64' : 'w-16'} bg-white h-screen fixed left-0 top-0 shadow-lg z-40 border-r border-gray-100 transition-all duration-300 ease-in-out`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Logo */}
      <div className="p-4">
        <div className="w-11 h-8 bg-black rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">Khata</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-8">
        {menuItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center px-4 py-3 mx-2 rounded-lg transition-colors duration-200 group relative ${
                item.active
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <IconComponent className="w-5 h-5 flex-shrink-0" />
              <span className={`ml-3 font-medium transition-opacity duration-300 ${
                isExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
              }`}>
                {item.label}
              </span>
              
              {/* Tooltip for collapsed state */}
              {!isExpanded && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;