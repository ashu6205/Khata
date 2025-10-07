"use client";

import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../../../components/finance/Sidebar';
import Navbar from '../../../components/finance/Navbar';
import { Send, Bot, User, Loader2, AlertCircle } from 'lucide-react';
import { aiService, AIMessage } from '../../../lib/aiService';
import { transactionApi, Transaction } from '../../authContext/transactionApi';
import useAuth from '../../authContext/authApi';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isError?: boolean;
}

const AIAssistantPage = () => {
  const user = useAuth.getCurrentUser();
  const isAuthenticated = useAuth.isAuthenticated();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI Financial Assistant powered by Groq AI. I can analyze your actual transaction data and provide personalized financial advice. I can help with budgeting, expense analysis, saving strategies, and financial planning based on your real spending patterns. How can I help you today?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(true);
  const [conversationHistory, setConversationHistory] = useState<AIMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load user transactions
  useEffect(() => {
    const loadTransactions = async () => {
      if (!isAuthenticated) {
        setIsLoadingTransactions(false);
        return;
      }

      try {
        const response = await transactionApi.getTransactions(); // Get user transactions
        if (response.success && response.data) {
          setTransactions(response.data.transactions || []);
        }
      } catch (error) {
        console.error('Failed to load transactions:', error);
      } finally {
        setIsLoadingTransactions(false);
      }
    };

    loadTransactions();
  }, [isAuthenticated]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Update conversation history
    const newConversationHistory = [
      ...conversationHistory,
      { role: 'user' as const, content: inputMessage }
    ];

    try {
      // Get AI response
      const response = await aiService.getChatResponse(
        inputMessage,
        conversationHistory,
        transactions
      );

      let aiMessageContent: string;
      let isError = false;

      if (response.success && response.message) {
        aiMessageContent = response.message;
        // Update conversation history with AI response
        setConversationHistory([
          ...newConversationHistory,
          { role: 'assistant' as const, content: response.message }
        ]);
      } else {
        aiMessageContent = response.error || 'Sorry, I encountered an error. Please try again.';
        isError = true;
        // Still update conversation history for context
        setConversationHistory(newConversationHistory);
      }

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: aiMessageContent,
        sender: 'ai',
        timestamp: new Date(),
        isError
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Use fallback response
      const fallbackResponse = aiService.getFallbackResponse(inputMessage);
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: fallbackResponse,
        sender: 'ai',
        timestamp: new Date(),
        isError: true
      };

      setMessages(prev => [...prev, aiResponse]);
      setConversationHistory(newConversationHistory);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col ml-16">
        <Navbar />
        
        <div className="flex-1 p-4">
          <div className="max-w-4xl mx-auto h-full flex flex-col">
            {/* Header */}
            <div className="bg-white rounded-t-lg shadow-sm border border-gray-100 p-4 border-b-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold text-gray-900">AI Financial Assistant</h1>
                    <p className="text-sm text-gray-500">Powered by Groq AI - Personalized financial insights</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">
                    {isLoadingTransactions ? (
                      'Loading transactions...'
                    ) : (
                      `${transactions.length} transactions loaded`
                    )}
                  </div>
                  <div className="text-xs text-green-600 font-medium">
                    Context-aware AI
                  </div>
                </div>
              </div>
            </div>

            {/* API Key Warning */}
            {!process.env.NEXT_PUBLIC_GROQ_API_KEY && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-none p-3 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-yellow-600" />
                <span className="text-sm text-yellow-800">
                  Add your Groq API key to .env.local for full AI functionality
                </span>
              </div>
            )}

            {/* Messages Container */}
            <div className="flex-1 bg-white border border-gray-100 border-t-0 border-b-0 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`flex items-start space-x-3 max-w-[80%] ${
                      message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === 'user' 
                          ? 'bg-blue-500' 
                          : message.isError 
                            ? 'bg-red-500' 
                            : 'bg-gray-500'
                      }`}
                    >
                      {message.sender === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div
                      className={`rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-blue-500 text-white'
                          : message.isError
                            ? 'bg-red-50 border border-red-200 text-red-800'
                            : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <span className="text-xs opacity-70 mt-2 block">
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex space-x-1">
                        <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                        <span className="text-sm text-gray-500">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-white rounded-b-lg shadow-sm border border-gray-100 border-t-0 p-4">
              <div className="flex items-end space-x-3">
                <div className="flex-1">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me about your finances, spending patterns, budgeting advice..."
                    className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    disabled={isTyping}
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              
              {/* Quick Actions */}
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  "Analyze my spending patterns",
                  "How can I save more money?",
                  "What's my biggest expense category?",
                  "Create a budget plan for me",
                  "Investment advice based on my income"
                ].map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(suggestion)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                    disabled={isTyping}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPage;