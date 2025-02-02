import { MetricCard } from '../molecules/metricCard';
import { useEffect, useState } from 'react';
import type { EditorMetrics } from '@/types/metrics';
import { StatsDisplay } from './writersStats';
import { calculateAverageWpm, calculateFocusPercentage, calculateLongestStreak, calculateTotalFocusTime, calculateTotalIdleTime, calculateTotalTimeSpent, calculateTotalWords, findMaxWpm } from '../utils';
import { getCache } from '@/utils/cache';


export const WritingAnalytics  = ( ) => {

  
  const [totalTimeSpent, setTotalTimeSpent] = useState<number>(0);
  const [totalWordsWritten, setTotalWordsWritten] = useState<number>(0);
  const [averageWpm, setAverageWpm] = useState<number>(0);
  const [maxWpmEver, setMaxWpmEver] = useState<number>(0);
  const [totalFocusTime, setTotalFocusTime] = useState<number>(0);
  const [totalIdleTime, setTotalIdleTime] = useState<number>(0);
  const [focusPercentage, setFocusPercentage] = useState<number>(0);
  const [longestStreak, setLongestStreak] = useState<number>(0);
  const [timeSeriesData, setTimeSeriesData] = useState<any[]>([]);

   
   useEffect(() => {
    const editorMetrics: EditorMetrics = getCache('editorMetrics') || {
      drafts: {},
      global: {
        totalWordsWritten: 0,
        totalFocusTime: 0,
        totalIdleTime: 0,
        highestWpmEver: 0,
        firstSessionDate: 0,
        lastSessionDate: 0,
        consecutiveDays: 0,
        longestStreak: 0,
        draftsVersion: 0,
      },
    };
    if (!editorMetrics || !editorMetrics.drafts) {
      console.warn('No editorMetrics or drafts found.');
      return;
    }
    try {
      const totalTime = calculateTotalTimeSpent(editorMetrics.drafts);
      const totalWords = calculateTotalWords(editorMetrics.drafts);
      const avgWpm = calculateAverageWpm(totalWords, totalTime);
      const maxWpm = findMaxWpm(editorMetrics.drafts);
      const idleTime = calculateTotalIdleTime(editorMetrics.drafts);
      const focusTime = totalTime - idleTime;

      const focusPerc = calculateFocusPercentage(focusTime, totalTime);

      setTotalTimeSpent(totalTime);
      setTotalWordsWritten(totalWords);
      setAverageWpm(avgWpm);
      setMaxWpmEver(maxWpm);
      setTotalFocusTime(focusTime);
      setTotalIdleTime(idleTime);
      setFocusPercentage(focusPerc);
      const streak = calculateLongestStreak();
      setLongestStreak(streak);



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
  }, []);
 

  return (
    <div className="space-y-4">
      
      <StatsDisplay
        stats={{
          totalTimeSpent,
          totalWordsWritten,
          averageWpm,
          maxWpmEver,
          totalFocusTime,
          totalIdleTime,
          focusPercentage,
          longestStreak
        }}
      />


      {/* <MetricCard title="Writing Velocity" className="col-span-full">
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
      </MetricCard> */}
    </div>
  );
};