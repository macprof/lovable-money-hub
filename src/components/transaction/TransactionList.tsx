import { Transaction } from '@/types/transaction';
import { TransactionItem } from './TransactionItem';
import { Receipt } from 'lucide-react';

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
          <Receipt className="w-8 h-8 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground font-medium">ยังไม่มีรายการ</p>
        <p className="text-sm text-muted-foreground/70">เพิ่มรายการแรกของคุณเลย!</p>
      </div>
    );
  }

  // Sort by date (newest first)
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-2">
      {sortedTransactions.map((transaction, index) => (
        <TransactionItem 
          key={transaction.id} 
          transaction={transaction} 
          delay={index * 50}
        />
      ))}
    </div>
  );
}
