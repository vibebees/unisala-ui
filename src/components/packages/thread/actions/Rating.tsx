import React from "react";
import CircleRating from "../../circleRating";
import { DocumentIcon } from "@components/packages/icons/document";
import { MoneyIcon } from "@components/packages/icons/money";
import { UniversityIcon } from "@components/packages/icons/university";
import { CallIcon } from "@components/packages/icons/call";
import { GraduatesIcon } from "@components/packages/icons";

const Rating = ({ label, rating, ratingKey }: { label: string, ratingKey: string, rating?: number | null }) => {
  if (!rating) return null;

  const icons = {
    financialAidAndScholarshipRating: <MoneyIcon />,
    admissionAndApplicationRating: <DocumentIcon />,
    academicProgramsAndDepartmentRating: <UniversityIcon />, // Corrected the typo
    studentLifeAndServiceRating: <CallIcon />,
    careerAndAlumniResourceRating: <GraduatesIcon />
  };

  const selectedIcon = icons[ratingKey] || null; // Retrieve icon based on ratingKey or return null if key does not exist

  return (
    <div className="flex justify-between items-center">
      {selectedIcon}
      <p className="text-blue-500 max-md:text-xs">{label}</p>
      <div className="w-7 h-7 relative">
        <CircleRating rating={rating} />
      </div>
    </div>
  );
};

export default Rating;
