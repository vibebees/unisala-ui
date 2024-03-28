import React from "react"
import { IonCol } from "@ionic/react"
import Typography from "component/defaults/Typography"

const RankingCard = ({ item }) => {
  let src
  if (item.rank < 50) {
    src =
      " https://static.vecteezy.com/system/resources/previews/023/234/869/original/transparent-golden-cup-trophy-for-victory-win-at-contest-as-an-award-and-prize-for-achievement-png.png"
  } else {
    src = "https://pngimg.com/d/award_PNG44.png"
  }

  return (
    <IonCol className=" py-3 max-md:w-full  bg-neutral-100 px-0 shadow-md rounded-md flex justify-center flex-col items-center w-16 overflow-hidden  !shrink-0  ">
      <div className="w-full h-36 max-md:h-12 ">
        <img src={src} alt="" className="w-full h-full object-contain" />
      </div>

      <div>
        <Typography
          variant="h3"
          className="py-2 max-md:py-2 max-md:px-1 max-md:text-xs text-neutral-600 font-semibold text-center px-3"
        >
          {item.title}
        </Typography>

        <Typography className="text-center">
          Rank : <span className="text-blue-500 font-medium">{item.rank}</span>
        </Typography>
      </div>
    </IonCol>
  )
}

export default RankingCard
