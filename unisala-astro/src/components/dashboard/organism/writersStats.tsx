// components/organisms/StatsDisplay.tsx
import { Clock, Edit, Zap, Target, Brain, Coffee, Percent, Calendar, type LucideIcon } from "lucide-react";
import {StatCard} from "../molecules/statDisplay"
 
interface StatsDisplayProps {
  stats: {
    totalTimeSpent: number;
    totalWordsWritten: number;
    averageWpm: number;
    maxWpmEver: number;
    totalFocusTime: number;
    totalIdleTime: number;
    focusPercentage: number;
    longestStreak: number;
  };
}

export const StatsDisplay = ({ stats }: StatsDisplayProps) => {
  const timeUnit = {
    hours: 3600000,
    minutes: 60000,
    unit: 'hours'
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Total Time"
        value={`${Math.round(stats.totalTimeSpent / timeUnit.hours)} ${timeUnit.unit}`}
        icon={Clock}
        iconColor="text-blue-500"
        valueColor="text-blue-700"
        gradient="bg-gradient-to-br from-blue-50 to-blue-100"
      />
      <StatCard
        label="Words Written"
        value={stats.totalWordsWritten.toLocaleString()}
        icon={Edit}
        iconColor="text-green-500"
        valueColor="text-green-700"
        gradient="bg-gradient-to-br from-green-50 to-green-100"
      />
      <StatCard
        label="Average WPM"
        value={`${stats.averageWpm} WPM`}
        icon={Zap}
        iconColor="text-yellow-500"
        valueColor="text-yellow-700"
        gradient="bg-gradient-to-br from-yellow-50 to-yellow-100"
      />
      {/* <StatCard
        label="Max WPM"
        value={`${stats.maxWpmEver} WPM`}
        icon={Target}
        iconColor="text-red-500"
        valueColor="text-red-700"
        gradient="bg-gradient-to-br from-red-50 to-red-100"
      /> */}
      <StatCard
        label="Focus Time"
        value={`${Math.round(stats.totalFocusTime / timeUnit.hours)} ${timeUnit.unit}`}
        icon={Brain}
        iconColor="text-purple-500"
        valueColor="text-purple-700"
        gradient="bg-gradient-to-br from-purple-50 to-purple-100"
      />
      <StatCard
        label="Idle Time"
        value={`${Math.round(stats.totalIdleTime / timeUnit.hours)} ${timeUnit.unit}`}
        icon={Coffee}
        iconColor="text-orange-500"
        valueColor="text-orange-700"
        gradient="bg-gradient-to-br from-orange-50 to-orange-100"
      />
      <StatCard
        label="Focus Score"
        value={`${stats.focusPercentage}%`}
        icon={Percent}
        iconColor="text-teal-500"
        valueColor="text-teal-700"
        gradient="bg-gradient-to-br from-teal-50 to-teal-100"
      />
      <StatCard
        label="Writing Streak"
        value={`${stats.longestStreak} days`}
        icon={Calendar}
        iconColor="text-pink-500"
        valueColor="text-pink-700"
        gradient="bg-gradient-to-br from-pink-50 to-pink-100"
      />
    </div>
  );
};