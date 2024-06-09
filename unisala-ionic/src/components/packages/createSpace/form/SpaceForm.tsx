import { useMutation } from "@apollo/client"
import {
  IonCol,
  IonIcon,
  IonInput,
  IonLabel,
  IonRow,
  IonText,
  useIonToast
} from "@ionic/react"
import axios from "axios"
import { AddSpaceCategory, CreateOrgSpace } from "@datasource/graphql/user"
import { usePathName } from "@hooks/usePathname"
import { closeOutline, imageOutline } from "ionicons/icons"
import { useRef, useState } from "react"
import { useHistory } from "react-router"
import { userServer } from "@datasource/servers/endpoints"
import { USER_SERVICE_GQL } from "@datasource/servers/types"
import SubmitSpace from "../Button/SubmitSpace"
const SpaceForm = ({ setIsOpen }) => {
  const [present, dismiss] = useIonToast()
  const [redirecting, setRedirecting] = useState(false)
  const history = useHistory()
  const orgSpaceRef = useRef()
  const [file, setFile] = useState(null)
  const [orgSpace, setOrgSpace] = useState(false)
  const formData = new FormData()

  // MUTATION TO CREATE A NEW SPACE
  const [addSpaceCategory, { error }] = useMutation(AddSpaceCategory, {
    context: { server: USER_SERVICE_GQL },
    onCompleted: async (data) => {
      console.log("whattt", data.addSpaceCategory)
      if (!data?.addSpaceCategory?.status?.success) {
        // SPACE CREATION UNSUCCESSFUL
        present({
          duration: 5000,
          className: "text-white font-bold",
          message: data?.addSpaceCategory?.status?.message,
          buttons: [
            {
              text: "Redirect?",
              handler: () => {
                setIsOpen(false)
                setTimeout(() => {
                  history.push(`/space/${spaceNameRef?.current?.value}`)
                })
              }
            }
          ],
          color: "danger",
          mode: "ios"
        })
      } else {
        // SPACE CREATING SUCCESSFUL
        setRedirecting(true)

        if (file) {
          formData.append("image", file[0])
          const res = await axios.post(
            userServer +
              `/space/addSpaceCategoryImage/${data?.addSpaceCategory?.data?._id}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            }
          )
        }

        present({
          duration: 3000,
          message: "Space has been created",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios"
        })
        setIsOpen(false)
        setTimeout(() => {
          history.push("/space/" + data?.addSpaceCategory?.data?.name)
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

  const [createOrg] = useMutation(CreateOrgSpace, {
    context: { server: USER_SERVICE_GQL },
    onCompleted: async (data) => {
      console.log(data)
      if (!data?.createOrgSpace?.status?.success) {
        // SPACE CREATION UNSUCCESSFUL
        present({
          duration: 5000,
          className: "text-white font-bold",
          message: data?.createOrgSpace?.status?.message,
          buttons: [
            {
              text: "Redirect?",
              handler: () => {
                setIsOpen(false)
                setTimeout(() => {
                  history.push(`/space/${spaceNameRef?.current?.value}`)
                })
              }
            }
          ],
          color: "danger",
          mode: "ios"
        })
      } else {
        // SPACE CREATING SUCCESSFUL
        setRedirecting(true)

        if (file) {
          formData.append("image", file[0])
          const res = await axios.post(
            userServer +
              `/space/addSpaceCategoryImage/${data?.createOrgSpace?.data?._id}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            }
          )
        }

        present({
          duration: 3000,
          message: "Space has been created",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios"
        })
        setIsOpen(false)
        setTimeout(() => {
          history.push("/org/" + data?.createOrgSpace?.data?.name)
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

  const spaceNameRef = useRef(null)
  const descriptionRef = useRef(null)

  // handler to create new space
  const handleSubmit = (e) => {
    e.preventDefault()
    if (location.pathname.split("/")[1] === "space") {
      addSpaceCategory({
        variables: {
          name: spaceNameRef?.current?.value,
          description: descriptionRef?.current?.value,
          isOrgSpace: orgSpace
        }
      })
    } else {
      createOrg({
        variables: {
          name: spaceNameRef?.current?.value,
          description: descriptionRef?.current?.value,
          isOrgSpace: orgSpace
        }
      })
    }
  }

  return (
    <form className="p-4 overflow-y-auto" onSubmit={handleSubmit}>
      <IonRow>
        <IonCol>
          <IonLabel className="font-semibold " color="dark">
            Name <span className="text-[red]">*</span>
          </IonLabel>
          <IonInput
            type="text"
            placeholder="Name of your space"
            fill="outline"
            required
            ref={spaceNameRef}
            color="dark"
            className="mt-2  border border-black w-full "
          ></IonInput>
        </IonCol>
      </IonRow>
      <IonRow className="mt-4">
        <IonCol>
          <IonLabel className="font-semibold" color={"dark"}>
            Description
            <span className="ml-1 text-xs font-500 text-gray-700">
              ( Describe about your space in short)
            </span>
          </IonLabel>
          <IonInput
            color="dark"
            type="text"
            ref={descriptionRef}
            fill="outline"
            placeholder="This space is about ....."
            className="mt-2 text-sm border border-black  w-full"
          ></IonInput>
        </IonCol>
      </IonRow>

      {usePathName(0) === "org" && (
        <span className="mt-4 text-xs font-bold block w-1/2 text-yellow-800">
          <strong>Note:</strong> You are about to create an organizational space
          which requires verification.
        </span>
      )}

      {file ? (
        <div className="relative">
          <img
            src={URL.createObjectURL(file[0])}
            alt=""
            className="post-image-preview aspect-video mt-4"
          />
          <button onClick={() => setFile(null)}>
            <IonIcon
              className="absolute -top-3 text-2xl right-1"
              color="dark"
              icon={closeOutline}
            />
          </button>
        </div>
      ) : (
        <IonRow>
          <label
            htmlFor="image-upload"
            className="mt-8 w-full flex flex-col justify-center items-center"
          >
            <IonIcon icon={imageOutline} class="text-3xl text-[#818080]" />
            <IonText className="text-[#818080] font-medium text-xl">
              Upload Cover Image
            </IonText>
          </label>
          <input
            type="file"
            id="image-upload"
            hidden
            accept="image/*"
            onChange={(e) => setFile(e.target.files)}
          />
        </IonRow>
      )}
      <SubmitSpace redirecting={redirecting} />
    </form>
  )
}

export default SpaceForm

