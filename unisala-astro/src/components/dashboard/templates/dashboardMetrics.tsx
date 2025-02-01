// src/components/templates/dashboardMetrics.tsx
import React, { useEffect, useState } from "react";
import { getCache } from "@/utils/cache";
import { MetricToggler } from "../molecules/metricToggler";
import { UsageMetrics } from "../organism/usageMetrics";
import { ProductiveDaysCard } from "../organism/productiveDaysCard";
import { WritingAnalytics } from "../organism/writingAnalytics";
import { calculateAnalytics } from "../analytics";
import type { TimeSeriesData } from "@/types/metrics"

interface DraftData {
  createdAt: number;
  postText: string;
  updatedAt: number;
  totalWords?: number;
  totalFocusTime?: number;
  totalSessionTime?: number;
  maxWpmEver?: number;
}

export const DashboardMetrics: React.FC = () => {
  const [isDashboardCollapsed, setIsDashboardCollapsed] = useState(true);
  const [peakUsageDataUpdated, setPeakUsageDataUpdated] = useState<{ [key: string]: number }>({});
  const [peakUsageDataCreated, setPeakUsageDataCreated] = useState<{ [key: string]: number }>({});
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData[]>([]);
  const [dayDistribution, setDayDistribution] = useState<{ [key: string]: number }>({});
  const [dayCount, setDayCount] = useState<{ [key: string]: number }>({
    Sunday: 0,
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
  });
  const editorMetrics: { [key: string]: DraftData } = getCache('editorMetrics') || {};


  useEffect(() => {
  
    if (!editorMetrics) return;
  
    try {
      const analytics = calculateAnalytics(drafts);
      setPeakUsageDataUpdated(analytics.peakUsageNotesUpdated || {});
      setPeakUsageDataCreated(analytics.peakUsageNotesCreated || {});
      setDayCount(analytics.dayCount || {});
  
      // Process time series and distribution data
      const processedTimeData = processTimeSeriesData(drafts);
      const processedDayDist = processDayDistribution(drafts);
      
      setTimeSeriesData(processedTimeData);
      setDayDistribution(processedDayDist);
    } catch (error) {
      console.error('Error calculating analytics:', error);
    }
  }, []);



const processTimeSeriesData = (drafts: { [key: string]: DraftData }): TimeSeriesData[] => {
  const timePoints: TimeSeriesData[] = [];
  const sortedDrafts = Object.entries(drafts)
    .sort(([aKey], [bKey]) => parseInt(aKey) - parseInt(bKey));

  sortedDrafts.forEach(([timestamp, draft]) => {
    // Convert timestamp to a number if it's a string
    const parsedTimestamp = typeof timestamp === 'string' ? parseInt(timestamp) : timestamp;

    // Use default values if fields are missing or zero
    const totalWords = draft.totalWords || 0;
    const totalSessionTime = draft.totalSessionTime || 1; // Avoid division by zero
    const totalFocusTime = draft.totalFocusTime || 0;

    // Calculate WPM and focusScore
    const wpm = Math.round((totalWords / (totalSessionTime / 60000))); // WPM calculation
    const focusScore = Math.round((totalFocusTime / totalSessionTime) * 100); // Focus score calculation

    // Add data point
    timePoints.push({
      time: new Date(parsedTimestamp).toLocaleTimeString(),
      wpm,
      focusScore,
    });
  });

  return timePoints;
};

  const processDayDistribution = (drafts: { [key: string]: DraftData }) => {
    const distribution: { [key: string]: number } = {};
    
    Object.entries(drafts).forEach(([timestamp, draft]) => {
      const hour = new Date(parseInt(timestamp)).getHours();
      const timeSlot = `${hour}:00`;
      distribution[timeSlot] = (distribution[timeSlot] || 0) + 1;
    });

    return distribution;
  };

  useEffect(() => {
    const drafts: { [key: string]: DraftData } = getCache('storyDrafts') || {};
    if (!drafts) return;

    try {
      const analytics = calculateAnalytics(drafts);
      setPeakUsageDataUpdated(analytics.peakUsageNotesUpdated || {});
      setPeakUsageDataCreated(analytics.peakUsageNotesCreated || {});
      setDayCount(analytics.dayCount || {});

      // Process time series and distribution data
      const processedTimeData = processTimeSeriesData(drafts);
      const processedDayDist = processDayDistribution(drafts);
      
      setTimeSeriesData(processedTimeData);
      setDayDistribution(processedDayDist);
    } catch (error) {
      console.error('Error calculating analytics:', error);
    }
  }, []);

  return (
    <div className="space-y-4">
      <MetricToggler 
        isCollapsed={isDashboardCollapsed}
        onToggle={() => setIsDashboardCollapsed(!isDashboardCollapsed)}
      />

      {!isDashboardCollapsed && (
        <div className="grid grid-cols-1 gap-6">
          <WritingAnalytics editorMetrics={editorMetrics} />;
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UsageMetrics
              peakUsageData={peakUsageDataCreated}
              title="Notes Created"
              barColor="rgba(70, 230, 2, 0.6)"
            />
            
            <UsageMetrics
              peakUsageData={peakUsageDataUpdated}
              title="Notes Updated"
              barColor="rgba(13, 24, 233, 0.6)"
            />
            
            <ProductiveDaysCard dayCount={dayCount} />
          </div>
        </div>
      )}
    </div>
  );
};