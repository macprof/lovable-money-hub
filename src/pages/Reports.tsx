import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ArrowLeft, TrendingUp, TrendingDown, Calendar, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTransactions } from '@/hooks/useTransactions';
import { format, startOfMonth, subMonths } from 'date-fns';
import { th } from 'date-fns/locale';

const Reports = () => {
  const { transactions } = useTransactions();

  // Generate last 6 months data
  const monthlyData = useMemo(() => {
    const months = [];
    const now = new Date();

    for (let i = 5; i >= 0; i--) {
      const monthStart = startOfMonth(subMonths(now, i));
      const monthName = format(monthStart, 'MMM', { locale: th });
      const monthYear = format(monthStart, 'yyyy');
      
      const monthTransactions = transactions.filter(t => {
        const tDate = new Date(t.date);
        return tDate.getMonth() === monthStart.getMonth() && 
               tDate.getFullYear() === monthStart.getFullYear();
      });

      const income = monthTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

      const expense = monthTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      months.push({
        name: monthName,
        year: monthYear,
        รายรับ: income,
        รายจ่าย: expense,
        balance: income - expense,
      });
    }

    return months;
  }, [transactions]);

  // Calculate totals for the period
  const totals = useMemo(() => {
    return monthlyData.reduce(
      (acc, month) => ({
        income: acc.income + month.รายรับ,
        expense: acc.expense + month.รายจ่าย,
      }),
      { income: 0, expense: 0 }
    );
  }, [monthlyData]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatCompact = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}k`;
    }
    return value.toString();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="icon" className="rounded-xl">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="font-bold text-lg text-foreground">รายงาน</h1>
              <p className="text-xs text-muted-foreground">สรุป 6 เดือนย้อนหลัง</p>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
            <Calendar className="w-5 h-5 text-primary-foreground" />
          </div>
        </div>
      </header>

      <main className="container px-4 py-6 space-y-6">
        {/* Summary Stats */}
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-income-light border border-income/20 rounded-2xl p-5 animate-slide-up">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-income" />
              <span className="text-sm font-medium text-income">รายรับรวม</span>
            </div>
            <p className="text-2xl font-bold text-income">{formatCurrency(totals.income)}</p>
          </div>
          
          <div className="bg-expense-light border border-expense/20 rounded-2xl p-5 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-4 h-4 text-expense" />
              <span className="text-sm font-medium text-expense">รายจ่ายรวม</span>
            </div>
            <p className="text-2xl font-bold text-expense">{formatCurrency(totals.expense)}</p>
          </div>
        </section>

        {/* Bar Chart */}
        <section className="bg-card rounded-2xl p-6 shadow-card animate-slide-up" style={{ animationDelay: '200ms' }}>
          <h3 className="font-semibold text-foreground mb-6 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            เปรียบเทียบรายเดือน
          </h3>
          
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  tickFormatter={formatCompact}
                />
                <Tooltip 
                  formatter={(value: number) => [formatCurrency(value), '']}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.75rem',
                    boxShadow: 'var(--shadow-md)',
                  }}
                  cursor={{ fill: 'hsl(var(--muted) / 0.3)' }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: '1rem' }}
                  iconType="circle"
                />
                <Bar 
                  dataKey="รายรับ" 
                  fill="hsl(var(--income))" 
                  radius={[6, 6, 0, 0]}
                  maxBarSize={40}
                />
                <Bar 
                  dataKey="รายจ่าย" 
                  fill="hsl(var(--expense))" 
                  radius={[6, 6, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Monthly Breakdown */}
        <section className="bg-card rounded-2xl p-6 shadow-card animate-slide-up" style={{ animationDelay: '300ms' }}>
          <h3 className="font-semibold text-foreground mb-4">สรุปแต่ละเดือน</h3>
          
          <div className="space-y-3">
            {[...monthlyData].reverse().map((month, index) => (
              <div 
                key={`${month.name}-${month.year}`}
                className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-accent/50 transition-colors"
              >
                <div>
                  <p className="font-medium text-foreground">{month.name} {month.year}</p>
                  <div className="flex items-center gap-3 mt-1 text-sm">
                    <span className="text-income">+{formatCurrency(month.รายรับ)}</span>
                    <span className="text-expense">-{formatCurrency(month.รายจ่าย)}</span>
                  </div>
                </div>
                <div className={`text-right font-semibold ${month.balance >= 0 ? 'text-income' : 'text-expense'}`}>
                  {month.balance >= 0 ? '+' : ''}{formatCurrency(month.balance)}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Reports;
