import { Typography } from "@components/defaults";
import Slider from "@components/packages/Slider/Slider";
import SchoolCard from "@components/packages/UniCard/SchoolCard";
import React, { FC } from "react";
import { motion } from "framer-motion";

interface UniversityResultsProps {
  universities: any;
}

const UniversityResults: FC<UniversityResultsProps> = ({ universities }) => {
  if (!universities) return null;
  if (universities.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-5"
    >
      <Typography variant="h2" className="mb-2 font-medium text-neutral-600">
        Universities
      </Typography>
      <Slider CustomclassName="univeristy-slider">
        {universities?.length > 0 &&
          universities?.map((data: any, index: number) => (
            <SchoolCard
              name={data?.name || "University Name"}
              address=""
              key={index}
            />
          ))}
      </Slider>
    </motion.div>
  );
};

export default UniversityResults;
