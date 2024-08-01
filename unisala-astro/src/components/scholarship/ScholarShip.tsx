import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import { useAstroQuery } from "@/datasource/apollo-client";
import { ScholarshipV2 } from "@/datasource/graphql/uni";
import { UNIVERSITY_SERVICE_GQL } from "@/datasource/servers/types";
import ScholarshipCard from "./ScholarShipCard";
import Spinner from "../ui/Spinner";
import clsx from "clsx";

export interface FilterState {
  gpa: string;
  sat: string;
  act: string;
  amount: string;
  level: string;
}

export const initialState: FilterState = {
  gpa: "",
  sat: "",
  act: "",
  amount: "",
  level: "",
};

const ScholarShip = () => {
  const [filters, setFilters] = useState<FilterState>(initialState);
  const [variables, setVariables] = useState<any>({});
  const { data, loading, error } = useAstroQuery(ScholarshipV2, {
    context: { server: UNIVERSITY_SERVICE_GQL },
    fetchPolicy: "cache-and-network",
    variables: {
      ...variables,
    },
  });

  useEffect(() => {
    let newOjb: any = { ...filters };
    Object.keys(filters).forEach((key: any) => {
      if (!filters[key as keyof FilterState]) {
        delete newOjb[key];
      } else {
        if (filters[key as keyof FilterState].includes("-")) {
          const [min, max] = filters[key as keyof FilterState].split("-");
          newOjb[key] = { min: parseFloat(min), max: parseFloat(max) };
        } else {
          if (!isNaN(parseFloat(filters[key as keyof FilterState]))) {
            newOjb[key] = {
              value: parseFloat(filters[key as keyof FilterState]),
            };
          }
        }
      }
    });

    setVariables(newOjb);
  }, [filters]);

  return (
    <div>
      <div className="pb-8">
        <Filter filters={filters} setFilters={setFilters} />
      </div>

      <section className="">
        <div className="grid-container">
          {!loading &&
            !error &&
            data &&
            data?.searchScholarshipV2.length > 0 &&
            data?.searchScholarshipV2.map((scholarship: any, index) => (
              <ScholarshipCard key={index} scholarship={scholarship} />
            ))}
        </div>
        <div
          className={clsx(
            "flex w-full justify-center overflow-hidden transition-all duration-150 ease-linear",
            loading ? "h-10 " : "h-0"
          )}
        >
          <Spinner />
        </div>
        {!loading && error && (
          <div className="flex py-8 items-center flex-col border w-full">
            <p
              className="
              text-center  text-red-600
              "
            >
              There was an error fetching scholarships data. Please try again
            </p>
            <button
              className="
              text-center
              bg-neutral-500
              text-white
              px-3
              py-1 mt-5
              text-base
              rounded-md
              w-fit
              "
              onClick={() => setFilters(initialState)}
            >
              Reset Filters & Try Again
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default ScholarShip;
