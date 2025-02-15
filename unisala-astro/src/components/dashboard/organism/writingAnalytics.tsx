import { MetricCard } from '../molecules/metricCard';
import { useEffect, useState } from 'react';
import type { EditorMetrics } from '@/types/metrics';
import { StatsDisplay } from './writersStats';
import { calculateAverageWpm, calculateFocusPercentage, calculateLongestStreak, calculateTotalFocusTime, calculateTotalIdleTime, calculateTotalTimeSpent, calculateTotalWords, calculateWritingStreak, findMaxWpm } from '../utils';
import { getCache } from '@/utils/cache';
import { getUpdatedMetrics } from '../utlis3';


export const WritingAnalytics  = ( ) => {

  
  const [totalTimeSpent, setTotalTimeSpent] = useState<number>(0);
  const [totalWordsWritten, setTotalWordsWritten] = useState<number>(0);
  const [averageWpm, setAverageWpm] = useState<number>(0);
  const [maxWpmEver, setMaxWpmEver] = useState<number>(0);
  const [totalFocusTime, setTotalFocusTime] = useState<number>(0);
  const [totalIdleTime, setTotalIdleTime] = useState<number>(0);
  const [focusPercentage, setFocusPercentage] = useState<number>(0);
  const [longestStreak, setLongestStreak] = useState<number>(0);
  const [totalWritingTime, setTotalWritingTime] = useState<number>(0);
  const [timeSeriesData, setTimeSeriesData] = useState<any[]>([]);

   
   useEffect(() => {

    const {editorMetrics, streakMetrics} = getUpdatedMetrics()
    console.log({editorMetrics, streakMetrics})
    try {
      // const totalTime = calculateTotalTimeSpent(editorMetrics.drafts);
      // const totalWords = calculateTotalWords(editorMetrics.drafts);
      // const avgWpm = calculateAverageWpm(totalWords, totalTime);
      // const maxWpm = findMaxWpm(editorMetrics.drafts);
      // const idleTime = calculateTotalIdleTime(editorMetrics.drafts);
      // const focusTime = totalTime - idleTime;

      const { averageWpm, totalIdleTime, totalFocusTime, totalWords, totalTime } = editorMetrics;
      const {currentStreak, longestStreak, sessionTimeSpent, totalSessions} = streakMetrics;
      // const focusPerc = calculateFocusPercentage(focusTime, totalTime);

      setTotalTimeSpent(sessionTimeSpent);
      setTotalWritingTime(totalTime);
      setTotalWordsWritten(totalWords);
      setAverageWpm(averageWpm);
      setMaxWpmEver(0);
      setTotalFocusTime(totalTime - totalIdleTime);
      setTotalIdleTime(totalIdleTime);
      setFocusPercentage(0);
      const streak = calculateWritingStreak();
      setLongestStreak(streak);



      // Prepare time series data for the chart
      // const timeSeries = Object.values(editorMetrics.drafts).map(draft => ({
      //   time: new Date(draft.lastModified).toLocaleDateString(),
      //   wpm: draft.maxWpmEver || 0,
      //   focusScore: (draft.totalFocusTime || 0) / (draft.totalSessionTime || 1) * 100,
      // }));
      // const
      // setTimeSeriesData(timeSeries);

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
          longestStreak,
          totalWritingTime
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