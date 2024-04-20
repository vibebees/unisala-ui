import { useMutation } from "@apollo/client"
import { IonCol, IonInput, IonRow, useIonToast } from "@ionic/react"
 import { EditHistory, GetAllHistory } from "../../../../datasource/graphql/user"
import { useContext, useState } from "react"
import { USER_SERVICE_GQL } from "../../../../datasource/servers/types"
import {EditIcon, CloseIcon, Tick} from "../../../../components/packages/icons"
 import {Button} from "../../../../components/defaults"
import { OrgContext } from "@features/org"

const EditHistoryForm = ({ text, edit, setedit, orgHistoryId, date }) => {
  const { orgData } = useContext(OrgContext)
  const [value, setvalue] = useState(text)
  const [present, dismiss] = useIonToast()

  const [updateHistory] = useMutation(EditHistory, {
    context: { server: USER_SERVICE_GQL },

    update: (cache, { data }) => {
      const getAllHistories = cache.readQuery({
        query: GetAllHistory,
        variables: {
          orgId: orgData._id,
          year: new Date(date).getFullYear()
        }
      })

      console.log("getAllHistories", getAllHistories)
    },

    onCompleted: () => {
      present({
        duration: 300,
        message: "Edited successfully",
        buttons: [
          {
            text: "X",
            handler: () => dismiss()
          }
        ],
        color: "primary",
        mode: "ios"
      })
      setedit(false)
    }
  })

  const handleUpdate = () => {
    if (value.trim() === "") {
      return present({
        duration: 300,
        message: "Please fill all the fields",
        buttons: [
          {
            text: "X",
            handler: () => dismiss()
          }
        ],
        color: "danger",
        mode: "ios"
      })
    }
    updateHistory({
      variables: {
        orgHistoryId: orgHistoryId,
        title: value,
        description: value
      }
    })
  }

  return (
    <IonRow className="ion-no-padding ion-no-margin w-full">
      <IonCol className="ion-no-padding ion-no-margin">
        <IonInput
          className="text-sm opacity-70 ion-no-padding !pl-2 ion-no-margin w-full h-full"
          placeholder="Edit History"
          value={value}
          onIonChange={(e) => setvalue(e.target.value)}
        ></IonInput>
      </IonCol>
      <IonCol size="auto" className="h-full">
        <Button fill="clear" onClick={() => setedit(!edit)} className="">
          {edit ? (
            <CloseIcon width={20} height={20} />
          ) : (
            <EditIcon width={20} height={20} />
          )}
        </Button>
        {edit && (
          <Button fill="clear" className="" onClick={handleUpdate}>
            <Tick width={20} height={20} />
          </Button>
        )}
      </IonCol>
    </IonRow>
  )
}

export default EditHistoryForm
