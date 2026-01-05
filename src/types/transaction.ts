export type TransactionType = 'income' | 'expense';

export type Category = {
  id: string;
  name: string;
  icon: string;
  type: TransactionType;
  color: string;
};

export type Transaction = {
  id: string;
  amount: number;
  type: TransactionType;
  category: Category;
  description: string;
  date: Date;
};

export const incomeCategories: Category[] = [
  { id: 'salary', name: 'เงินเดือน', icon: 'Wallet', type: 'income', color: 'bg-emerald-500' },
  { id: 'freelance', name: 'งานฟรีแลนซ์', icon: 'Laptop', type: 'income', color: 'bg-teal-500' },
  { id: 'investment', name: 'การลงทุน', icon: 'TrendingUp', type: 'income', color: 'bg-green-500' },
  { id: 'gift', name: 'ของขวัญ', icon: 'Gift', type: 'income', color: 'bg-cyan-500' },
  { id: 'other-income', name: 'อื่นๆ', icon: 'Plus', type: 'income', color: 'bg-lime-500' },
];

export const expenseCategories: Category[] = [
  { id: 'food', name: 'อาหาร', icon: 'Utensils', type: 'expense', color: 'bg-orange-500' },
  { id: 'transport', name: 'เดินทาง', icon: 'Car', type: 'expense', color: 'bg-blue-500' },
  { id: 'shopping', name: 'ช้อปปิ้ง', icon: 'ShoppingBag', type: 'expense', color: 'bg-pink-500' },
  { id: 'entertainment', name: 'บันเทิง', icon: 'Gamepad2', type: 'expense', color: 'bg-purple-500' },
  { id: 'bills', name: 'ค่าใช้จ่าย', icon: 'Receipt', type: 'expense', color: 'bg-red-500' },
  { id: 'health', name: 'สุขภาพ', icon: 'Heart', type: 'expense', color: 'bg-rose-500' },
  { id: 'education', name: 'การศึกษา', icon: 'BookOpen', type: 'expense', color: 'bg-indigo-500' },
  { id: 'other-expense', name: 'อื่นๆ', icon: 'MoreHorizontal', type: 'expense', color: 'bg-gray-500' },
];

export const allCategories = [...incomeCategories, ...expenseCategories];
