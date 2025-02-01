import { Clock } from 'lucide-react';
import { StatDisplay } from './statDisplay';
import { MetricCard } from './metricCard';

interface FocusMetricsProps {
  totalFocusTime: number;
  totalSessionTime: number;
  focusPercentage: number;
}

export const FocusMetrics = ({ totalFocusTime, totalSessionTime, focusPercentage }: FocusMetricsProps) => (
  <MetricCard title="Focus Analysis">
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <StatDisplay
          value={`${Math.round(totalFocusTime / 60000)}m`}
          label="Focus Time"
        />
        <Clock className="text-muted-foreground" />
      </div>
      <div className="flex justify-between items-center">
        <StatDisplay
          value={`${focusPercentage}%`}
          label="Focus Ratio"
          trend={focusPercentage - 50} // Compare with baseline
        />
      </div>
    </div>
  </MetricCard>
);
