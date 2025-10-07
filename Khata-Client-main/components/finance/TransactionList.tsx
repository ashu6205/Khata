"use client";

import React, { useState } from 'react';
import { Search, Filter, Download, ChevronLeft, ChevronRight, Edit2, Trash2, MoreVertical } from 'lucide-react';
import transactionApi, { Transaction } from '@/app/authContext/transactionApi';

interface TransactionListProps {
  transactions?: Transaction[]; // Make optional
  dateFilter?: {
    type: 'month' | 'year' | 'range';
    value: string;
    startDate?: string;
    endDate?: string;
  };
  onTransactionUpdate?: () => void; // Callback to refresh transaction list
  onEditTransaction?: (transaction: Transaction) => void; // Callback to open edit modal
}

const TransactionList: React.FC<TransactionListProps> = ({ 
  transactions = [], // Provide default empty array 
  dateFilter, 
  onTransactionUpdate,
  onEditTransaction 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const itemsPerPage = 10;

  // Ensure transactions is always an array - robust type checking
  const safeTransactions = Array.isArray(transactions) ? transactions : [];

  // Filter transactions
  const filteredTransactions = safeTransactions.filter(transaction => {
    const matchesSearch = (transaction.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.description?.toLowerCase().includes(searchTerm.toLowerCase())) ?? false;
    const matchesFilter = filterType === 'all' || transaction.type === filterType;
    
    // Date filtering
    let matchesDate = true;
    if (dateFilter) {
      const transactionDate = new Date(transaction.date);
      
      if (dateFilter.type === 'month') {
        const [year, month] = dateFilter.value.split('-');
        const transactionYear = transactionDate.getFullYear().toString();
        const transactionMonth = (transactionDate.getMonth() + 1).toString().padStart(2, '0');
        matchesDate = transactionYear === year && transactionMonth === month;
      } else if (dateFilter.type === 'year') {
        const transactionYear = transactionDate.getFullYear().toString();
        matchesDate = transactionYear === dateFilter.value;
      } else if (dateFilter.type === 'range' && dateFilter.startDate && dateFilter.endDate) {
        const startDate = new Date(dateFilter.startDate);
        const endDate = new Date(dateFilter.endDate);
        matchesDate = transactionDate >= startDate && transactionDate <= endDate;
      }
    }
    
    return matchesSearch && matchesFilter && matchesDate;
  });

  // Handle delete transaction
  const handleDeleteTransaction = async (transactionId: string) => {
    if (!window.confirm('Are you sure you want to delete this transaction?')) {
      return;
    }

    setIsDeleting(transactionId);
    try {
      await transactionApi.deleteTransaction(transactionId);
      if (onTransactionUpdate) {
        onTransactionUpdate();
      }
    } catch (error: any) {
      console.error('Failed to delete transaction:', error);
      alert('Failed to delete transaction: ' + error.message);
    } finally {
      setIsDeleting(null);
    }
  };

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      {/* Header with filters */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Transaction table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentTransactions.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="text-lg">No transactions found</div>
                    <div className="text-sm">
                      {filteredTransactions.length === 0 && transactions.length > 0
                        ? "Try adjusting your search or filter criteria"
                        : "Start by adding your first transaction"}
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              currentTransactions.map((transaction) => (
                <tr key={transaction._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div>
                    <div className="font-medium">{transaction.title}</div>
                    {transaction.description && (
                      <div className="text-gray-500 text-xs">{transaction.description}</div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    transaction.type === 'income' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {transaction.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  <span className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                    {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2">
                    {onEditTransaction && (
                      <button
                        onClick={() => onEditTransaction(transaction)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        title="Edit transaction"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => transaction._id && handleDeleteTransaction(transaction._id)}
                      disabled={isDeleting === transaction._id}
                      className="text-red-600 hover:text-red-800 transition-colors disabled:opacity-50"
                      title="Delete transaction"
                    >
                      {isDeleting === transaction._id ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing {startIndex + 1} to {Math.min(endIndex, filteredTransactions.length)} of {filteredTransactions.length} results
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <span className="px-3 py-2 text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionList;