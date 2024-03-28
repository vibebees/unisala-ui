import { useMutation } from "@apollo/client"
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonModal,
  IonTitle,
  IonToolbar,
  useIonToast,
  IonSpinner
} from "@ionic/react"
import {
  AddEducation,
  EditEducation,
  getUserGql
} from "@graphql/user"
import { USER_SERVICE_GQL } from "servers/types"

const EducationPop = ({
  isOpen,
  setIsOpen,
  setInput,
  isEdit,
  input,
  username
}) => {
  const [executeMutation, { loading }] = useMutation(
    isEdit ? EditEducation : AddEducation,
    {
      context: { server: USER_SERVICE_GQL },
      update: (cache, { data }) => {
        const { getUser } = cache.readQuery({
          query: getUserGql,
          variables: { username }
        })
        cache.writeQuery({
          query: getUserGql,
          variables: { username },
          data: {
            getUser: {
              ...getUser,
              user: {
                ...getUser.user,
                education:
                  data?.addEducation?.education ||
                  data?.editEducation?.education
              }
            }
          }
        })
      },
      onCompleted: () => {
        present({
          duration: 3000,
          message: isEdit ? "Education Edited" : "Education Added",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios"
        })
        setIsOpen(false)
      },
      onError: (error) => {
        present({
          duration: 3000,
          message: error.message,
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "danger",
          mode: "ios"
        })
      }
    }
  )
  const [present, dismiss] = useIonToast()
  const handelChange = (e) => {
    setInput((pree) => {
      return { ...pree, [e.target.name]: e.target.value }
    })
  }
  const handelSubmit = (e) => {
    e.preventDefault()
    if (input.school.length < 3) {
      return present({
        duration: 3000,
        message: "School name can't be empty",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "primary",
        mode: "ios"
      })
    }
    if (input.startDate < 4 || input.graduationDate < 4) {
      return present({
        duration: 3000,
        message: "Dates can't be empty",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "primary",
        mode: "ios"
      })
    }
    executeMutation({
      variables: {
        id: input?._id,
        school: input?.school,
        degree: input?.degree,
        major: input?.major,
        startDate: input?.startDate,
        graduationDate: input?.graduationDate
      }
    })
  }

  return (
    <IonModal
      onDidDismiss={() => {
        setIsOpen(false)
      }}
      isOpen={isOpen}
      mode="ios"
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit Education</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding modal-content">
        <form onSubmit={handelSubmit}>
          <div className="mb-1">
            <h5>School</h5>
            <IonInput
              mode="md"
              className="input-box"
              name="school"
              onIonChange={handelChange}
              placeholder="School"
              value={input?.school}
            ></IonInput>
          </div>
          <div className="mb-1">
            <h5>Degree</h5>
            <IonInput
              mode="md"
              className="input-box"
              name="degree"
              onIonChange={handelChange}
              placeholder="Degree"
              value={input?.degree}
            ></IonInput>
          </div>
          <div className="mb-1">
            <h5>Major</h5>
            <IonInput
              mode="md"
              className="input-box"
              name="major"
              onIonChange={handelChange}
              placeholder="Major"
              value={input?.major}
            ></IonInput>
          </div>
          <div className="mb-1">
            <h5>Start Date</h5>
            <IonInput
              mode="md"
              className="input-box input-box ion-padding-end"
              name="startDate"
              type="date"
              onIonChange={handelChange}
              placeholder="Start Date"
              value={input?.startDate}
            ></IonInput>
          </div>
          <div className="mb-1">
            <h5>Graduation Date</h5>
            <IonInput
              mode="md"
              className="input-box ion-padding-end"
              type="date"
              name="graduationDate"
              onIonChange={handelChange}
              placeholder="Graduation Date"
              value={input?.graduationDate}
            ></IonInput>
          </div>
          <IonButton type="submit" mode="ios" expand="block">
            {loading ? <IonSpinner /> : "Save Changes"}
          </IonButton>
        </form>
      </IonContent>
    </IonModal>
  )
}

export default EducationPop
