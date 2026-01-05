import { Transaction } from '@/types/transaction';
import { CategoryIcon } from '@/components/icons/CategoryIcon';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

interface TransactionItemProps {
  transaction: Transaction;
  delay?: number;
}

export function TransactionItem({ transaction, delay = 0 }: TransactionItemProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div 
      className="group flex items-center gap-4 p-4 rounded-xl bg-card hover:bg-accent/50 transition-all duration-200 animate-fade-in cursor-pointer"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Category Icon */}
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center text-primary-foreground shrink-0 transition-transform group-hover:scale-110",
        transaction.category.color
      )}>
        <CategoryIcon iconName={transaction.category.icon} className="w-5 h-5" />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground truncate">
          {transaction.description || transaction.category.name}
        </p>
        <p className="text-sm text-muted-foreground">
          {transaction.category.name} • {format(new Date(transaction.date), 'd MMM', { locale: th })}
        </p>
      </div>

      {/* Amount */}
      <div className={cn(
        "text-right font-semibold",
        transaction.type === 'income' ? "text-income" : "text-expense"
      )}>
        {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
      </div>
    </div>
  );
}
