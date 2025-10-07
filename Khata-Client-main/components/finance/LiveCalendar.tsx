"use client";

import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

const LiveCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Update the date every second to ensure it's always current
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return {
      day: date.getDate(),
      dayName: date.toLocaleDateString('en-US', { weekday: 'long' }),
      month: date.toLocaleDateString('en-US', { month: 'long' }),
      year: date.getFullYear(),
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      })
    };
  };

  const dateInfo = formatDate(currentDate);

  // Generate calendar grid for current month
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();
  const today = currentDate.getDate();

  return (
    <div className="bg-black rounded-xl p-6 text-white mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <CalendarIcon className="w-5 h-5 mr-2" />
          Live Calendar
        </h3>
      </div>

      {/* Current Date Display - All in one row */}
      <div className="flex items-center justify-between p-4  rounded-lg">
        <div className="text-3xl font-bold text-white">
          {dateInfo.day}
        </div>
        <div className="flex items-center space-x-4 text-right">
          <div className="text-sm font-medium text-gray-300">
            {dateInfo.dayName}
          </div>
          
          <div className="text-xs text-blue-400">
            {dateInfo.time}
          </div>
        </div>
      </div>

      {/* Mini Calendar */}
      <div className="mb-4">
        <div className="text-center text-sm font-medium mb-2 text-gray-300">
          {dateInfo.month} {dateInfo.year}
        </div>
        
        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
            <div key={day} className="text-xs text-center text-gray-400 p-1">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`text-xs text-center p-1 rounded ${
                day === today
                  ? 'bg-white text-black font-bold'
                  : day
                    ? 'text-gray-300 hover:bg-gray-800'
                    : 'text-transparent'
              }`}
            >
              {day || ''}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveCalendar;