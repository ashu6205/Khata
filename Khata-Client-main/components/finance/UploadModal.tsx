"use client";

import React, { useState } from 'react';
import { X, Upload, Download, FileText, Image, AlertCircle } from 'lucide-react';
import transactionApi, { CreateTransactionRequest } from '@/app/authContext/transactionApi';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload?: () => void; // Callback to refresh transaction list
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [activeTab, setActiveTab] = useState<'csv' | 'receipts'>('csv');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      setUploadedFiles(prev => [...prev, ...files]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...files]);
    }
  };

  const downloadTemplate = () => {
    const csvContent = "title,amount,type,category,description,date,paymentmethod,recipient\n" +
      "Grocery Shopping,85.50,expense,Food & Dining,Weekly groceries,2024-01-15,Credit Card,Supermarket\n" +
      "Salary,3000.00,income,Business,Monthly salary,2024-01-14,Bank Transfer,Company\n" +
      "Gas Station,45.00,expense,Transportation,Fuel for car,2024-01-13,Debit Card,Gas Station";
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'khata_transaction_template.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const processFiles = async () => {
    const csvFiles = uploadedFiles.filter(file => 
      file.type === 'text/csv' || file.name.endsWith('.csv')
    );
    
    if (csvFiles.length === 0) {
      setError('Please upload at least one CSV file to process transactions.');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const allTransactions: CreateTransactionRequest[] = [];
      
      for (const file of csvFiles) {
        const text = await file.text();
        const transactions = transactionApi.parseCsvToTransactions(text);
        allTransactions.push(...transactions);
      }
      
      if (allTransactions.length > 0) {
        // Upload to backend
        await transactionApi.bulkCreateTransactions(allTransactions);
        
        // Clear files and close modal
        setUploadedFiles([]);
        onClose();
        
        // Refresh transaction list
        if (onUpload) {
          onUpload();
        }
        
        alert(`Successfully imported ${allTransactions.length} transactions!`);
      } else {
        setError('No valid transactions found in the CSV file(s).');
      }
    } catch (error: any) {
      console.error('Error processing CSV files:', error);
      setError(error.message || 'Error processing CSV files. Please check the file format.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Upload & Import</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-4">
          <button
            onClick={() => setActiveTab('csv')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'csv'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Bulk Import CSV
          </button>
          <button
            onClick={() => setActiveTab('receipts')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'receipts'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Upload Receipts
          </button>
        </div>

        {/* CSV Tab */}
        {activeTab === 'csv' && (
          <div className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center space-x-2">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Download template, fill with your data, and upload CSV file.
              </p>
              <button
                onClick={downloadTemplate}
                className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                <Download className="w-4 h-4" />
                <span>Template</span>
              </button>
            </div>

            <div
              className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                multiple
                disabled={isProcessing}
              />
              
              <FileText className="mx-auto h-8 w-8 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Upload CSV files</h3>
              <p className="mt-1 text-xs text-gray-500">
                Drag and drop or click to select CSV, XLSX, XLS files
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <h4 className="text-sm font-medium text-blue-900 mb-1">CSV Format:</h4>
              <p className="text-xs text-blue-700">
                Required columns: title, amount, type, category, date<br />
                Optional columns: description, paymentmethod, recipient
              </p>
            </div>
          </div>
        )}

        {/* Receipts Tab */}
        {activeTab === 'receipts' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Upload receipt images or PDF files for record keeping.
            </p>

            <div
              className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                multiple
              />
              
              <Image className="mx-auto h-8 w-8 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Upload receipts</h3>
              <p className="mt-1 text-xs text-gray-500">
                Drag and drop or click to select JPG, PNG, PDF files
              </p>
            </div>
          </div>
        )}

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="mt-4 space-y-2">
            <h3 className="text-sm font-medium text-gray-900">Uploaded Files</h3>
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  {file.type.includes('image') ? (
                    <Image className="w-4 h-4 text-blue-500" />
                  ) : (
                    <FileText className="w-4 h-4 text-green-500" />
                  )}
                  <span className="text-sm text-gray-900">{file.name}</span>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700 text-xs"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4 mt-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            disabled={isProcessing}
          >
            Cancel
          </button>
          <button
            onClick={processFiles}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            disabled={uploadedFiles.length === 0 || isProcessing}
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                <span>Process Files</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;