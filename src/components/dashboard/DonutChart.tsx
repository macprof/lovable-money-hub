import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Transaction, allCategories } from '@/types/transaction';

interface DonutChartProps {
  transactions: Transaction[];
  type: 'income' | 'expense';
}

export function DonutChart({ transactions, type }: DonutChartProps) {
  const filteredTransactions = transactions.filter(t => t.type === type);
  
  // Group by category
  const categoryTotals = filteredTransactions.reduce((acc, t) => {
    const categoryId = t.category.id;
    acc[categoryId] = (acc[categoryId] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(categoryTotals).map(([categoryId, total]) => {
    const category = allCategories.find(c => c.id === categoryId);
    return {
      name: category?.name || categoryId,
      value: total,
      color: category?.color.replace('bg-', '') || 'gray-500',
    };
  });

  const COLORS = {
    'emerald-500': '#10b981',
    'teal-500': '#14b8a6',
    'green-500': '#22c55e',
    'cyan-500': '#06b6d4',
    'lime-500': '#84cc16',
    'orange-500': '#f97316',
    'blue-500': '#3b82f6',
    'pink-500': '#ec4899',
    'purple-500': '#a855f7',
    'red-500': '#ef4444',
    'rose-500': '#f43f5e',
    'indigo-500': '#6366f1',
    'gray-500': '#6b7280',
  };

  const total = data.reduce((sum, item) => sum + item.value, 0);

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-muted-foreground">
        ยังไม่มีข้อมูล
      </div>
    );
  }

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
            strokeWidth={0}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[entry.color as keyof typeof COLORS] || '#6b7280'}
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [
              new Intl.NumberFormat('th-TH', {
                style: 'currency',
                currency: 'THB',
                minimumFractionDigits: 0,
              }).format(value),
              ''
            ]}
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '0.75rem',
              boxShadow: 'var(--shadow-md)',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <p className="text-xs text-muted-foreground">รวม</p>
          <p className="text-lg font-bold text-foreground">
            {new Intl.NumberFormat('th-TH', {
              notation: 'compact',
              compactDisplay: 'short',
            }).format(total)}
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {data.slice(0, 4).map((item, index) => (
          <div key={index} className="flex items-center gap-1.5 text-xs">
            <div 
              className="w-2.5 h-2.5 rounded-full" 
              style={{ backgroundColor: COLORS[item.color as keyof typeof COLORS] }}
            />
            <span className="text-muted-foreground">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
