import React from "react"
import Ranking from "../molecules/Ranking"
import { useSelector } from "react-redux"
import { IonCard } from "@ionic/react"
import { CardHeader } from "../../../../../components/defaults"

const index = () => {
  const { uniData } = useSelector((store) => store?.university)
  const ranking = uniData?.userEvaluation?.rankings

  if (!ranking) return null

  return (
    <IonCard
      style={{
        margin: "10px 0px 0px 0px"
      }}
      className="flex flex-col"
    >
      <CardHeader header={"Ranking"} />

      <div>
        <Ranking data={ranking} />
      </div>
    </IonCard>
  )
}

export default index
