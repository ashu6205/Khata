"use client";

import React from 'react';

const FormationStatus = () => {
  const progress = 75; // 75% progress

  return (
    <div className="bg-black rounded-xl p-6 text-white mb-6">
      <h3 className="text-lg font-semibold mb-4">Formation Status</h3>
      
      <div className="mb-4">
        <div className="text-sm text-gray-300 mb-2">In Progress</div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-white rounded-full h-2 transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-6">
        <div className="text-sm text-gray-300 mb-1">Estimated Processing</div>
        <div className="text-sm text-gray-400">4-5 business days</div>
      </div>

      <button className="w-full bg-white text-black rounded-lg py-3 font-medium hover:bg-gray-100 transition-colors">
        View All
      </button>
    </div>
  );
};

export default FormationStatus;