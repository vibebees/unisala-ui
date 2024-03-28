import { useState } from "react"
import { eyeOff, create, eye } from "ionicons/icons"
import {
  IonCard,
  IonCardContent,
  IonIcon,
  IonButton,
  IonButtons,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonTextarea,
  useIonToast,
  IonSpinner
} from "@ionic/react"
import { useMutation } from "@apollo/client"
import { EditAbout, ToggleView, getUserGql } from "@graphql/user"
import { USER_SERVICE_GQL } from "servers/types"

function AboutUser({ about, myProfile, username }) {
  const [isOpen, setIsOpen] = useState(false)

  const [input, setInput] = useState({
    text: about?.text
  })
  const [editAbout, { loading }] = useMutation(EditAbout, {
    context: { server: USER_SERVICE_GQL },
    variables: { about: input.text },
    update: (cache, { data: { editAbout } }) => {
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
              about: {
                ...getUser.user.about,
                text: editAbout.about.text
              }
            }
          }
        }
      })
    },
    onCompleted: (data) => {
      if (data?.editAbout.status.success) {
        present({
          duration: 3000,
          message: data.editAbout.status.message,
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios"
        })
        setIsOpen(false)
      }
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
  })

  const [toggleView] = useMutation(ToggleView, {
    context: { server: USER_SERVICE_GQL },
    variables: { card: "about" },
    update: (cache, { data: { toggleView } }) => {
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
              about: {
                ...getUser.user.about,
                private: toggleView.private
              }
            }
          }
        }
      })
    },
    onCompleted: (data) => {
      if (data.toggleView.status.success) {
        present({
          duration: 3000,
          message: about.private ? "View made public" : "View made private",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios"
        })
      }
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
  })

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const [present, dismiss] = useIonToast()

  const handleSubmit = (e) => {
    e.preventDefault()
    editAbout()
  }

  return (
    <>
      <IonCard className="mb-2 max-md:mx-1">
        <IonCardContent className="card-bb flex">
          <h1>About</h1>
          {myProfile && (
            <div className="inline-flex">
              <IonIcon
                className="grey-icon-32 mr-1"
                icon={about.private ? eyeOff : eye}
                onClick={() => {
                  toggleView()
                }}
              />
              <IonIcon
                className="grey-icon-32 mr-1"
                icon={create}
                onClick={() => setIsOpen(true)}
              />
            </div>
          )}
        </IonCardContent>

        {myProfile && !about?.text ? (
          <IonCardContent className="center-text">
            <p>Share something about yourself</p>
            <IonButton
              color="primary"
              mode="ios"
              className="icon-text "
              onClick={() => setIsOpen(true)}
            >
              Add About
            </IonButton>
          </IonCardContent>
        ) : (
          <IonCardContent>
            <p style={{ fontSize: "1.15rem" }}>{about?.text}</p>
          </IonCardContent>
        )}
      </IonCard>

      <IonModal
        onDidDismiss={() => setIsOpen(false)}
        isOpen={isOpen}
        mode="ios"
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>Edit About</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding modal-content">
          <form onSubmit={handleSubmit}>
            <div className="mb-1">
              <h5>Share something about yourself</h5>
              <IonTextarea
                rows={6}
                cols={20}
                name="text"
                value={input.text}
                onIonChange={handleChange}
                mode="md"
                className="input-box mt-05"
                placeholder="Share more about who you are with the community on Unisala."
              ></IonTextarea>
            </div>

            <IonButton type="submit" mode="ios" expand="block">
              {loading ? <IonSpinner /> : "Save Changes"}
            </IonButton>
          </form>
        </IonContent>
      </IonModal>
    </>
  )
}

export default AboutUser
