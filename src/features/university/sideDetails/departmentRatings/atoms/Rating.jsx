import { Typography } from "component/ui"
import { StarFilled } from "./StarFilled"
import { StarUnfilled } from "./StarUnfilled"

export const Rating = ({ rating }) => {
  return (
    <>
      <div className="flex space-x-1 justify-center items-center">
        {Array.from({ length: rating }).map((_, index) => (
          <StarFilled key={`starIcon-${index}`} />
        ))}

        {rating < 5 &&
          Array.from({ length: 5 - Math.floor(rating) }).map((_, index) => (
            <StarUnfilled key={`starIcon-${index}`} />
          ))}
      </div>
      <Typography variant="h5" className="text-center block pt-2">
        {rating} out of 5
      </Typography>

      <Typography
        variant="h5"
        className="text-center py-1 rounded-sm mx-auto space-y-1 bg-[#eee]"
      >
        100 students ratings
      </Typography>
    </>
  )
}

