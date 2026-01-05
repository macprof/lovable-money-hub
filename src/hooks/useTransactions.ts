import { useState, useEffect } from 'react';
import { Transaction, incomeCategories, expenseCategories } from '@/types/transaction';

const STORAGE_KEY = 'expense-tracker-transactions';

// Sample data for demo
const sampleTransactions: Transaction[] = [
  {
    id: '1',
    amount: 45000,
    type: 'income',
    category: incomeCategories[0], // เงินเดือน
    description: 'เงินเดือนเดือนนี้',
    date: new Date(),
  },
  {
    id: '2',
    amount: 350,
    type: 'expense',
    category: expenseCategories[0], // อาหาร
    description: 'ข้าวกลางวัน',
    date: new Date(),
  },
  {
    id: '3',
    amount: 1500,
    type: 'expense',
    category: expenseCategories[1], // เดินทาง
    description: 'เติมน้ำมัน',
    date: new Date(Date.now() - 86400000),
  },
  {
    id: '4',
    amount: 5000,
    type: 'income',
    category: incomeCategories[1], // ฟรีแลนซ์
    description: 'งานออกแบบโลโก้',
    date: new Date(Date.now() - 86400000),
  },
  {
    id: '5',
    amount: 2500,
    type: 'expense',
    category: expenseCategories[2], // ช้อปปิ้ง
    description: 'เสื้อผ้าใหม่',
    date: new Date(Date.now() - 172800000),
  },
  {
    id: '6',
    amount: 450,
    type: 'expense',
    category: expenseCategories[3], // บันเทิง
    description: 'ดูหนัง',
    date: new Date(Date.now() - 172800000),
  },
];

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setTransactions(parsed.map((t: Transaction) => ({
          ...t,
          date: new Date(t.date),
        })));
      } catch {
        setTransactions(sampleTransactions);
      }
    } else {
      setTransactions(sampleTransactions);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when transactions change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    }
  }, [transactions, isLoaded]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const getTotals = () => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      income,
      expense,
      balance: income - expense,
    };
  };

  return {
    transactions,
    addTransaction,
    deleteTransaction,
    getTotals,
    isLoaded,
  };
}
