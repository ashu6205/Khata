import React from 'react';
import Sidebar from '../../../../components/finance/Sidebar';
import Navbar from '../../../../components/finance/Navbar';
import UploadManager from '../../../../components/finance/UploadManager';

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-16">
        <Navbar />
        <div className="flex-1 p-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Upload & Import</h1>
              <p className="text-gray-600">Upload receipts and import transaction data</p>
            </div>
            <UploadManager />
          </div>
        </div>
      </div>
    </div>
  );
}