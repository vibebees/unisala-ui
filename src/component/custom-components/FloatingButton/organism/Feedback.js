import React, { useState } from "react"
import { IonContent, useIonToast } from "@ionic/react"
import Rating from "../molecules/Rating"
import FeebackText from "../molecules/FeebackText"
import axios from "axios"
import { userServer } from "servers/endpoints"

const Feedback = () => {
  const [present, dismiss] = useIonToast()
  const [feedBack, Setfeedback] = useState({
    rating: null,
    description: "",
    email: ""
  })

  let allProps = {
    feedBack,
    Setfeedback
  }

  const AddFeedback = async (data) => {
    try {
      const response = await axios.post(userServer + "/createFeedback", data)
      return response?.data
    } catch (error) {
      return error?.response?.data
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (feedBack.description.length < 5) {
      return present({
        duration: 3000,
        message: "Feedback must be at least 5 characters long!",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "danger",
        mode: "ios"
      })
    }
    AddFeedback(feedBack).then((res) => {
      if (res?.success) {
        present({
          duration: 3000,
          message: res?.message,
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios"
        })
      }
      if (!res?.success) {
        present({
          duration: 3000,
          message: res?.message,
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "danger",
          mode: "ios"
        })
      }
    })
    Setfeedback({
      rating: null,
      description: "",
      email: ""
    })
  }

  return (
    <IonContent>
      <Rating allProps={allProps} />
      <FeebackText allProps={{ ...allProps, handleSubmit }} />
    </IonContent>
  )
}

export default Feedback
