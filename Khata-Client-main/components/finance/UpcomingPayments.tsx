"use client";

import React from 'react';
import { upcomingPayments } from '../../lib/mockData';

const UpcomingPayments = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900">Upcoming Payment</h3>
        <div className="text-xs text-gray-500">13 Mar, 2025</div>
      </div>
      
      <div className="space-y-4">
        {upcomingPayments.map((payment) => (
          <div key={payment.id} className="flex items-center justify-between group hover:bg-gray-50 p-2 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                <span className="text-sm">{payment.icon}</span>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">{payment.title}</div>
                <div className="text-xs text-orange-500 font-medium">{payment.status}</div>
              </div>
            </div>
            <div className="text-sm font-semibold text-gray-900">
              ₹{payment.amount.toLocaleString('en-IN')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingPayments;