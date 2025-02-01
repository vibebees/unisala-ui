import { MetricCard } from '../molecules/metricCard';
import { useEffect, useState } from 'react';
import type { DraftData, MetaData } from '@/types/metrics';
import { LineChart, XAxis, YAxis, Tooltip, Line, ResponsiveContainer } from 'recharts';

interface WritingAnalyticsProps {
  editorMetrics: MetaData;
}

export const WritingAnalytics: React.FC<WritingAnalyticsProps> = ({ editorMetrics }) => {
  const [totalTimeSpent, setTotalTimeSpent] = useState<number>(0);
  const [totalWordsWritten, setTotalWordsWritten] = useState<number>(0);
  const [averageWpm, setAverageWpm] = useState<number>(0);
  const [maxWpmEver, setMaxWpmEver] = useState<number>(0);
  const [totalFocusTime, setTotalFocusTime] = useState<number>(0);
  const [totalIdleTime, setTotalIdleTime] = useState<number>(0);
  const [focusPercentage, setFocusPercentage] = useState<number>(0);
  const [longestStreak, setLongestStreak] = useState<number>(0);
  const [timeSeriesData, setTimeSeriesData] = useState<any[]>([]);

  // Calculate total time spent in the app
  const calculateTotalTimeSpent = (drafts: { [key: string]: DraftData }): number => {
    if (!drafts) return 0;
    return Object.values(drafts).reduce((sum, draft) => sum + (draft.totalSessionTime || 0), 0);
  };

  // Calculate total words written
  const calculateTotalWords = (drafts: { [key: string]: DraftData }): number => {
    if (!drafts) return 0;
    return Object.values(drafts).reduce((sum, draft) => sum + (draft.totalWords || 0), 0);
  };

  // Calculate average WPM
  const calculateAverageWpm = (totalWords: number, totalTimeSpent: number): number => {
    if (totalTimeSpent === 0) return 0;
    return (totalWords / (totalTimeSpent / 60000)).toFixed(2);
  };

  // Find max WPM ever
  const findMaxWpm = (drafts: { [key: string]: DraftData }): number => {
    if (!drafts) return 0;
    return Math.max(...Object.values(drafts).map(draft => draft.maxWpmEver || 0));
  };

  // Calculate total focus time
  const calculateTotalFocusTime = (drafts: { [key: string]: DraftData }): number => {
    if (!drafts) return 0;
    return Object.values(drafts).reduce((sum, draft) => sum + (draft.totalFocusTime || 0), 0);
  };

  // Calculate total idle time
  const calculateTotalIdleTime = (drafts: { [key: string]: DraftData }): number => {
    if (!drafts) return 0;
    return Object.values(drafts).reduce((sum, draft) => sum + (draft.totalIdleTime || 0), 0);
  };

  // Calculate focus percentage
  const calculateFocusPercentage = (totalFocusTime: number, totalTimeSpent: number): number => {
    if (totalTimeSpent === 0) return 0;
    return ((totalFocusTime / totalTimeSpent) * 100).toFixed(2);
  };

  // Initialize data processing on component mount
  useEffect(() => {
    if (!editorMetrics || !editorMetrics.drafts) {
      console.warn('No editorMetrics or drafts found.');
      return;
    }

    try {
      const totalTime = calculateTotalTimeSpent(editorMetrics.drafts);
      const totalWords = calculateTotalWords(editorMetrics.drafts);
      const avgWpm = calculateAverageWpm(totalWords, totalTime);
      const maxWpm = findMaxWpm(editorMetrics.drafts);
      const focusTime = calculateTotalFocusTime(editorMetrics.drafts);
      const idleTime = calculateTotalIdleTime(editorMetrics.drafts);
      const focusPerc = calculateFocusPercentage(focusTime, totalTime);

      setTotalTimeSpent(totalTime);
      setTotalWordsWritten(totalWords);
      setAverageWpm(avgWpm);
      setMaxWpmEver(maxWpm);
      setTotalFocusTime(focusTime);
      setTotalIdleTime(idleTime);
      setFocusPercentage(focusPerc);
      setLongestStreak(editorMetrics.global.longestStreak || 0);

      // Prepare time series data for the chart
      const timeSeries = Object.values(editorMetrics.drafts).map(draft => ({
        time: new Date(draft.lastModified).toLocaleDateString(),
        wpm: draft.maxWpmEver || 0,
        focusScore: (draft.totalFocusTime || 0) / (draft.totalSessionTime || 1) * 100,
      }));
      setTimeSeriesData(timeSeries);

    } catch (error) {
      console.error('Error calculating metrics:', error);
    }
  }, [editorMetrics]);

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border border-gray-200">Metric</th>
              <th className="px-4 py-2 border border-gray-200">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border border-gray-200">Total Time Spent</td>
              <td className="px-4 py-2 border border-gray-200">{Math.round(totalTimeSpent / 60000)} minutes</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-200">Total Words Written</td>
              <td className="px-4 py-2 border border-gray-200">{totalWordsWritten} words</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-200">Average WPM</td>
              <td className="px-4 py-2 border border-gray-200">{averageWpm} WPM</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-200">Max WPM Ever</td>
              <td className="px-4 py-2 border border-gray-200">{maxWpmEver} WPM</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-200">Total Focus Time</td>
              <td className="px-4 py-2 border border-gray-200">{Math.round(totalFocusTime / 60000)} minutes</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-200">Total Idle Time</td>
              <td className="px-4 py-2 border border-gray-200">{Math.round(totalIdleTime / 60000)} minutes</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-200">Focus Percentage</td>
              <td className="px-4 py-2 border border-gray-200">{focusPercentage}%</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-200">Longest Writing Streak</td>
              <td className="px-4 py-2 border border-gray-200">{longestStreak} days</td>
            </tr>
          </tbody>
        </table>
      </div>

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
    </div>
  );
};