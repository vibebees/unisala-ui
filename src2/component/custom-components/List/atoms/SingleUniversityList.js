import React from "react"
import ImageWithLoader from "component/Reusable/Image/ImageWithLoader"
import {
  IonCard,
  IonCol,
  IonText,
  IonRow,
  IonCardContent,
  IonIcon,
  IonButton,
  useIonToast
} from "@ionic/react"
import { location, closeOutline } from "ionicons/icons"
import { authInstance } from "api/axiosInstance"
import { userServer } from "servers/endpoints"
import { useHistory, useParams } from "react-router-dom"
import { useSelector } from "react-redux"

const SingleUniversityList = ({
  name,
  unitId,
  id,
  setUniversitiesList,
  city,
  streetAddressOrPOBox,
  stateAbbreviation
}) => {
  const [present] = useIonToast()
  const history = useHistory()
  const { username } = useParams()
  const { user: loggedInUser } = useSelector((state) => state.userProfile)
  const RemoveFromList = async (listId, unitId) => {
    try {
      const res = await authInstance.patch(
        `${userServer}/update-list/${listId}`,
        {
          type: "remove",
          unitId: unitId
        }
      )
      if (res.data.success) {
        setUniversitiesList((prev) => {
          return {
            ...prev,
            data: prev.data.filter((list) => list.unitId !== unitId)
          }
        })
        present({
          message: "Successfully removed from the list",
          duration: 2000,
          color: "success"
        })
      }
    } catch (error) {
      present({
        message: "Something went wrong",
        duration: 2000,
        color: "danger"
      })
    }
  }

  const handleRouting = () => {
    const btn = document.querySelector(".ListModalCloseBtn")
    btn.click()
    setTimeout(() => {
      history.push(`/university/${name}`)
    }, 1000)
  }

  return (
    <IonCard className="h-12 ion-no-padding my-3 group hover:bg-neutral-100 ion-no-margin shadow-none">
      <IonRow className="ion-no-margin ion-no-padding h-full">
        <IonCol
          size="auto"
          className=" ion-no-padding cursor-pointer ion-no-margin"
          onClick={handleRouting}
        >
          <ImageWithLoader
            src="https://unisala-university-images.s3.amazonaws.com/University%20of%20North%20Alabama_101879-9.jpg?AWSAccessKeyId=ASIAUVJSKU37TATZ475D&Expires=1704027462&Signature=vgzymrDSmW1UN1k%2F6vpAtvJkBAo%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEHwaCmFwLXNvdXRoLTEiRjBEAiBdKIyRbPFnJKPCQUMEq1oRWRBpW9lqgSr3TZUWkraxrAIgAwbkl33TA4nLIG4fZma7qxECG5jzcLZXhF05Va5U4TgqvwUIFRABGgwzMjA2MTc0OTAxNzUiDMSntNGTcAWHybywMiqcBYgWtCuWJHAo%2FvHVf%2BPHkDE4YcdvyNO3mmvhHrKzbG0MSJxfRQrD6XVyv9gCE3ZAu3T7wEZaVqhcRVHtUamZ2JIu6%2BeBsrNNc2sMkOLYeq21cBZMToCW8837lKFxgcTV7c0n9TcfcI7GGTTN677hbUs9UXJUTMDdzurxb9PKMjRqHutuy0WUhMjQUYMp9MX6a9XmEKtWEStls4si5lhqQRbGqL6Iq9RmGc8jyr%2FUAW4dDleqirAyUuyo1OTT%2BqfKuH1Q9BU3w9rC%2FINNMl9yttposFF7Wrd01UBxg%2FFq2fi6cLJ1rnoIuGg6odBHl8Qv5vPoiIo1S4WqfsYPD%2FwYUh8rSFpc28TJZfZDHHKmxSkd8sG0%2BVR52x2QirKF4d0XkdiiJERyckT3lwxgjGmlnU%2B2hr5Gofa0a0gL1gYP3B%2BMh9Wy%2F51IKMJZPkBd4eP2DdgmJy2O6H3NR0S9Eb5thQwx4BwTYhcEMRTSGbywfR0sKVyqrX5mT8PWfNQ%2BhHpMl9u8PwjqKR3WH%2FgOO20p1vVpmxqFluTV4UtGJWj%2FQHSRFqjDvGeGPeSznHo5%2BbvukZJYDr6RExb7GULayNchFfF8qGk9wJRIqejw7pUcanb7EqQ1%2FAik0aMxGyStAS5QEfPN4M%2FI0N2X3dtNBy6R5OEiYw5iJq1GxvZa49hrUwItDd294gMT%2BT43F4tiqZduOEultPvhjeKs1bswwDg1f0pKNmafbKA5clGrCO4rKxv%2FN70HalFKfKeyaLlXuHfIhXSrrKFbXOaM3nt8o%2BiBQzMyBt29gyi9Un3spG3t4niu91%2BQbm0RCqgLPEMHqtFVKoCooo%2BtD1MvXwzuKR%2BNBHXzUJhxP4dwzNqV52QTiTxhkv2X1RwJoe%2BECg0SMJSpxawGOrIBk0W2WAEf9Uf3Zrbva6zBioH4YmsoFZhYlUFftZWGpObzuWM7%2FUqa7Km6tYZkpX4oQ4D8LfcZLgMGsOvHSO%2FZusCiDS31n%2FiBoQVCTbIPiyUF5%2BZyaUhTEqdlBrC3ytxP95VZ4wz8GB5izYUsJNRic5sMsRTMO%2FjDxxD5BayqoQnudxJ2I9g4Pj%2BOKuarzv78YZbVxbHUZYV8gX%2FuixUH8ZPPVpKKHmSGJ%2BmmQlGGb4GHow%3D%3D"
            alt="profile"
            className={"object-cover"}
            style={{ height: "100%", width: "48px" }}
          />
        </IonCol>
        <IonCol
          className="ml-3 ion-no-padding cursor-pointer ion-no-margin"
          onClick={handleRouting}
        >
          <IonText>
            <h1 className="text-base font-medium text-black">{name}</h1>
          </IonText>

          <IonCardContent
            className="ion-no-padding ion-no-margin mt-0 items-center gap-1"
            style={{ display: "flex", padding: "0 " }}
          >
            <IonIcon
              style={{
                fontSize: "13px",
                alignSelf: "center"
              }}
              className="ion-icon"
              icon={location}
            />
            <IonText>
              <p
                style={{
                  alignSelf: "center",
                  fontSize: "12px",
                  marginTop: "2px"
                }}
              >
                {city}, {stateAbbreviation}, {streetAddressOrPOBox}
              </p>
            </IonText>
          </IonCardContent>
        </IonCol>
        <IonCol size="auto" className="ion-no-padding ion-no-margin">
          {username === loggedInUser.username && (
            <IonButton
              className="hidden  hover:bg-red-50 group-hover:block h-full ion-no-margin ion-no-padding w-10 "
              fill="clear"
              color="dark"
              style={{ alignSelf: "center" }}
              onClick={() => RemoveFromList(id, unitId)}
            >
              <IonIcon
                className="text-2xl   text-red-500"
                icon={closeOutline}
              />
            </IonButton>
          )}
        </IonCol>
      </IonRow>
    </IonCard>
  )
}

export default SingleUniversityList
