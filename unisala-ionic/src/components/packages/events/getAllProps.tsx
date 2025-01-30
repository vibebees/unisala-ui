import { useEffect, useRef, useState } from "react"

export const getAllProps = () => {
  const [event, setEvent] = useState({
    _id: "",
    imageUrl:
      "",
    date: "",
    title: "",
    description:
      "",
    registered: "",
    major: "",
    dayRemaining: 7
  })
  const [showAlert, setShowAlert] = useState(false)
  const [selectedYear, setSelectedYear] = useState("")
  const handleRegister = () => {
    setShowAlert(true)
  }
  const [buttonState, setButtonState] = useState({
    text: "Register Now",
    state: "notRegistered"
  })
  const [buttonColor, setButtonColor] = useState("primary")

  const eventHandler = {
    notRegistered: () => {
      setButtonState({
        text: "Register Now",
        state: "notRegistered"
      })
      setEvent((prev) => ({ ...prev, registered: prev.registered - 1 }))
      setButtonColor("primary")
    },
    registered: () => {
      setButtonState({
        text: "Are you intrested?",
        state: "registered"
      })
      animation.current?.play()
      setEvent((prev) => ({ ...prev, registered: prev.registered + 1 }))
      setButtonColor("success")
    }
  }
  const handleUserAcitivity = (value) => {
    setSelectedYear(value)
    setShowAlert(false)
    if (buttonState.state === "notRegistered") {
      eventHandler.registered()
    } else {
      eventHandler.notRegistered()
    }
  }

  const buttonEl = useRef(null)
  const animation = useRef(null)

  const year = ["Freshman", "Sophomore", "Junior", "Senior"],
    yearOptions = {
      header: "Select your year in college",
      body: year.map((year, index) => {
        return {
          label: year,
          type: "radio",
          value: year
        }
      })
    },
    optOutOptions = {
      header: "Are you intrested in this event?",
      body: [
        {
          label: "Not Intrested",
          type: "radio",
          value: "notIntrested"
        },
        {
          label: "🍿",
          type: "radio",
          value: "watching"
        }
      ]
    },
    activityOptions = {
      notRegistered: yearOptions,
      registered: optOutOptions
    },
    [currentOptions, setCurrentOptions] = useState(
      activityOptions[buttonState.state]
    ),
    clickOptions = [
      {
        text: "Cancel",
        role: "cancel",
        handler: () => {
          setShowAlert(false)
        }
      },
      {
        text: "OK",
        role: "confirm",
        handler: (value) => handleUserAcitivity(value)
      }
    ]

  useEffect(() => {
    setCurrentOptions(activityOptions[buttonState.state])
  }, [buttonState.state])

  const [totalPeopleRegistered, setTotalPeopleRegistered] = useState(10)
  return {
    event,
    showAlert,
    selectedYear,
    handleRegister,
    buttonColor,
    handleUserAcitivity,
    buttonEl,
    animation,
    year,
    yearOptions,
    setButtonColor,
    buttonState,
    setButtonState,
    setShowAlert,
    setSelectedYear,
    totalPeopleRegistered,
    setTotalPeopleRegistered,
    activityOptions,
    clickOptions,
    currentOptions,
    setCurrentOptions
  }
}
