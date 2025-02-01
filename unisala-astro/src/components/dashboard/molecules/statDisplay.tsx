import React from 'react';

interface StatDisplayProps {
  value: string | number;
  label: string;
  trend?: number;
}

export const StatDisplay = ({ value, label, trend }: StatDisplayProps) => (
  <div className="flex flex-col">
    <span className="text-2xl font-bold">{value}</span>
    <span className="text-sm text-muted-foreground">{label}</span>
    {trend !== undefined && (
      <span className={`text-xs ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
        {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
      </span>
    )}
  </div>
);
