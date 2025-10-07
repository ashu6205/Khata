"use client";

import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ChevronDown } from 'lucide-react';
import { Transaction } from '../../app/authContext/transactionApi';

interface EarningReportProps {
  transactions: Transaction[];
  isLoading: boolean;
}

const EarningReport = ({ transactions, isLoading }: EarningReportProps) => {
  // Process transactions into monthly data
  const monthlyData = useMemo(() => {
    const monthMap = new Map();
    
    transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        const date = new Date(transaction.date);
        const monthKey = date.toLocaleString('default', { month: 'short' });
        
        if (monthMap.has(monthKey)) {
          monthMap.set(monthKey, monthMap.get(monthKey) + transaction.amount);
        } else {
          monthMap.set(monthKey, transaction.amount);
        }
      }
    });

    // Create array for all months of the year
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return months.map(month => ({
      month,
      earning: monthMap.get(month) || 0
    }));
  }, [transactions]);

  // Calculate total earnings and growth
  const totalEarnings = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm text-gray-600">{`Month: ${label}`}</p>
          <p className="text-sm font-semibold text-gray-900">
            {`Earning: ₹${payload[0].value.toLocaleString('en-IN')}`}
          </p>
        </div>
      );
    }
    return null;
  };

  // Get current month for highlighting
  const currentMonth = new Date().toLocaleString('default', { month: 'short' });

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-5 bg-gray-200 rounded w-32"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="mb-3">
          <div className="h-8 bg-gray-200 rounded w-24 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>
        <div className="h-60 bg-gray-100 rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-md font-semibold text-gray-900">Earning Report</h3>
        <div className="flex items-center space-x-1 text-xs text-gray-500 cursor-pointer hover:text-gray-700 transition-colors">
          <span>Monthly</span>
          <ChevronDown className="w-3 h-3" />
        </div>
      </div>
      
      <div className="mb-3">
        <div className="text-2xl font-bold text-gray-900">
          ₹{totalEarnings.toLocaleString('en-IN')}
        </div>
        <div className="text-xs text-green-600 font-medium">Total Income</div>
      </div>

      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={monthlyData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barCategoryGap="20%"
          >
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="earning" 
              radius={[4, 4, 0, 0]}
              className="hover:opacity-80 transition-opacity"
            >
              {monthlyData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.month === currentMonth ? '#000000' : '#374151'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EarningReport;