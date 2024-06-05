import React from "react";
import { Rating } from "../actions";

const ThreadRating = ({
  admissionAndApplicationRating,
  financialAidAndScholarshipRating,
  academicProgramsAndDepartmentRating,
  studentLifeAndServiceRating,
  careerAndAlumniResourceRating,
}: {
  admissionAndApplicationRating: number | null | undefined;
  financialAidAndScholarshipRating: number | null | undefined;
  academicProgramsAndDepartmentRating: number | null | undefined;
  studentLifeAndServiceRating: number | null | undefined;
  careerAndAlumniResourceRating: number | null | undefined;
}) => {
  const ratings = [
    {
      label: "Admission & Application",
      rating: admissionAndApplicationRating,
      ratingKey: "admissionAndApplicationRating",
    },
    {
      label: "Financial Aid & Scholarships",
      rating: financialAidAndScholarshipRating,
      ratingKey: "financialAidAndScholarshipRating",
    },
    {
      label: "Academic Programs & Department",
      rating: academicProgramsAndDepartmentRating,
      ratingKey: "academicProgramsAndDepartmentRating",
    },
    {
      label: "Student Life & Services",
      rating: studentLifeAndServiceRating,
      ratingKey: "studentLifeAndServiceRating",
    },
    {
      label: "Career & Alumni Resources",
      rating: careerAndAlumniResourceRating,
      ratingKey: "careerAndAlumniResourceRating",
    },
  ];

  if (
    admissionAndApplicationRating ||
    financialAidAndScholarshipRating ||
    academicProgramsAndDepartmentRating ||
    studentLifeAndServiceRating ||
    careerAndAlumniResourceRating
  ) {
    return (
      <>
        <div className="flex flex-col mt-3">
          <h2 className="font-medium text-blue-800 text-base text-center">
            🌟 Ratings 🌟{" "}
          </h2>
          <section className="mt-5 w-full">
            {ratings.map((item, index) => (
              <Rating
                key={index}
                label={item.label}
                rating={item.rating}
                ratingKey={item.ratingKey}
              />
            ))}
          </section>
        </div>
      </>
    );
  }
  return null;
};

export default ThreadRating;
