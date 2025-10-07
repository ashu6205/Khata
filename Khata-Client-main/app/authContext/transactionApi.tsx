'use client';

import { API_CONFIG, getApiUrl, getAuthHeaders, handleApiError, ApiResponse } from '@/lib/network';

// Transaction interfaces
export interface Transaction {
  _id?: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description?: string;
  date: string;
  paymentMethod?: string;
  recipient?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTransactionRequest {
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description?: string;
  date: string;
  paymentMethod?: string;
  recipient?: string;
}

export interface UpdateTransactionRequest extends Partial<CreateTransactionRequest> {
  id: string;
}

export interface TransactionFilters {
  startDate?: string;
  endDate?: string;
  type?: 'income' | 'expense';
  category?: string;
  limit?: number;
  page?: number;
}

export interface TransactionStatistics {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  categoryBreakdown: {
    category: string;
    amount: number;
    count: number;
  }[];
  recentTransactions: Transaction[];
}

export interface PaginatedTransactionResponse {
  transactions: Transaction[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalTransactions: number;
    limit: number;
  };
}

// Transaction API functions
export const transactionApi = {
  // Get all transactions with optional filters
  getTransactions: async (filters?: TransactionFilters): Promise<ApiResponse<PaginatedTransactionResponse>> => {
    try {
      let url = getApiUrl(API_CONFIG.ENDPOINTS.TRANSACTIONS);
      
      if (filters) {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(key, value.toString());
          }
        });
        if (params.toString()) {
          url += `?${params.toString()}`;
        }
      }

      console.log('Making request to:', url);
      console.log('With headers:', getAuthHeaders());

      const response = await fetch(url, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      const result = await response.json();
      console.log('Raw API response:', response.status, result);
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication required. Please log in again.');
        }
        throw new Error(result.message || 'Failed to fetch transactions');
      }

      return result;
    } catch (error) {
      console.error('Transaction API error:', error);
      throw new Error(handleApiError(error));
    }
  },

  // Create a new transaction
  createTransaction: async (data: CreateTransactionRequest): Promise<ApiResponse<Transaction>> => {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.TRANSACTIONS), {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to create transaction');
      }

      return result;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Update a transaction
  updateTransaction: async (id: string, data: Partial<CreateTransactionRequest>): Promise<ApiResponse<Transaction>> => {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.TRANSACTION_BY_ID(id)), {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to update transaction');
      }

      return result;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Delete a transaction
  deleteTransaction: async (id: string): Promise<ApiResponse<void>> => {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.TRANSACTION_BY_ID(id)), {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to delete transaction');
      }

      return result;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Bulk create transactions (for CSV upload)
  bulkCreateTransactions: async (transactions: CreateTransactionRequest[]): Promise<ApiResponse<Transaction[]>> => {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.BULK_TRANSACTIONS), {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ transactions }),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to bulk create transactions');
      }

      return result;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get transaction statistics
  getStatistics: async (): Promise<ApiResponse<TransactionStatistics>> => {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.TRANSACTION_STATISTICS), {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch statistics');
      }

      return result;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Helper function to parse CSV data into transactions
  parseCsvToTransactions: (csvData: string): CreateTransactionRequest[] => {
    const lines = csvData.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    
    const transactions: CreateTransactionRequest[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      
      if (values.length >= 4) {
        const transaction: CreateTransactionRequest = {
          title: values[headers.indexOf('title')] || values[0],
          amount: parseFloat(values[headers.indexOf('amount')] || values[1]) || 0,
          type: (values[headers.indexOf('type')] || values[2])?.toLowerCase() === 'income' ? 'income' : 'expense',
          category: values[headers.indexOf('category')] || values[3] || 'Other',
          description: values[headers.indexOf('description')] || values[4] || '',
          date: values[headers.indexOf('date')] || values[5] || new Date().toISOString().split('T')[0],
          paymentMethod: values[headers.indexOf('paymentmethod')] || values[6] || 'Cash',
          recipient: values[headers.indexOf('recipient')] || values[7] || '',
        };
        
        transactions.push(transaction);
      }
    }
    
    return transactions;
  },
};

export default transactionApi;