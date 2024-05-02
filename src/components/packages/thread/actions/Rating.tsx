import React from "react"
import CircleRating from "../../circleRating"

const Rating = ({ label, rating = null }: { label: string, rating?: number | null }) => {
  if (!rating) return null
  return (
    <div className="flex justify-between   items-center">
      <p className="text-blue-500 max-md:text-xs">{label} </p>
      <div className="w-7 h-7 relative">
        <CircleRating rating={rating} />
      </div>
    </div>
  )
}

export default Rating
