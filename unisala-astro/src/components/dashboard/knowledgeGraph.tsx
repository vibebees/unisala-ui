import React from "react";
import ForceGraph2D from "react-force-graph-2d";

const KnowledgeGraph: React.FC = () => {
  // Sample graph data
  const data = {
    nodes: [
      { id: "React", group: 1 },
      { id: "JavaScript", group: 1 },
      { id: "GraphQL", group: 2 },
      { id: "Node.js", group: 2 },
      { id: "CSS", group: 3 },
      { id: "HTML", group: 3 },
      { id: "System Design", group: 4 },
    ],
    links: [
      { source: "React", target: "JavaScript" },
      { source: "GraphQL", target: "JavaScript" },
      { source: "Node.js", target: "GraphQL" },
      { source: "CSS", target: "HTML" },
      { source: "JavaScript", target: "System Design" },
    ],
  };

  return (
    <div className="p-4 border rounded-lg shadow-lg bg-white dark:bg-gray-800">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
        Knowledge Graph
      </h3>
      <ForceGraph2D
          graphData={data}
          nodeAutoColorBy="group"
          nodeLabel="id"
          linkDirectionalParticles={2}
          linkDirectionalParticleSpeed={() => 0.02}
          backgroundColor="#f9fafb"
        />
    </div>
  );
};

export default KnowledgeGraph;
