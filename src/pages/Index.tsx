import { useState } from 'react';
import { Wallet, TrendingUp, TrendingDown, Sparkles } from 'lucide-react';
import { SummaryCard } from '@/components/dashboard/SummaryCard';
import { DonutChart } from '@/components/dashboard/DonutChart';
import { TransactionList } from '@/components/transaction/TransactionList';
import { AddTransactionModal } from '@/components/transaction/AddTransactionModal';
import { BottomNav } from '@/components/navigation/BottomNav';
import { useTransactions } from '@/hooks/useTransactions';

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { transactions, addTransaction, getTotals } = useTransactions();
  const { income, expense, balance } = getTotals();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-foreground">FinTrack</h1>
              <p className="text-xs text-muted-foreground">จัดการเงินอย่างชาญฉลาด</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container px-4 py-6 pb-24 space-y-6">
        {/* Summary Cards */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SummaryCard
              title="ยอดคงเหลือ"
              amount={balance}
              icon={Wallet}
              variant="balance"
              delay={0}
            />
            <SummaryCard
              title="รายรับ"
              amount={income}
              icon={TrendingUp}
              variant="income"
              delay={100}
            />
            <SummaryCard
              title="รายจ่าย"
              amount={expense}
              icon={TrendingDown}
              variant="expense"
              delay={200}
            />
          </div>
        </section>

        {/* Charts Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card rounded-2xl p-6 shadow-card animate-slide-up" style={{ animationDelay: '300ms' }}>
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-income" />
              รายรับตามหมวดหมู่
            </h3>
            <DonutChart transactions={transactions} type="income" />
          </div>
          
          <div className="bg-card rounded-2xl p-6 shadow-card animate-slide-up" style={{ animationDelay: '400ms' }}>
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-expense" />
              รายจ่ายตามหมวดหมู่
            </h3>
            <DonutChart transactions={transactions} type="expense" />
          </div>
        </section>

        {/* Recent Transactions */}
        <section className="bg-card rounded-2xl p-6 shadow-card animate-slide-up" style={{ animationDelay: '500ms' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">รายการล่าสุด</h3>
            <span className="text-sm text-muted-foreground">{transactions.length} รายการ</span>
          </div>
          <TransactionList transactions={transactions} />
        </section>
      </main>

      {/* Bottom Navigation */}
      <BottomNav onAddClick={() => setIsModalOpen(true)} />

      {/* Add Transaction Modal */}
      <AddTransactionModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onAdd={addTransaction}
      />
    </div>
  );
};

export default Index;
