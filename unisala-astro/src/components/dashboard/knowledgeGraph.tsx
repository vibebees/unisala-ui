import { getCache } from "@/utils/cache";
import React, { useEffect, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";

export interface StoryDraft {
  postTitle: string;
  postText: string;
  createdAt: number;
  updatedAt: number;
}
const sortGroups = (grouped: { [key: string]: StoryDraft[] }) => {
  Object.keys(grouped).forEach((key) => {
    grouped[key].sort((a, b) => a.createdAt - b.createdAt);
  });
};

const groupByMonth = (drafts: StoryDraft[]) => {
  const grouped: { [key: string]: StoryDraft[] } = {};

  drafts.forEach((draft) => {
    const date = new Date(draft.createdAt);
    const month = date.getMonth() + 1; // Months are 0-indexed
    const year = date.getFullYear();
    const key = `${year}-M${month}`; // e.g., "2023-M10"

    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(draft);
  });

  return grouped;
};

const getWeekNumber = (date: Date) => {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - startOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
};

const groupByWeek = (drafts: StoryDraft[]) => {
  const grouped: { [key: string]: StoryDraft[] } = {};

  drafts.forEach((draft) => {
    const date = new Date(draft.createdAt);
    const week = getWeekNumber(date);
    const year = date.getFullYear();
    const key = `${year}-W${week}`; // e.g., "2023-W42"

    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(draft);
  });

  return grouped;
};

const transformDraftsToGraphData = (drafts: StoryDraft[], groupBy: "week" | "month") => {
  // Group drafts by week or month
  const grouped = groupBy === "week" ? groupByWeek(drafts) : groupByMonth(drafts);

  // Sort nodes within each group
  sortGroups(grouped);

  // Flatten grouped nodes into a single array
  const nodes: any[] = [];
  const links: any[] = [];
  let groupIndex = 0;

  Object.keys(grouped).forEach((key) => {
    const group = grouped[key];
    group.forEach((draft, index) => {
      nodes.push({
        id: draft.postTitle,
        group: groupIndex + 1,
        createdAt: draft.createdAt,
        postText: draft.postText,
      });

      // Link to the next node in the same group
      if (index < group.length - 1) {
        links.push({
          source: group[index].postTitle,
          target: group[index + 1].postTitle,
        });
      }
    });
    groupIndex++;
  });

  return { nodes, links };
};

const KnowledgeGraph: React.FC = () => {
  const [graphData, setGraphData] = useState<{ nodes: any[]; links: any[] }>({ nodes: [], links: [] });

  useEffect(() => {
    const storyDraftsObject = getCache("storyDrafts") || {};
    const storyDrafts: StoryDraft[] = Object.values(storyDraftsObject); // Convert object to array

    // Transform data (group by week or month)
    const transformedData = transformDraftsToGraphData(storyDrafts, "week"); // or "month"
    setGraphData(transformedData);
  }, []);

  return (
    <div className="p-4 border rounded-lg shadow-lg bg-white dark:bg-gray-800">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
        Knowledge Graph
      </h3>
      <div style={{ width: "100%", height: "500px" }}> {/* Fixed size container */}
        <ForceGraph2D
          graphData={graphData}
          nodeAutoColorBy="group"
          nodeLabel={(node) => `${node.id}\n${node.postText}`}
          linkDirectionalParticles={2}
          linkDirectionalParticleSpeed={() => 0.02}
          backgroundColor="#f9fafb"
          // Enforce left-to-right layout
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.id;
            const fontSize = 12 / globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(label, node.x, node.y);
          }}
        />
      </div>
    </div>
  );
};
export default KnowledgeGraph;