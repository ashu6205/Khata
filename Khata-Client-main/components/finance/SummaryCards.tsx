"use client";

import React from 'react';
import { DollarSign, FileText, CreditCard, MoreHorizontal } from 'lucide-react';
import { Transaction } from '../../app/authContext/transactionApi';

interface SummaryCardsProps {
  transactions: Transaction[];
  isLoading: boolean;
}

const SummaryCards = ({ transactions, isLoading }: SummaryCardsProps) => {
  // Calculate values from real transaction data
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const recentBalance = totalIncome - totalExpenses;
  const transactionCount = transactions.length;
  const totalSpending = totalExpenses;

  const cards = [
    {
      title: 'Recent account balance',
      value: recentBalance,
      icon: DollarSign,
      format: 'currency',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Total Transactions',
      value: transactionCount,
      icon: FileText,
      format: 'number',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      title: 'Your total spending',
      value: totalSpending,
      icon: CreditCard,
      format: 'currency',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    }
  ];

  const formatValue = (value: number, format: string) => {
    if (format === 'currency') {
      return `₹${value.toLocaleString('en-IN')}`;
    }
    return value.toString();
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 animate-pulse"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="h-6 bg-gray-200 rounded w-20"></div>
              <div className="h-3 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 ${card.bgColor} rounded-lg flex items-center justify-center`}>
              <card.icon className={`w-5 h-5 ${card.iconColor}`} />
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-gray-900">
              {formatValue(card.value, card.format)}
            </h3>
            <p className="text-xs text-gray-500">{card.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;