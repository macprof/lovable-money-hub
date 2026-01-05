import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CategoryIcon } from '@/components/icons/CategoryIcon';
import { 
  Transaction, 
  TransactionType, 
  Category, 
  incomeCategories, 
  expenseCategories 
} from '@/types/transaction';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface AddTransactionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (transaction: Omit<Transaction, 'id'>) => void;
}

export function AddTransactionModal({ open, onOpenChange, onAdd }: AddTransactionModalProps) {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [description, setDescription] = useState('');

  const categories = type === 'income' ? incomeCategories : expenseCategories;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !selectedCategory) return;

    onAdd({
      amount: parseFloat(amount),
      type,
      category: selectedCategory,
      description,
      date: new Date(),
    });

    // Reset form
    setAmount('');
    setSelectedCategory(null);
    setDescription('');
    onOpenChange(false);
  };

  const handleTypeChange = (newType: TransactionType) => {
    setType(newType);
    setSelectedCategory(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">เพิ่มรายการใหม่</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Type Tabs */}
          <Tabs value={type} onValueChange={(v) => handleTypeChange(v as TransactionType)}>
            <TabsList className="grid w-full grid-cols-2 h-12">
              <TabsTrigger 
                value="expense" 
                className="data-[state=active]:bg-expense data-[state=active]:text-expense-foreground gap-2"
              >
                <TrendingDown className="w-4 h-4" />
                รายจ่าย
              </TabsTrigger>
              <TabsTrigger 
                value="income"
                className="data-[state=active]:bg-income data-[state=active]:text-income-foreground gap-2"
              >
                <TrendingUp className="w-4 h-4" />
                รายรับ
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount">จำนวนเงิน (บาท)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-2xl font-bold h-14 text-center"
              min="0"
              step="0.01"
              required
            />
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <Label>หมวดหมู่</Label>
            <div className="grid grid-cols-4 gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all",
                    selectedCategory?.id === category.id
                      ? cn(category.color, "text-primary-foreground scale-95")
                      : "bg-muted hover:bg-accent"
                  )}
                >
                  <CategoryIcon iconName={category.icon} className="w-5 h-5" />
                  <span className="text-xs font-medium truncate w-full text-center">
                    {category.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">รายละเอียด (ไม่บังคับ)</Label>
            <Input
              id="description"
              placeholder="เช่น ข้าวมันไก่, ค่าน้ำมัน..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className={cn(
              "w-full h-12 text-lg font-semibold",
              type === 'income' 
                ? "bg-income hover:bg-income/90" 
                : "bg-expense hover:bg-expense/90"
            )}
            disabled={!amount || !selectedCategory}
          >
            บันทึกรายการ
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
