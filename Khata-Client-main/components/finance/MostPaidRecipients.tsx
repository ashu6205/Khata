"use client";

import React from 'react';
import { Users, Building, ShoppingCart, Car, Home } from 'lucide-react';

const MostPaidRecipients = () => {
  // Mock data for most paid recipients
  const topRecipients = [
    { id: 1, name: 'Amazon', category: 'Shopping', totalAmount: 485.70, transactions: 8, icon: ShoppingCart },
    { id: 2, name: 'Shell Gas Station', category: 'Transportation', totalAmount: 320.45, transactions: 12, icon: Car },
    { id: 3, name: 'Whole Foods', category: 'Groceries', totalAmount: 298.20, transactions: 6, icon: Building },
    { id: 4, name: 'City Electric Company', category: 'Utilities', totalAmount: 240.00, transactions: 2, icon: Home },
    { id: 5, name: 'Starbucks', category: 'Food & Dining', totalAmount: 156.75, transactions: 15, icon: Building }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-md font-semibold text-gray-900">Most Paid Recipients</h3>
        <div className="text-xs text-gray-500">This Month</div>
      </div>
      
      <div className="space-y-3">
        {topRecipients.map((recipient, index) => {
          const IconComponent = recipient.icon;
          return (
            <div key={recipient.id} className="flex items-center justify-between group hover:bg-gray-50 p-2 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                    <IconComponent className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {index + 1}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{recipient.name}</div>
                  <div className="text-xs text-gray-500">{recipient.transactions} transactions</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">
                  ₹{recipient.totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="text-xs text-gray-500">{recipient.category}</div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-100">
        <button className="w-full text-xs text-blue-600 hover:text-blue-700 font-medium">
          View All Recipients
        </button>
      </div>
    </div>
  );
};

export default MostPaidRecipients;