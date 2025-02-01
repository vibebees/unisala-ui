import { Type } from 'lucide-react';
import { StatDisplay } from './statDisplay';
import { MetricCard } from './metricCard';

interface WordingMetricsProps {
  totalWords: number;
  maxWpmEver: number;
  averageWpm: number;
}

export const WordingMetrics = ({ totalWords, maxWpmEver, averageWpm }: WordingMetricsProps) => (
  <MetricCard title="Writing Speed">
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <StatDisplay
          value={totalWords}
          label="Total Words"
        />
        <Type className="text-muted-foreground" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <StatDisplay
          value={maxWpmEver}
          label="Peak WPM"
        />
        <StatDisplay
          value={averageWpm}
          label="Avg WPM"
        />
      </div>
    </div>
  </MetricCard>
);