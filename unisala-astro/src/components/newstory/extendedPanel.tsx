import React, { useEffect, useState } from "react";
import StatCard from "@/components/dashboard/statsCard";
import ChartCard from "@/components/dashboard/chartCard";
import SuggestionsList from "@/components/dashboard/suggestionsList";
import Leaderboard from "../dashboard/leaderBoard";
import AchievementBadge from "@/components/dashboard/achievementBadge";
import TimelineChart from "@/components/dashboard/timelineChart";
import KnowledgeGraph from "@/components/dashboard/knowledgeGraph"; // New Feature: Knowledge Growth Visualization


interface Insights {
  totalNotes: number;
  productiveHours: string;
  focusTopics: string[];
}

interface InsightsCardProps {
  insights: Insights;
}

const InsightsCard: React.FC<InsightsCardProps> = ({ insights }) => {
  return (
    <div className="p-4 border rounded-lg shadow-lg bg-white dark:bg-gray-800">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
        Weekly Insights
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        <strong>Total Notes:</strong> {insights.totalNotes}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        <strong>Most Productive Hours:</strong> {insights.productiveHours}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        <strong>Focus Topics:</strong> {insights.focusTopics.join(", ")}
      </p>
    </div>
  );
};



interface GoalsCardProps {
  goals: { title: string; progress: number }[];
}

const GoalsCard: React.FC<GoalsCardProps> = ({ goals }) => {
  return (
    <div className="p-4 border rounded-lg shadow-lg bg-white dark:bg-gray-800">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
        Your Goals
      </h3>
      <ul>
        {goals.map((goal, index) => (
          <li key={index} className="mb-4">
            <p className="text-sm text-gray-800 dark:text-white mb-1">{goal.title}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-blue-500 h-2.5 rounded-full"
                style={{ width: `${goal.progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {goal.progress}% Complete
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const RealTimeTyping: React.FC = () => {
  const [typingSpeed, setTypingSpeed] = useState(0); // WPM
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Simulate dynamic typing speed for demo purposes
    const interval = setInterval(() => {
      const speed = Math.floor(Math.random() * (80 - 40) + 40); // Random WPM
      setTypingSpeed(speed);
      setMessage(speed > 60 ? "Great job! Keep it up!" : "You can do better!");
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 border rounded-lg shadow-lg bg-white dark:bg-gray-800">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
        Real-Time Typing Feedback
      </h3>
      <p className="text-4xl font-bold text-blue-500">{typingSpeed} WPM</p>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{message}</p>
    </div>
  );
};



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

ChartJS.register(
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  const stats = [
    { title: "Typing Speed", value: "52 WPM", subtitle: "Keep up the great work!" },
    { title: "Note Streak", value: "14 Days", subtitle: "Your best streak yet!" },
    { title: "Weekly Notes", value: "5" },
    { title: "Average Notes Per Week", value: "3.5", subtitle: "Consistent Progress!" },
  ];

  const barChartData = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    datasets: [
      {
        label: "Notes Taken",
        data: [3, 5, 2, 6, 4, 7, 5],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderRadius: 4,
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
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Dashboard
      </h1>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            subtitle={stat.subtitle || undefined}
          />
        ))}
      </div>

      {/* Real-Time Typing Feedback */}
      <div className="mb-6">
        <RealTimeTyping />
      </div>

      {/* Personalized Goals Section */}
      <div className="mb-6">
        <GoalsCard
          goals={[
            { title: "Improve Typing Speed", progress: 70 },
            { title: "Write 10 Notes This Week", progress: 50 },
          ]}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard
          title="Weekly Notes Taken"
          type="bar"
          data={barChartData}
          options={{ responsive: true, plugins: { legend: { position: "top" } } }}
        />
        <ChartCard
          title="Typing Speed Progress"
          type="line"
          data={lineChartData}
          options={{ responsive: true, plugins: { legend: { position: "top" } } }}
        />
      </div>

      {/* Concept Mastery Section */}
      <div className="mt-6">
        <ChartCard
          title="Concept Mastery"
          type="pie"
          data={conceptMasteryData}
          options={{ responsive: true }}
        />
      </div>

      {/* Knowledge Growth Visualization */}
      <div className="mt-6">
        {/* <KnowledgeGraph /> */}
      </div>

      {/* Learning Timeline */}
      <div className="mt-6">
        <TimelineChart
          title="Learning Milestones"
          data={learningTimelineData}
        />
      </div>

      {/* Leaderboards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <Leaderboard
          title="Top Typing Speeds"
          data={leaderboardDataSpeed}
          metric="WPM"
        />
        <Leaderboard
          title="Top Note Takers"
          data={leaderboardDataNotes}
          metric="Notes"
        />
      </div>

      {/* Achievement Badges */}
      <div className="mt-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          Achievements
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievementBadges.map((badge, index) => (
            <AchievementBadge
              key={index}
              title={badge.title}
              description={badge.description}
              badges={[
                { label: "Note-Taking", color: "orange" },
                { label: "Consistent Effort", color: "blue" },
              ]}
            />
          ))}
        </div>
      </div>

      {/* Advanced Insights Section */}
      <div className="mt-6">
        <InsightsCard
          insights={{
            totalNotes: 150,
            productiveHours: "Mornings",
            focusTopics: ["React", "GraphQL"],
          }}
        />
      </div>

      {/* Suggestions Section */}
      <SuggestionsList suggestions={suggestions} />
    </div>
  );
};

export default Dashboard;
