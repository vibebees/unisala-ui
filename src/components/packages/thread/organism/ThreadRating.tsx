import React from "react"
import { Rating } from "../actions"

const ThreadRating = ({
  admissionAndApplicationRating,
  financialAidAndScholarshipRating,
  academicProgramsAndDepartmentRatingm,
  studentLifeAndServiceRating,
  careerAndAlumniResourceRating
}: {
  admissionAndApplicationRating: number,
  financialAidAndScholarshipRating: number,
  academicProgramsAndDepartmentRatingm: number,
  studentLifeAndServiceRating: number,
  careerAndAlumniResourceRating: number
}) => {
  if (
    admissionAndApplicationRating ||
    financialAidAndScholarshipRating ||
    academicProgramsAndDepartmentRatingm ||
    studentLifeAndServiceRating ||
    careerAndAlumniResourceRating
  ) {
    return (
      <div className="flex flex-col mt-3">
        <h2 className="font-medium text-blue-800 text-base">Rating</h2>{" "}
        <section className="mt-1 w-[60%] flex flex-col gap-3">
          <Rating
            label="Admission & Application"
            rating={admissionAndApplicationRating}
          />

          <Rating
            label="Financial Aid & Scholarships"
            rating={financialAidAndScholarshipRating}
          />

          <Rating
            label="Academic Programs & Department"
            rating={academicProgramsAndDepartmentRatingm}
          />

          <Rating
            label="Student Life & Services"
            rating={studentLifeAndServiceRating}
          />

          <Rating
            label="Career & Alumni Resources"
            rating={careerAndAlumniResourceRating}
          />
        </section>
      </div>
    )
  }
  return null
}

export default ThreadRating
