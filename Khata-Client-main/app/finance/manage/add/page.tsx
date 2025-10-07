import React from 'react';
import Sidebar from '../../../../components/finance/Sidebar';
import Navbar from '../../../../components/finance/Navbar';
import AddTransactionForm from '../../../../components/finance/AddTransactionForm';

export default function AddTransactionPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-16">
        <Navbar />
        <div className="flex-1 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Add Transaction</h1>
              <p className="text-gray-600">Create a new transaction entry</p>
            </div>
            <AddTransactionForm />
          </div>
        </div>
      </div>
    </div>
  );
}