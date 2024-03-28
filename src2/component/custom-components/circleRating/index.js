import React from "react"

const CircleRating = ({ rating }) => {
  const percentage = (rating / 5) * 100

  return (
    <>
      <svg className="absolute" viewBox="0 0 36 36" width="100%" height="100%">
        <circle
          className="progress-ring__circle-background"
          stroke="#e0e0e0"
          strokeWidth="4"
          fill="transparent"
          r="15.91549430918954"
          cx="18"
          cy="18"
        />
      </svg>

      {/* Progress Bar */}
      <svg className="absolute" viewBox="0 0 36 36" width="100%" height="100%">
        <circle
          className="progress-ring__circle"
          stroke="#4285f4"
          strokeWidth="4"
          fill="transparent"
          r="15.91549430918954"
          cx="18"
          cy="18"
          strokeDasharray={`${percentage}, 100`}
        />
      </svg>

      <span className="absolute max-md:text-[9px] flex items-center justify-center w-full h-full text-[11px] font-bold">
        {rating.toFixed(1)}
      </span>
    </>
  )
}

export default CircleRating
