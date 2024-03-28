import { useMutation } from "@apollo/client"
import { IonCol, IonInput, IonRow, useIonToast } from "@ionic/react"
import { OrgContext } from "features/org"
import { AddNewHistory } from "@graphql/user"
import moment from "moment"
import { useContext, useState } from "react"
import { USER_SERVICE_GQL } from "servers/types"
import SaveButton from "./SaveButton"

const AddHistory = ({ setData }) => {
  const { orgData } = useContext(OrgContext)
  const [present, dismiss] = useIonToast()
  const [data, setdata] = useState({
    date: Date.now(),
    description: ""
  })

  const [addHistoryMutation] = useMutation(AddNewHistory, {
    context: { server: USER_SERVICE_GQL },
    variables: {
      orgId: orgData._id,
      title: data.description,
      description: data.description,
      date: moment(data.date).format("YYYY-MM-DD")
    },

    onCompleted: () => {
      setdata({ date: Date.now(), description: "" })
      present({
        duration: 3000,
        message: "History added successfully",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "primary",
        mode: "ios"
      })
    }
  })
  return (
    <IonRow className="ion-no-padding h-11 ion-no-margin  mb-8 mt-4  justify-between rounded-md bg-neutral-200">
      <IonCol size="2" className="bg-white rounded-md pl-3 ">
        <IonInput
          className="w-full h-full ion-no-margin ion-no-padding pointer-events-none border-none"
          type="text"
          placeholder="Enter data"
          value={moment(data.date).format("YYYY-MM-DD")}
          onChange={(e) =>
            setdata((prev) => ({ ...prev, date: e.target.value }))
          }
        />
      </IonCol>
      <IonCol size="8" className="h-full pl-2 ion-no-margin ion-no-padding ">
        <IonInput
          autofocus
          className="w-full ion-no-padding h-full ion-no-margin  border-none "
          placeholder="Enter history description"
          value={data.description}
          onIonChange={(e) =>
            setdata((prev) => ({ ...prev, description: e.detail.value }))
          }
        />
      </IonCol>

      <IonCol size="auto" className="ion-no-margin ion-no-padding">
        <SaveButton label="Save" loading={false} onClick={addHistoryMutation} />
      </IonCol>
    </IonRow>
  )
}

export default AddHistory
