// src/components/templates/dashboardMetrics.tsx
import React, { useEffect, useState } from "react";
 
import { getCache } from "@/utils/cache";
import { MetricToggler } from "../molecules/metricToggler";
import { UsageMetrics } from "../organism/usageMetrics";
import { ProductiveDaysCard } from "../organism/productiveDaysCard";
import { calculateAnalytics } from "../analytics";

export const DashboardMetrics: React.FC = () => {
  const [isDashboardCollapsed, setIsDashboardCollapsed] = useState(true);
  const [peakUsageDataUpdated, setPeakUsageDataUpdated] = useState<{ [key: string]: number }>({});
  const [peakUsageDataCreated, setPeakUsageDataCreated] = useState<{ [key: string]: number }>({});
  const [dayCount, setDayCount] = useState<{ [key: string]: number }>({
    Sunday: 0,
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
  });

  useEffect(() => {
    const drafts: { [key: string]: { createdAt: string; postText: string; updatedAt: string } } = getCache('storyDrafts') || {};
    if (!drafts) return;

    try {
      const analytics = calculateAnalytics(drafts);
      if (analytics.peakUsageNotesUpdated) {
        setPeakUsageDataUpdated(analytics.peakUsageNotesUpdated);
      }
      if (analytics.peakUsageNotesCreated) {
        setPeakUsageDataCreated(analytics.peakUsageNotesCreated);
      }
      if (analytics.dayCount) {
        setDayCount(analytics.dayCount);
      }
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
      )}
    </div>
  );
};