import React from "react";
import pkg from "lucide-react";

const { SlidersVerticalIcon } = pkg;

const Filter = () => {
  return (
    <div>
      <button
        title="filter scholarships"
        style={{
          marginRight: "10px",
          padding: "10px",
          border: "none",
          background: "#ebebeb",
          cursor: "pointer",
          borderRadius: "10px",
        }}
      >
        <SlidersVerticalIcon size={24} />
      </button>
    </div>
  );
};

export default Filter;
