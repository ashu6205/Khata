import { Transaction } from '../app/authContext/transactionApi';

export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AIResponse {
  success: boolean;
  message?: string;
  error?: string;
}

class AIService {
  // Client-side wrapper: calls the internal Next.js API route which performs the
  // actual request to Groq using a server-only key. This prevents exposing the
  // secret in the browser.
  private apiRoute = '/api/ai/chat';

  private createSystemPrompt(transactions: Transaction[]): string {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const categoryBreakdown = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {} as Record<string, number>);

    const recentTransactions = transactions
      .slice(-10)
      .map(t => `₹${t.amount} on ${t.category} - ${t.description}`)
      .join(', ');

    return `You are a professional financial advisor AI assistant for a personal finance app called VietBuild-Pay. 

USER'S FINANCIAL DATA:
- Total Income: ₹${totalIncome.toLocaleString('en-IN')}
- Total Expenses: ₹${totalExpenses.toLocaleString('en-IN')}
- Net Balance: ₹${(totalIncome - totalExpenses).toLocaleString('en-IN')}
- Total Transactions: ${transactions.length}

EXPENSE BREAKDOWN BY CATEGORY:
${Object.entries(categoryBreakdown)
  .map(([category, amount]) => `- ${category}: ₹${amount.toLocaleString('en-IN')}`)
  .join('\n')}

RECENT TRANSACTIONS: ${recentTransactions}

INSTRUCTIONS:
1. Provide personalized financial advice based on the user's actual transaction data
2. Use Indian Rupee (₹) for all currency references
3. Be specific and reference their actual spending patterns
4. Offer actionable insights and recommendations
5. Keep responses conversational but professional
6. Focus on practical financial guidance
7. If asked about specific transactions or categories, refer to their actual data
8. Help with budgeting, saving, expense optimization, and financial planning

Always base your advice on their real financial data shown above.`;
  }

  async getChatResponse(
    userMessage: string, 
    conversationHistory: AIMessage[],
    transactions: Transaction[] = []
  ): Promise<AIResponse> {
    try {
      // Forward the request to our server-side API route. That route will
      // construct the system prompt and call Groq using the server-side key.
      const res = await fetch(this.apiRoute, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMessage, conversationHistory, transactions }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || 'AI service error');
      }

      if (!json.message) {
        throw new Error('No response from AI service');
      }

      return { success: true, message: json.message };

    } catch (error) {
      console.error('AI Service Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown AI service error'
      };
    }
  }

  // Fallback responses for when AI service is unavailable
  getFallbackResponse(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('budget') || lowerMessage.includes('spending')) {
      return 'I can help you create a budget! The 50/30/20 rule is a great starting point: 50% for needs, 30% for wants, and 20% for savings. Would you like me to analyze your current spending patterns once the AI service is configured?';
    }
    
    if (lowerMessage.includes('save') || lowerMessage.includes('saving')) {
      return 'Here are some saving tips: 1) Set up automatic transfers to savings, 2) Review recurring subscriptions, 3) Track your expenses regularly. For personalized advice based on your transactions, please configure the AI service.';
    }
    
    if (lowerMessage.includes('expense') || lowerMessage.includes('transaction')) {
      return 'I can see you want to discuss your expenses. Once the AI service is configured with your Groq API key, I\'ll be able to provide detailed analysis of your actual transaction data and personalized recommendations.';
    }
    
    return 'I\'m here to help with your finances! To provide personalized advice based on your actual transaction data, please add your Groq API key to the .env.local file. Until then, I can offer general financial guidance.';
  }
}

export const aiService = new AIService();