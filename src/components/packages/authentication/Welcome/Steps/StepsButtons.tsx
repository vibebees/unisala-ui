import {useMutation} from "@apollo/client"
import {IonButton, IonCard, useIonToast} from "@ionic/react"
import clsx from "clsx"
import {jwtDecode} from "jwt-decode"
import {useContext, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {useHistory} from "react-router"
 import {WelcomeData} from ".."
 import { getCache, removeCache } from "../../../../../utils/cache"
 import { USER_SERVICE_GQL } from "../../../../../datasource/servers/types"
import { EditProfile , getUserGql} from "../../../../../datasource/graphql/user"

const getUserProfile = (data) => { }
const StepsButtons = ({ allProps }) => {
  const { welcomeFormdata } = useContext(WelcomeData),
    dispatch = useDispatch(),
    [present, dismiss] = useIonToast(),
    { accessToken } = useSelector((state) => state?.auth),
    decode = jwtDecode(accessToken),
    history = useHistory(),
    [users, setUsers] = useState({
      email: decode.email,
      firstName: decode.firstName,
      lastName: decode.lastName,
      username: decode.username
    }),
    {
      currentStep,
      setCurrentStep,
      setNewUser,
      modalRef,
      refetch,
      meta,
      totalSteps
    } = allProps
  const metaData = Object.values(meta)
  // eslint-disable-next-line require-await

  const [editProfile, { loading }] = useMutation(EditProfile, {
    context: { server: USER_SERVICE_GQL },
    variables: {
      ...users,
      ...welcomeFormdata
    },
    update: (cache, { data: { editProfile } }) => {
      const result = cache.readQuery({
        query: getUserGql,
        variables: { username: users.username }
      })

      const getUser = result?.getUser

      if (!getUser) {
        // Handle the error or return early
        return
      }

      cache.writeQuery({
        query: getUserGql,
        variables: { username: users.username },
        data: {
          getUser: {
            ...getUser,
            user: {
              ...getUser.user,
              ...editProfile.user
            }
          }
        }
      })
    },
    onCompleted: (data) => {
      // update uesr details in redux
      if (data?.editProfile?.status?.success) {
        removeCache("newUser")
        modalRef.current.dismiss()
        present({
          duration: 3000,
          message: "Customizing your feed based on your profile!",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios"
        })
      } else {
        present({
          duration: 3000,
          message: data?.editProfile?.status?.message,
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "danger",
          mode: "ios"
        })
      }
      setNewUser(false)
      refetch({
        username: users?.username
      })
    },
    onError: (error) => {
      present({
        duration: 30000,
        message: error?.message,
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "danger",
        mode: "ios"
      })
    }
  })

  const validationFunctions = () => {
    let typeofData = typeof welcomeFormdata[metaData[currentStep - 1].id]

    if (currentStep === 1) {
      return true
    }
    if (typeofData === "string") {
      return welcomeFormdata[metaData[currentStep - 1].id] !== ""
    }
    if (typeofData === "object") {
      return welcomeFormdata[metaData[currentStep - 1].id].length > 0
    }
  }

  const handleSubmit = () => {
    const isValid = validationFunctions()
    if (!isValid) {
      return present({
        duration: 3000,
        message: "Please select atleast one university",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "danger",
        mode: "ios"
      })
    }

    try {
      dispatch(
        getUserProfile({ user: { ...decode }, loggedIn: Boolean(decode) })
      )
      editProfile()
      const spaceOrg = getCache("org")

      if (spaceOrg) {
        window.location.replace("/org/" + spaceOrg)
      }
      removeCache("org")
    } catch (error) {
      console.log(error)
    }
  }
  const handleNext = () => {
    const isValid = validationFunctions()
    if (!isValid) {
      return present({
        duration: 3000,
        message: "Please fill out the required fields",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "danger",
        mode: "ios"
      })
    }
    setCurrentStep(currentStep + 1)
  }

  const handleSkip = () => {
    if (currentStep === totalSteps) {
      handleSubmit()
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  return (
    <IonCard className="w-full ion-no-margin ion-no-padding shadow-none  flex justify-between h-12">
      <IonButton
        fill="clear"
        className={clsx(
          "bg-opacity-80 flex-shrink-0",
          currentStep === 1
            ? "opacity-0 pointer-events-none"
            : "opacity-100 pointer-events-auto"
        )}
        onClick={() => setCurrentStep(currentStep - 1)}
      >
        Back
      </IonButton>
      <IonButton
        className="flex-shrink-0"
        onClick={currentStep === totalSteps ? handleSubmit : handleNext}
      >
        {currentStep === totalSteps ? "Submit" : "Next"}
      </IonButton>
    </IonCard>
  )
}

export default StepsButtons
