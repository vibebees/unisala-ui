import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import { useAstroQuery } from "@/datasource/apollo-client";
import { ScholarshipV2 } from "@/datasource/graphql/uni";
import { UNIVERSITY_SERVICE_GQL } from "@/datasource/servers/types";
import ScholarshipCard from "./ScholarShipCard";
import Spinner from "../ui/Spinner";
import clsx from "clsx";
import { SearchIcon } from "lucide-react";

export interface FilterState {
  gpa: string;
  sat: string;
  act: string;
  amount: string;
  level: string;
  major: string;
}

export const initialState: FilterState = {
  gpa: "",
  sat: "",
  act: "",
  amount: "",
  level: "",
  major: "",
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
            data?.searchScholarshipV2.map((scholarship: any, index: any) => (
              <ScholarshipCard key={index} scholarship={scholarship} />
            ))}
        </div>

        {data?.searchScholarshipV2.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full">
            <div
              className={` transform transition-transform duration-500 ${
                data?.searchScholarshipV2.length === 0 ? "scale-100" : "scale-0"
              }`}
            >
              <SearchIcon size={35} className="text-gray-500 animate-pulse" />
            </div>
            <h2 className="text-xl  mt-2 font-bold text-gray-700 dark:text-neutral-300 mb-2">
              No Scholarships Found
            </h2>
            <p className="text-gray-500 text-lg mb-6 dark:text-neutral-400">
              Try adjusting your search filters.
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
            <br />
            <br />
            <br />
            <br />
          </div>
        )}
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
