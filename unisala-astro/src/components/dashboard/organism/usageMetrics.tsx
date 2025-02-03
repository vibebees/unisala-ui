import { DataMessage } from "../atoms/dataMessage";
import { MetricCard } from "../molecules/metricCard";
import PeakUsageBarChart from "@/components/dashboard/peakUsageChart";

interface UsageMetricsProps {
  peakUsageData: { [key: string]: number };
  title: string;
  barColor: string;
}

export const UsageMetrics = ({
  peakUsageData,
  title,
  barColor
}: UsageMetricsProps) => (
  <MetricCard title={title}>
    {Object.keys(peakUsageData).length > 0 ? (
      <PeakUsageBarChart
        hoursCount={peakUsageData}
        title={title}
        barColor={barColor}
      />
    ) : (
      <DataMessage />
    )}
  </MetricCard>
);
