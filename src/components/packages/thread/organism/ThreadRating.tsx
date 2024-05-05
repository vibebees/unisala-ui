import React from "react"
import { Rating } from "../actions"

const ThreadRating = ({
  admissionAndApplicationRating,
  financialAidAndScholarshipRating,
  academicProgramsAndDepartmentRating,
  studentLifeAndServiceRating,
  careerAndAlumniResourceRating
}: {
  admissionAndApplicationRating: number,
  financialAidAndScholarshipRating: number,
  academicProgramsAndDepartmentRating: number,
  studentLifeAndServiceRating: number,
  careerAndAlumniResourceRating: number
}) => {
  if (
    admissionAndApplicationRating ||
    financialAidAndScholarshipRating ||
    academicProgramsAndDepartmentRating ||
    studentLifeAndServiceRating ||
    careerAndAlumniResourceRating
  ) {
    return (
      <div className="flex flex-col mt-3">
        <h2 className="font-medium text-blue-800 text-base">Rating</h2>{" "}
        <section className="mt-1 w-[80%] flex flex-col gap-3">
          <Rating
            label="Admission & Application"
            rating={admissionAndApplicationRating}
            ratingKey ="admissionAndApplicationRating"
          />

          <Rating
            label="Financial Aid & Scholarships"
            rating={financialAidAndScholarshipRating}
            ratingKey={"financialAidAndScholarshipRating"}
          />

          <Rating
            label="Academic Programs & Department"
            rating={academicProgramsAndDepartmentRating}
            ratingKey={"academicProgramsAndDepartmentRating"}
          />

          <Rating
            label="Student Life & Services"
            rating={studentLifeAndServiceRating}
            ratingKey={"studentLifeAndServiceRating"}
          />

          <Rating
            label="Career & Alumni Resources"
            rating={careerAndAlumniResourceRating}
            ratingKey={"careerAndAlumniResourceRating"}
          />
        </section>
      </div>
    )
  }
  return null
}

export default ThreadRating
