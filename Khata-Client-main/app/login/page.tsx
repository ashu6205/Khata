"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import { useAuth } from '../authContext/routesProtector';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login, register } = useAuth();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isLogin) {
        // Login
        if (!formData.email || !formData.password) {
          setError('Please fill in all fields');
          return;
        }
        await login(formData.email, formData.password);
      } else {
        // Register
        if (!formData.name || !formData.email || !formData.password) {
          setError('Please fill in all fields');
          return;
        }
        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters long');
          return;
        }
        await register(formData.name, formData.email, formData.password);
      }
      
      // Check for redirect URL after successful login
      const redirectUrl = sessionStorage.getItem('redirectAfterLogin');
      if (redirectUrl) {
        sessionStorage.removeItem('redirectAfterLogin');
        router.push(redirectUrl);
      }
    } catch (error: any) {
      setError(error.message || 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '' });
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        {/* Floating shapes */}
        <div className="absolute top-20 left-20 w-24 h-24 bg-gray-300 rounded-lg transform rotate-12 opacity-30"></div>
        <div className="absolute top-40 right-32 w-16 h-16 bg-gray-400 rounded-full opacity-20"></div>
        <div className="absolute bottom-32 left-16 w-20 h-20 bg-gray-300 rounded-lg transform -rotate-12 opacity-25"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-gray-400 rounded-lg transform rotate-45 opacity-15"></div>
        
        {/* Polka dot patterns */}
        <div className="absolute top-60 left-40 w-40 h-40 bg-yellow-200 rounded-lg flex flex-wrap p-2 opacity-40">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-6 h-6 bg-gray-600 rounded-full m-1"></div>
          ))}
        </div>
        <div className="absolute bottom-40 right-40 w-40 h-40 bg-yellow-200 rounded-lg flex flex-wrap p-2 opacity-40">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-6 h-6 bg-gray-600 rounded-full m-1"></div>
          ))}
        </div>

        {/* Curved lines */}
        <svg className="absolute top-10 right-10 w-32 h-32 opacity-20" viewBox="0 0 100 100">
          <path d="M10,50 Q50,10 90,50" stroke="#6b7280" strokeWidth="2" fill="none" />
          <path d="M10,60 Q50,20 90,60" stroke="#6b7280" strokeWidth="2" fill="none" />
        </svg>
        <svg className="absolute bottom-10 left-10 w-32 h-32 opacity-20" viewBox="0 0 100 100">
          <path d="M10,50 Q50,90 90,50" stroke="#6b7280" strokeWidth="2" fill="none" />
          <path d="M10,40 Q50,80 90,40" stroke="#6b7280" strokeWidth="2" fill="none" />
        </svg>

        {/* Sitting person illustration placeholder */}
        <div className="absolute top-1/2 right-16 transform -translate-y-1/2 w-48 h-48 bg-gray-300 rounded-full opacity-15 flex items-center justify-center">
          <div className="w-24 h-24 bg-gray-600 rounded-full opacity-60"></div>
        </div>
      </div>

      {/* Header */}
      <div className="absolute top-8 left-8 z-20">
        <h1 className="text-2xl font-bold text-black">Khata</h1>
      </div>

      {/* Main login/signup card */}
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm mx-4">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-sm text-gray-600">
            {isLogin 
              ? 'Hey, Enter your details to get sign in to your account' 
              : 'Hey, Enter your details to create your new account'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {!isLogin && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Full Name"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors"
                required={!isLogin}
                disabled={isLoading}
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter Email / Phone No"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors"
              required
              disabled={isLoading}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors"
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              disabled={isLoading}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {isLogin && (
            <div className="text-right">
              <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">
                Having trouble to sign in?
              </a>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {isLogin ? 'Signing In...' : 'Creating Account...'}
              </>
            ) : (
              isLogin ? 'Sign In' : 'Sign Up'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={toggleForm}
              className="text-black font-medium hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <p className="text-sm text-gray-500">
          Copyright @khata 2025 | Privacy Policy
        </p>
      </div>
    </div>
  );
}
