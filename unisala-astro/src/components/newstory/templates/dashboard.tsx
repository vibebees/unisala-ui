import React, { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import PeakUsageBarChart from "../../dashboard/peakUsageChart";
import { ProductiveDays } from "../../dashboard/weekly/productiveDays";
import Icon from "../atoms/icon";
import { ChevronDown, ChevronUp } from "lucide-react";
import { getCache } from "@/utils/cache";
import { calculateAnalytics } from "@/components/dashboard/analytics";
import { Button } from "@/components/ui/button";

ChartJS.register(
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

interface Insights {
  totalNotes: number;
  productiveHours: string;
  focusTopics: string[];
}

interface InsightsCardProps {
  insights: Insights;
}
interface DashboardMetricsProps {
  isDashboardCollapsed: boolean;
  setIsDashboardCollapsed: (isCollapsed: boolean) => void;
}

const DashboardMetrics: React.FC<DashboardMetricsProps> = ({
  isDashboardCollapsed,
  setIsDashboardCollapsed,
}) => {
 const [stats, setStats] = useState([
    { title: "Typing Speed", value: "52 WPM", subtitle: "Keep up the great work!" },
    { title: "Note Streak", value: "0 Days", subtitle: "Your best streak yet!" },
    { title: "Weekly Notes", value: "0" },
    { title: "Average Notes Per Week", value: "0", subtitle: "Consistent Progress!" },
  ]);

  const [peakUsageDataUpdated, setPeakUsageDataUpdated] = useState<{ [key: string]: number }>({});
  const [peakUsageDataCreated, setPeakUsageDataCreated] = useState<{ [key: string]: number }>({});
  const [showUpdated, setShowUpdated] = useState<boolean>(true); // Default to show "updated"
  const [dayCount, setDayCount] = useState<{ [key: string]: number }>({
    Sunday: 0,
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
  });
   const toggleUsageData = () => {
    setShowUpdated(prevState => !prevState); // Toggle between "updated" and "created"
  };
  const [mostActiveDay, setMostActiveDay] = useState<string>(""); // Store the most active day


  useEffect(() => {
    const drafts: { [key: string]: { createdAt: number; postText: string; updatedAt: number } } = getCache('storyDrafts') || {}; // Fetch the drafts from cache or any data source

    const {
      streak,
      weeklyNotes, avgNotesPerWeek, peakUsageNotesUpdated, peakUsageNotesCreated,
      mostActiveDay, dayCount

    } = calculateAnalytics(drafts);
     // Update the state with the calculated analytics values
    setStats(() => [
      { title: "Typing Speed", value: "52 WPM", subtitle: "Keep up the great work!" },
      { title: "Note Streak", value: `${streak || 0} Days`, subtitle: "Your best streak yet!" },
      { title: "Weekly Notes", value: `${weeklyNotes || 0}` },
      { title: "Average Notes Per Week", value: `${(avgNotesPerWeek ?? 0).toFixed(1)}`, subtitle: "Consistent Progress!" }
    ]);


    setPeakUsageDataUpdated(peakUsageNotesUpdated || {});
    setPeakUsageDataCreated(peakUsageNotesCreated || {});
     setMostActiveDay(mostActiveDay && Array.isArray(mostActiveDay) ? mostActiveDay[0] || "" : mostActiveDay || "");
     if (dayCount) {
       setDayCount(dayCount);
     }

  }, []); // Empty dependency array to run on mount

  const barChartData = {
    labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    datasets: [
      {
        label: "Notes Taken",
        data: [
          dayCount["Sunday"],
          dayCount["Monday"],
          dayCount["Tuesday"],
          dayCount["Wednesday"],
          dayCount["Thursday"],
          dayCount["Friday"],
          dayCount["Saturday"],
        ],
        backgroundColor: [
          mostActiveDay === "Sunday" ? "rgba(255, 99, 132, 0.6)" : "rgba(75, 192, 192, 0.6)",
          mostActiveDay === "Monday" ? "rgba(255, 99, 132, 0.6)" : "rgba(75, 192, 192, 0.6)",
          mostActiveDay === "Tuesday" ? "rgba(255, 99, 132, 0.6)" : "rgba(75, 192, 192, 0.6)",
          mostActiveDay === "Wednesday" ? "rgba(255, 99, 132, 0.6)" : "rgba(75, 192, 192, 0.6)",
          mostActiveDay === "Thursday" ? "rgba(255, 99, 132, 0.6)" : "rgba(75, 192, 192, 0.6)",
          mostActiveDay === "Friday" ? "rgba(255, 99, 132, 0.6)" : "rgba(75, 192, 192, 0.6)",
          mostActiveDay === "Saturday" ? "rgba(255, 99, 132, 0.6)" : "rgba(75, 192, 192, 0.6)",
        ],
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
  const lineChartData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Typing Speed (WPM)",
        data: [48, 50, 52, 54],
        borderColor: "rgba(255, 99, 132, 0.8)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
    ],
  };

  const conceptMasteryData = {
    labels: ["React", "GraphQL", "Data Structures", "System Design", "CSS"],
    datasets: [
      {
        label: "Concept Frequency",
        data: [15, 12, 10, 8, 7],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  const learningTimelineData = [
    { milestone: "Started Learning React", date: "2023-01-10" },
    { milestone: "Completed GraphQL Basics", date: "2023-03-15" },
    { milestone: "Mastered System Design Patterns", date: "2023-06-01" },
  ];

  const leaderboardDataSpeed = [
    { user: "Alice", value: 72 },
    { user: "Bob", value: 68 },
    { user: "Charlie", value: 64 },
  ];

  const leaderboardDataNotes = [
    { user: "Daisy", value: 15 },
    { user: "Eve", value: 12 },
    { user: "Frank", value: 10 },
  ];

  const achievementBadges = [
    { title: "Typing Pro", description: "Achieved 50+ WPM consistently." },
    { title: "Note Master", description: "Created 50+ notes in a month." },
    { title: "Concept Guru", description: "Mastered 5 topics this year." },
  ];

  const suggestions = [
    "Learn about GraphQL Queries",
    "Improve your React Hooks usage",
    "Explore Data Visualization techniques",
  ];

  return (
    <div>
      <Button
        onClick={() => setIsDashboardCollapsed(!isDashboardCollapsed)} // Toggle collapse state
        className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-2 py-1 rounded-md mb-4 inline-block"  >
        {isDashboardCollapsed ? (
          <Icon icon={ChevronDown} className="w-4 h-4 inline-block" />
        ) : (
          <Icon icon={ChevronUp} className="w-4 h-4 inline-block" />
        )}{' '}
        Metrics
      </Button>
      {!isDashboardCollapsed && (
        <div>
          {/* Your existing DashboardMetrics content */}
          <PeakUsageBarChart hoursCount={peakUsageDataCreated} title="Notes Created" barColor="rgba(70, 230, 2, 0.6)" />
          <PeakUsageBarChart hoursCount={peakUsageDataUpdated} title="Notes Updated" barColor="rgba(13, 24, 233, 0.6)" />
          <ProductiveDays
            dayCount={dayCount}
            title="Weekly Notes Activity with Targets"
            lineColor="rgb(0, 239, 56)"
            fillColor="rgba(9, 200, 79, 0.2)"
            horizontalLines={[5, 3, 2]}
          />
        </div>
      )}
    </div>
  );
};
export default DashboardMetrics;