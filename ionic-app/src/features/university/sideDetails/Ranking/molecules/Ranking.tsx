import React from "react"
import RankingCard from "../atoms/RankingCard"
import { IonCard } from "@ionic/react"

const Ranking = ({ data }) => {
  return (
    <IonCard className="flex gap-8 max-lg:gap-5 max-md:gap-2 max-[500px]:grid max-[500px]:grid-cols-1  max-lg:px-2 px-9 py-10 !flex-wrap  shadow-none">
      {data?.map((item, index) => {
        return <RankingCard key={index} item={item} />
      })}
    </IonCard>
  )
}

export default Ranking
