"use client";

import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/finance/Sidebar';
import Navbar from '../../components/finance/Navbar';
import SummaryCards from '../../components/finance/SummaryCards';
import EarningReport from '../../components/finance/EarningReport';
import TransactionHistory from '../../components/finance/TransactionHistory';
import LiveCalendar from '../../components/finance/LiveCalendar';
import LastMonthTransactions from '../../components/finance/LastMonthTransactions';
import transactionApi, { Transaction } from '../../app/authContext/transactionApi';
import authApi, { User } from '../../app/authContext/authApi';

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const currentUser = authApi.getCurrentUser();
    const authenticated = authApi.isAuthenticated();
    setUser(currentUser);
    setIsAuthenticated(authenticated);
  }, []);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Load transactions from backend
  const loadTransactions = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      if (!isAuthenticated) {
        setTransactions([]);
        return;
      }

      const response = await transactionApi.getTransactions();
      
      if (response.success && response.data) {
        const transactionsData = response.data.transactions || [];
        setTransactions(transactionsData);
      } else {
        setTransactions([]);
        if (!response.success) {
          setError(response.message || 'Failed to load transactions');
        }
      }
    } catch (error: any) {
      console.error('Failed to load transactions:', error);
      setError(error.message || 'Failed to load transactions');
      setTransactions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Load transactions when component mounts or authentication changes
  useEffect(() => {
    if (isAuthenticated && user) {
      loadTransactions();
    }
  }, [isAuthenticated, user]);
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-16">
        {/* Navbar */}
        <Navbar />
        
        {/* Dashboard Content */}
        <div className="flex-1 p-4">
          <div className="max-w-6xl mx-auto">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}
            
            {/* Summary Cards */}
            <SummaryCards transactions={transactions} isLoading={isLoading} />
            
            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-4">
                <EarningReport transactions={transactions} isLoading={isLoading} />
                <TransactionHistory transactions={transactions} isLoading={isLoading} />
              </div>
              
              {/* Right Column */}
              <div className="space-y-4">
                <LiveCalendar />
                <LastMonthTransactions transactions={transactions} isLoading={isLoading} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;