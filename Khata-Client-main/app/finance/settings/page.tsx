"use client";

import React, { useState } from 'react';
import Sidebar from '../../../components/finance/Sidebar';
import Navbar from '../../../components/finance/Navbar';

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com'
  });
  
  const [preferences, setPreferences] = useState({
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY'
  });
  
  const [notifications, setNotifications] = useState({
    emailTransactions: true,
    monthlyReports: true,
    budgetAlerts: false
  });
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-16">
        <Navbar />
        <div className="flex-1 p-4">
          <div className="max-w-3xl mx-auto">
            <div className="mb-4">
              <h1 className="text-xl font-bold text-gray-900">Settings</h1>
              <p className="text-sm text-gray-600">Manage your account and application preferences</p>
            </div>
            
            <div className="space-y-4">
              {/* Profile Settings */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                <h2 className="text-md font-semibold text-gray-900 mb-3">Profile Settings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input 
                      type="text" 
                      value={profile.name} 
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input 
                      type="email" 
                      value={profile.email} 
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                    />
                  </div>
                </div>
              </div>

              {/* Currency Settings */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                <h2 className="text-md font-semibold text-gray-900 mb-3">Currency & Format</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Default Currency</label>
                    <select 
                      value={preferences.currency}
                      onChange={(e) => setPreferences({...preferences, currency: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="INR">INR (₹)</option>
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                    <select 
                      value={preferences.dateFormat}
                      onChange={(e) => setPreferences({...preferences, dateFormat: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Notification Settings */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                <h2 className="text-md font-semibold text-gray-900 mb-3">Notifications</h2>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300" 
                      checked={notifications.emailTransactions}
                      onChange={(e) => setNotifications({...notifications, emailTransactions: e.target.checked})}
                    />
                    <span className="ml-2 text-sm text-gray-700">Email notifications for new transactions</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300" 
                      checked={notifications.monthlyReports}
                      onChange={(e) => setNotifications({...notifications, monthlyReports: e.target.checked})}
                    />
                    <span className="ml-2 text-sm text-gray-700">Monthly spending reports</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300" 
                      checked={notifications.budgetAlerts}
                      onChange={(e) => setNotifications({...notifications, budgetAlerts: e.target.checked})}
                    />
                    <span className="ml-2 text-sm text-gray-700">Budget limit alerts</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}