"use client";

import React, { useMemo } from 'react';
import { TrendingDown, TrendingUp, Calendar } from 'lucide-react';
import { Transaction } from '../../app/authContext/transactionApi';

interface LastMonthTransactionsProps {
  transactions: Transaction[];
  isLoading: boolean;
}

const LastMonthTransactions = ({ transactions, isLoading }: LastMonthTransactionsProps) => {
  // Filter transactions from last month
  const lastMonthTransactions = useMemo(() => {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    return transactions
      .filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= lastMonth && transactionDate < currentMonth;
      })
      .slice(0, 5); // Show only 5 recent transactions
  }, [transactions]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getLastMonthName = () => {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    return lastMonth.toLocaleDateString('en-IN', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 animate-pulse">
        <div className="flex items-center justify-between mb-3">
          <div className="h-5 bg-gray-200 rounded w-40"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                <div>
                  <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-md font-semibold text-gray-900">Last Month Transactions</h3>
        <div className="flex items-center text-xs text-gray-500">
          <Calendar className="w-3 h-3 mr-1" />
          <span>{getLastMonthName()}</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {lastMonthTransactions.length === 0 ? (
          <div className="text-center py-6 text-gray-500 text-sm">
            No transactions found for last month
          </div>
        ) : (
          lastMonthTransactions.map((transaction) => (
            <div key={transaction._id || Math.random()} className="flex items-center justify-between group hover:bg-gray-50 p-2 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors ${
                  transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {transaction.type === 'income' ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  )}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{transaction.description}</div>
                  <div className="text-xs text-gray-500">{formatDate(transaction.date)}</div>
                </div>
              </div>
              <div className={`text-sm font-semibold ${
                transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN')}
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-100">
        <button className="w-full text-xs text-blue-600 hover:text-blue-700 font-medium">
          View All Transactions
        </button>
      </div>
    </div>
  );
};

export default LastMonthTransactions;