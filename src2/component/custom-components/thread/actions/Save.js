import { IonIcon, IonButtons, useIonToast } from "@ionic/react"
import { bookmark } from "ionicons/icons"
import { useMutation } from "@apollo/client"
import { useSelector } from "react-redux"
import { USER_SERVICE_GQL } from "servers/types"
import { GetSavedList, SavePost, UnSavePost } from "@graphql/user"

function Save({ postId, saved, thread }) {
  const userId = useSelector((state) => state.userProfile.user._id)
  const [present, dismiss] = useIonToast()
  const [save] = useMutation(saved ? UnSavePost : SavePost, {
    variables: { postId },
    context: { server: USER_SERVICE_GQL },
    update: (cache, { data }) => {
      cache.modify({
        id: cache.identify({
          __typename: "Post",
          id: postId
        }),
        fields: {
          saved: () => data?.save?.message === "saved"
        }
      })
      if (data?.save?.message === "saved") {
        const data = cache.readQuery({
          query: GetSavedList,
          variables: { userId, page: 0 },
          context: { server: USER_SERVICE_GQL }
        })
        data &&
          cache.writeQuery({
            query: GetSavedList,
            variables: { userId, page: 0 },
            data: {
              ...data,
              savedList: {
                ...data.savedList,
                Posts: [{ ...thread, saved: true }, ...data.savedList.Posts]
              }
            }
          })
      }
    },
    onCompleted: () => {
      present({
        duration: 3000,
        message: saved ? "Unsaved" : "Saved",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "primary",
        mode: "ios"
      })
    },
    onError: (error) => {
      present({
        duration: 3000,
        message: error.message,
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "primary",
        mode: "ios"
      })
    }
  })

  return (
    <IonButtons
      className="post-button"
      onClick={save}
      style={{ cursor: "pointer" }}
    >
      <IonIcon
        color={saved ? "secondary" : "medium"}
        style={{
          margin: "0px"
        }}
        className="text-2xl max-md:text-lg"
        icon={bookmark}
      />
    </IonButtons>
  )
}

export default Save
