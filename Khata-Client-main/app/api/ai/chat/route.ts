import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { Transaction } from '../../../../app/authContext/transactionApi';

type AIMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

function createSystemPrompt(transactions: Transaction[]): string {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const categoryBreakdown = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc: Record<string, number>, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const recentTransactions = transactions
    .slice(-10)
    .map(t => `₹${t.amount} on ${t.category} - ${t.description}`)
    .join(', ');

  return `You are a professional financial advisor AI assistant for a personal finance app called VietBuild-Pay.\n\nUSER'S FINANCIAL DATA:\n- Total Income: ₹${totalIncome.toLocaleString('en-IN')}\n- Total Expenses: ₹${totalExpenses.toLocaleString('en-IN')}\n- Net Balance: ₹${(totalIncome - totalExpenses).toLocaleString('en-IN')}\n- Total Transactions: ${transactions.length}\n\nEXPENSE BREAKDOWN BY CATEGORY:\n${Object.entries(categoryBreakdown)
    .map(([category, amount]) => `- ${category}: ₹${amount.toLocaleString('en-IN')}`)
    .join('\n')}\n\nRECENT TRANSACTIONS: ${recentTransactions}\n\nINSTRUCTIONS:\n1. Provide personalized financial advice based on the user's actual transaction data\n2. Use Indian Rupee (₹) for all currency references\n3. Be specific and reference their actual spending patterns\n4. Offer actionable insights and recommendations\n5. Keep responses conversational but professional\n6. Focus on practical financial guidance\n7. If asked about specific transactions or categories, refer to their actual data\n8. Help with budgeting, saving, expense optimization, and financial planning\n\nAlways base your advice on their real financial data shown above.`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userMessage, conversationHistory, transactions } = body as {
      userMessage: string;
      conversationHistory: AIMessage[];
      transactions: Transaction[];
    };

    const GROQ_API_KEY = process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY;
    if (!GROQ_API_KEY) {
      return NextResponse.json({ error: 'GROQ API key not configured on the server.' }, { status: 500 });
    }

    const systemPrompt = createSystemPrompt(transactions || []);

    const messages: AIMessage[] = [
      { role: 'system', content: systemPrompt },
      ...(conversationHistory || []).slice(-8),
      { role: 'user', content: userMessage }
    ];

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages,
        temperature: 0.7,
        max_tokens: 500,
        top_p: 0.9
      })
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data.error?.message || 'Groq API error' }, { status: res.status });
    }

    const aiMessage = data.choices?.[0]?.message?.content;
    if (!aiMessage) {
      return NextResponse.json({ error: 'No response from Groq' }, { status: 500 });
    }

    return NextResponse.json({ message: aiMessage });
  } catch (err) {
    console.error('Server AI route error', err);
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown server error' }, { status: 500 });
  }
}
