"use client";

import React from 'react';
import { todoData } from '../../lib/mockData';

const TodoList = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">To Do List</h3>
      
      <div className="space-y-4">
        {todoData.map((item) => (
          <div key={item.id} className="flex items-center justify-between group hover:bg-gray-50 p-2 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                <span className="text-sm">{item.icon}</span>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">{item.task}</div>
                <div className="text-xs text-gray-500">{item.time}</div>
              </div>
            </div>
            <div className="text-sm font-semibold text-gray-900">
              ₹{item.amount.toLocaleString('en-IN')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;