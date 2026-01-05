import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SummaryCardProps {
  title: string;
  amount: number;
  icon: LucideIcon;
  variant: 'balance' | 'income' | 'expense';
  delay?: number;
}

export function SummaryCard({ title, amount, icon: Icon, variant, delay = 0 }: SummaryCardProps) {
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
      className={cn(
        "relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-card-hover animate-slide-up",
        variant === 'balance' && "gradient-primary text-primary-foreground shadow-glow",
        variant === 'income' && "bg-income-light border border-income/20",
        variant === 'expense' && "bg-expense-light border border-expense/20",
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Background decoration */}
      <div className={cn(
        "absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-20",
        variant === 'balance' && "bg-primary-foreground",
        variant === 'income' && "bg-income",
        variant === 'expense' && "bg-expense",
      )} />
      
      <div className="relative z-10">
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
          variant === 'balance' && "bg-primary-foreground/20",
          variant === 'income' && "bg-income/20",
          variant === 'expense' && "bg-expense/20",
        )}>
          <Icon className={cn(
            "w-6 h-6",
            variant === 'balance' && "text-primary-foreground",
            variant === 'income' && "text-income",
            variant === 'expense' && "text-expense",
          )} />
        </div>
        
        <p className={cn(
          "text-sm font-medium mb-1",
          variant === 'balance' && "text-primary-foreground/80",
          variant === 'income' && "text-income",
          variant === 'expense' && "text-expense",
        )}>
          {title}
        </p>
        
        <p className={cn(
          "text-2xl md:text-3xl font-bold",
          variant === 'balance' && "text-primary-foreground",
          variant === 'income' && "text-income",
          variant === 'expense' && "text-expense",
        )}>
          {formatCurrency(amount)}
        </p>
      </div>
    </div>
  );
}
