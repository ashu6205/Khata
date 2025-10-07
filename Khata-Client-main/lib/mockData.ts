// Mock data for the Personal Finance Assistant Dashboard
export const summaryData = {
  recentBalance: 145000,
  transactionCount: 50,
  totalSpending: 115000
};

export const earningData = [
  { month: 'Feb', earning: 42000 },
  { month: 'Mar', earning: 78000 },
  { month: 'Apr', earning: 71000 },
  { month: 'May', earning: 85000 },
  { month: 'Jun', earning: 44058 }, // Current month highlighted
  { month: 'Jul', earning: 78000 },
  { month: 'Aug', earning: 89000 },
  { month: 'Sep', earning: 76000 },
  { month: 'Oct', earning: 0 },
  { month: 'Nov', earning: 88000 },
  { month: 'Dec', earning: 76000 },
  { month: 'Jan', earning: 95000 }
];

export const transactionData = [
  {
    id: 'SGFU854564',
    date: 'Jan 24, 2025',
    category: 'Subscription',
    status: 'Success',
    amount: 750.00
  },
  {
    id: 'SGFU854564',
    date: 'Jan 24, 2025',
    category: 'Salary',
    status: 'Success',
    amount: 750.00
  },
  {
    id: 'SGFU854564',
    date: 'Jan 24, 2025',
    category: 'Withdraw',
    status: 'Success',
    amount: 750.00
  }
];

export const todoData = [
  {
    id: 1,
    task: 'Run Payroll',
    time: 'Mar 4 at 6:00pm',
    amount: 120,
    icon: '👥'
  },
  {
    id: 2,
    task: 'Review time off request',
    time: 'Mar 4 at 6:00pm',
    amount: 120,
    icon: '⏰'
  },
  {
    id: 3,
    task: 'Finish onboarding tony',
    time: 'Mar 4 at 6:00pm',
    amount: 120,
    icon: '⚙️'
  }
];

export const upcomingPayments = [
  {
    id: 1,
    title: 'Home Rent',
    status: 'Pending',
    amount: 200,
    icon: '🏠'
  },
  {
    id: 2,
    title: 'Car Insurance',
    status: 'Pending',
    amount: 120,
    icon: '🚗'
  }
];