import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart3, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavProps {
  onAddClick: () => void;
}

export function BottomNav({ onAddClick }: BottomNavProps) {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'หน้าหลัก' },
    { path: '/reports', icon: BarChart3, label: 'รายงาน' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t safe-area-bottom">
      <div className="container flex items-center justify-around h-16 px-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive && "animate-scale-in")} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
        
        {/* Center Add Button */}
        <button
          onClick={onAddClick}
          className="absolute left-1/2 -translate-x-1/2 -top-6 w-14 h-14 rounded-full gradient-primary shadow-glow flex items-center justify-center hover:scale-110 transition-transform"
        >
          <Plus className="w-6 h-6 text-primary-foreground" />
        </button>
      </div>
    </nav>
  );
}
