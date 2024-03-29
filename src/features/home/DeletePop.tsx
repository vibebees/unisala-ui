import { IonButton, IonPopover, IonText } from "@ionic/react"

export const DeletePop = ({
  setDelPop,
  delPop,
  HandleDelete,
  comment,
  index
}) => {
  return (
    <IonPopover
      className="post-popup ion-padding"
      onDidDismiss={() => setDelPop(false)}
      isOpen={delPop}
    >
      <div className="ion-padding">
        <IonText color="dark">
          <h3>Are you sure?</h3>
        </IonText>
        <IonText color="medium">
          <h6>You will not be able to recover this thread!</h6>
        </IonText>
        <br />
        <IonButton
          onClick={() => {
            HandleDelete(comment, index)
          }}
          style={{
            float: "right"
          }}
          slot="end"
          color="danger"
        >
          delete
        </IonButton>
        <IonButton
          onClick={() => {
            setDelPop(false)
          }}
          style={{
            float: "right"
          }}
          slot="end"
          color="medium"
        >
          cancel
        </IonButton>
      </div>
    </IonPopover>
  )
}
export default DeletePop
