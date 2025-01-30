import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Icon from "../atoms/icon";
import Button from "../atoms/button";
import PeakUsageBarChart from "../../dashboard/peakUsageChart";
import { ProductiveDays } from "../../dashboard/weekly/productiveDays";
import { calculateAnalytics } from "../../dashboard/analytics";
import { getCache } from "@/utils/cache";

const DashboardMetrics: React.FC = () => {
  const [isDashboardCollapsed, setIsDashboardCollapsed] = useState(true); // State moved inside the component
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
    const drafts: { [key: string]: { createdAt: string; postText: string; updatedAt: string } } =
      getCache("storyDrafts") || {}; // Fetch the drafts from cache or any data source

    const { peakUsageNotesUpdated, peakUsageNotesCreated, dayCount } = calculateAnalytics(drafts);

    setPeakUsageDataUpdated(peakUsageNotesUpdated);
    setPeakUsageDataCreated(peakUsageNotesCreated);
    setDayCount(dayCount);
  }, []);

  return (
    <div>
      <Button
        onClick={() => setIsDashboardCollapsed(!isDashboardCollapsed)}
        className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-2 py-1 rounded-md mb-4"
      >
        {isDashboardCollapsed ? (
          <Icon icon={ChevronDown} className="w-4 h-4 inline-block" />
        ) : (
          <Icon icon={ChevronUp} className="w-4 h-4 inline-block" />
        )}{" "}
        Metrics
      </Button>
      {!isDashboardCollapsed && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
          <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
              Notes Created
            </h3>
            <PeakUsageBarChart
              hoursCount={peakUsageDataCreated}
              title="Notes Created"
              barColor="rgba(70, 230, 2, 0.6)"
            />
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
              Notes Updated
            </h3>
            <PeakUsageBarChart
              hoursCount={peakUsageDataUpdated}
              title="Notes Updated"
              barColor="rgba(13, 24, 233, 0.6)"
            />
          </div>
          <div className="col-span-2">
            <ProductiveDays
              dayCount={dayCount}
              title="Weekly Notes Activity with Targets"
              lineColor="rgb(0, 239, 56)"
              fillColor="rgba(9, 200, 79, 0.2)"
              horizontalLines={[5, 3, 2]} // Add horizontal bars at these Y-values
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardMetrics;