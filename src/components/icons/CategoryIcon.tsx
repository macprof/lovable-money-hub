import {
  Wallet,
  Laptop,
  TrendingUp,
  Gift,
  Plus,
  Utensils,
  Car,
  ShoppingBag,
  Gamepad2,
  Receipt,
  Heart,
  BookOpen,
  MoreHorizontal,
  LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Wallet,
  Laptop,
  TrendingUp,
  Gift,
  Plus,
  Utensils,
  Car,
  ShoppingBag,
  Gamepad2,
  Receipt,
  Heart,
  BookOpen,
  MoreHorizontal,
};

interface CategoryIconProps {
  iconName: string;
  className?: string;
}

export function CategoryIcon({ iconName, className = "w-5 h-5" }: CategoryIconProps) {
  const Icon = iconMap[iconName] || MoreHorizontal;
  return <Icon className={className} />;
}
