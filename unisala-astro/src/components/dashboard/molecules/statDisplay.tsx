 import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/utils/lib/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  className?: string;
  iconColor?: string; // Add a prop for icon color
  valueColor?: string; // Add a prop for value color
  gradient?: string; // Add a prop for gradient background
}

export const StatCard = ({ label, value, icon: Icon, className, iconColor, valueColor, gradient }: StatCardProps) => {
  return (
    <Card className={cn("hover:shadow-lg transition-shadow relative overflow-hidden", className, gradient)}>
      {/* Gradient Background */}
      {gradient && (
        <div className={cn("absolute inset-0 opacity-10", gradient)}></div>
      )}
      <CardContent className="flex flex-col gap-4 p-6 relative z-10">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          {Icon && (
            <Icon className={cn("h-7 w-7", iconColor || "text-muted-foreground")} />
          )}
        </div>
        <div className={cn("text-2xl font-bold", valueColor)}>{value}</div>
      </CardContent>
    </Card>
  );
};