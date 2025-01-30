import React from "react"
import ListValueItems from "../../../../components/packages/reusable/listValueItem"
import { IonList } from "@ionic/react"
import { useSelector } from "react-redux"

const ModalData = () => {
  const { uniData } = useSelector((store) => store?.university)
  const data = uniData?.admissionInfo
  return (
    <div>
      <IonList>
        <ListValueItems
          label={"Admission Test Score"}
          value={data?.admissionTestScores}
        />
        <ListValueItems
          label={"college pre program"}
          value={data?.collegePrepProgram}
        />
        <ListValueItems
          label={"Open Admission policy"}
          value={data?.openAdmissionPolicy}
        />
        <ListValueItems label={"Competencies"} value={data?.competencies} />
        <ListValueItems
          label={"Recommendations"}
          value={data?.recommendations}
        />
        <ListValueItems label={"School Record"} value={data?.schoolRecord} />
        <ListValueItems
          label={"Secondary School Rank"}
          value={data?.secondarySchoolRank}
        />
        <ListValueItems label={"Tofel"} value={data?.toefl} />
      </IonList>
    </div>
  )
}

export default ModalData
