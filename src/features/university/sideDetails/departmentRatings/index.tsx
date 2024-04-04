import { IonCardContent } from "@ionic/react"
 import { Button, Card, Typography, CardHeader } from "../../../../components/defaults"
import { useRef, useState } from "react"
import { Rating } from "./atoms/Rating"
import { Search } from "./atoms/Search"

export const DepartmentRating = ({ ratings }) => {
  const [ratingItems, setRatingItems] = useState(ratings.slice(0, 9))
  const inputRef = useRef()
  const handleDepartmentChange = () => {
    setRatingItems(() => ratings.slice(0, ratingItems.length + 5))
  }

  const setSearch = () => {
    if (inputRef?.current?.value) {
      const regex = new RegExp(inputRef.current.value, "i")
      const findDepartment = ratingItems.filter((item) =>
        regex.test(item.subject)
      )
      setRatingItems(findDepartment)
    }
  }

  const resetSearch = () => {
    inputRef.current.value = null
    setRatingItems(ratings.slice(0, 9))
  }

  return (
    <Card className="department mx-0  max-h-[600px] overflow-y-scroll">
      <CardHeader header={"Department Rating"} />

      <IonCardContent>
        <Search
          inputRef={inputRef}
          setSearch={setSearch}
          resetSearch={resetSearch}
        />
        <div className="grid grid-cols-1 md:grid-cols-3">
          {ratingItems.map((item, index) => (
            <Card key={index} className="py-4">
              <Typography variant="h5" className="text-center">
                {item.subject}
              </Typography>

              <IonCardContent>
                <Rating rating={item.overall_rating} />
              </IonCardContent>
            </Card>
          ))}
        </div>
        <Button
          type="button"
          fill="outline"
          size="small"
          className="p-0 outline-none border-none ml-auto block"
          onClick={handleDepartmentChange}
        >
          See more
        </Button>
      </IonCardContent>
    </Card>
  )
}

