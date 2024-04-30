import React from "react";
import { Link } from "react-router-dom";

export const UniversityResults = ({ universities, loading }) => {
  return (
    <div>
      <h3 style={{ color: "#4d4d4d" }}>Universities</h3>
      <div>
        {universities?.length > 0 &&
          universities?.map((data, index) => <UniversityCard />)}
      </div>
    </div>
  );
};

const UniversityCard = ({ name }) => {
  return (
    <div>
      <h3>University Card</h3>
    </div>
  );
};
