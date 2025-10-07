import React from 'react';
import Sidebar from '../../../components/finance/Sidebar';
import Navbar from '../../../components/finance/Navbar';
import { HelpCircle, FileText, CreditCard, Upload, Settings } from 'lucide-react';

export default function HelpPage() {
  const helpTopics = [
    {
      icon: CreditCard,
      title: 'Adding Transactions',
      description: 'Learn how to manually add income and expense transactions',
      content: 'Navigate to Add Transaction, fill in the amount, select category and type, add description, and save.'
    },
    {
      icon: FileText,
      title: 'Managing Transaction List',
      description: 'Filter, search, and export your transaction history',
      content: 'Use the search bar to find specific transactions, apply filters by type, and export data as needed.'
    },
    {
      icon: Upload,
      title: 'Bulk Import & Receipts',
      description: 'Upload CSV files and receipt images for easy data entry',
      content: 'Download the CSV template, fill with your data, and upload. Also upload receipt images for record keeping.'
    },
    {
      icon: Settings,
      title: 'Settings & Preferences',
      description: 'Customize your experience with currency, date formats, and notifications',
      content: 'Access Settings to configure your profile, default currency, date format, and notification preferences.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-16">
        <Navbar />
        <div className="flex-1 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Help & Support</h1>
              <p className="text-gray-600">Get help with using the expense management system</p>
            </div>
            
            <div className="space-y-6">
              {/* Quick Start */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Start Guide</h2>
                <div className="space-y-3 text-sm text-gray-700">
                  <p>1. <strong>Add a Transaction:</strong> Click "Add Transaction" to manually enter income or expenses</p>
                  <p>2. <strong>View Transactions:</strong> Use "Transaction List" to see all your financial activity</p>
                  <p>3. <strong>Import Data:</strong> Upload CSV files or receipts using the "Upload" section</p>
                  <p>4. <strong>Analyze:</strong> Review your spending patterns in the Analytics dashboard</p>
                </div>
              </div>

              {/* Help Topics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {helpTopics.map((topic, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <topic.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{topic.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{topic.description}</p>
                        <p className="text-sm text-gray-700">{topic.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* FAQ */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900">What file formats are supported for import?</h3>
                    <p className="text-sm text-gray-600 mt-1">CSV, XLSX, and XLS files are supported for transaction import. For receipts, you can upload JPG, PNG, and PDF files.</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">How do I categorize my transactions?</h3>
                    <p className="text-sm text-gray-600 mt-1">When adding transactions, select from predefined categories like Food & Dining, Transportation, Entertainment, etc., or choose "Other" for custom categories.</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Can I export my transaction data?</h3>
                    <p className="text-sm text-gray-600 mt-1">Yes, you can export your transaction list as a CSV file using the Export button in the Transaction List page.</p>
                  </div>
                </div>
              </div>

              {/* Contact Support */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <HelpCircle className="w-6 h-6 text-blue-600" />
                  <h2 className="text-lg font-semibold text-blue-900">Need More Help?</h2>
                </div>
                <p className="text-blue-700 mb-4">
                  If you can't find the answer to your question, don't hesitate to reach out to our support team.
                </p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}