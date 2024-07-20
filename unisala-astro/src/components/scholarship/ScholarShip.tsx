import React from "react";
import Filter from "./Filter";
import { useAstroQuery } from "@/datasource/apollo-client";
import { ScholarshipV2 } from "@/datasource/graphql/uni";
import { UNIVERSITY_SERVICE_GQL } from "@/datasource/servers/types";
import ScholarshipCard from "./ScholarShipCard";

const ScholarShip = () => {
  const { data, loading, error } = useAstroQuery(ScholarshipV2, {
    context: { server: UNIVERSITY_SERVICE_GQL },
    fetchPolicy: "cache-and-network",
    variables: {
      scholarshipType: "COMPETITIVE",
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message || "error message"}</div>;

  console.log("data from scholarship", data);
  return (
    <div>
      <Filter />
      <section className="">
        <div className="grid-container">
          {data &&
            data?.searchScholarshipV2.length > 0 &&
            data?.searchScholarshipV2.map((scholarship: any) => (
              <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
            ))}
        </div>
      </section>
    </div>
  );
};

export default ScholarShip;
