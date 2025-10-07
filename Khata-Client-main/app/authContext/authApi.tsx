'use client';

import { API_CONFIG, getApiUrl, getAuthHeaders, handleApiError, ApiResponse } from '@/lib/network';

// Auth interfaces
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
}

// Auth API functions
export const authApi = {
  // Register new user
  register: async (data: RegisterRequest): Promise<ApiResponse<AuthResponse>> => {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.REGISTER), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Registration failed');
      }

      // Store token and user data
      if (result.success && result.data.token) {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem('token', result.data.token);
          window.localStorage.setItem('user', JSON.stringify(result.data.user));
        }
      }

      return result;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Login user
  login: async (data: LoginRequest): Promise<ApiResponse<AuthResponse>> => {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.LOGIN), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Login failed');
      }

      // Store token and user data
      if (result.success && result.data.token) {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem('token', result.data.token);
          window.localStorage.setItem('user', JSON.stringify(result.data.user));
        }
      }

      return result;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get user profile
  getProfile: async (): Promise<ApiResponse<User>> => {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.PROFILE), {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to get profile');
      }

      return result;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Logout user
  logout: (): void => {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('user');
    }
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    if (typeof window === 'undefined' || !window.localStorage) return false;
    const token = window.localStorage.getItem('token');
    return !!token;
  },

  // Get current user from localStorage
  getCurrentUser: (): User | null => {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    const userStr = window.localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  },

  // Get auth token
  getToken: (): string | null => {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    return window.localStorage.getItem('token');
  },
};

export default authApi;
