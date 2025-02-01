import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { MetricCard } from '../molecules/metricCard';
import { FocusMetrics } from '../molecules/focusMetrics';
import { WordingMetrics } from '../molecules/wordingMetrics';
import { calculateAverageWpm, calculateFocusPercentage, calculateTotalFocusTime, calculateTotalSessionTime, calculateTotalWords, findMaxWpm } from '../utils';

interface TimeSeriesData {
  time: string;
  wpm: number;
  focusScore: number;
}

interface WritingAnalyticsProps {
  timeSeriesData: TimeSeriesData[];
  dayDistribution: {
    [key: string]: number;
  };
}

export const WritingAnalytics = ({ timeSeriesData, dayDistribution }: WritingAnalyticsProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <MetricCard title="Writing Velocity" className="col-span-full">
      <div className="h-64 w-full">
        <ResponsiveContainer>
          <LineChart data={timeSeriesData}>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="wpm" 
              stroke="#8884d8" 
              name="Words per Minute"
            />
            <Line 
              type="monotone" 
              dataKey="focusScore" 
              stroke="#82ca9d" 
              name="Focus Score"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </MetricCard>
    
    <FocusMetrics 
      totalFocusTime={calculateTotalFocusTime(timeSeriesData)}
      totalSessionTime={calculateTotalSessionTime(timeSeriesData)}
      focusPercentage={calculateFocusPercentage(timeSeriesData)}
    />
    
    <WordingMetrics
      totalWords={calculateTotalWords(timeSeriesData)}
      maxWpmEver={findMaxWpm(timeSeriesData)}
      averageWpm={calculateAverageWpm(timeSeriesData)}
    />
  </div>
);
