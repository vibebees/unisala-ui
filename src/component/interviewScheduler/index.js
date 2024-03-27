
import React, { useState, useEffect, useRef } from "react"
import { IonSelect, IonSelectOption, IonLabel, IonItem, IonButton, IonDatetime, IonRow, IonCol, IonCard, IonCardTitle, IonText } from "@ionic/react"
import moment from "moment"
 import { useSelector } from "react-redux"
import {callSocket} from "servers/endpoints"
export const InterviewScheduler = () => {
  const
    [selectedDate, setSelectedDate] = useState(moment().format()),
    socket = useRef(null),
    { user } = useSelector((state) => state.userProfile),
    sendInterviewRequest = () => {
      socket?.current?.emit("scheduleInterview", {
        user: user._id,
        selectedDate: selectedDate
      })
    },
    isAMonthTime = (dateString) => {
      const today = new Date()
      const futureDate = new Date()
      futureDate.setDate(futureDate.getDate() + 30)

      const date = new Date(dateString)
      //Date will be enabled if it falls within the next 15 days.
      return date >= today && date <= futureDate
    }
    useEffect(() => {
      socket.current = callSocket()
      socket?.current?.emit("addUser", { userId: user?._id, user })
      socket?.current?.on("MyBroadCasting", (data) => {
      })
    }, [])

  return (
    <IonCard>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonCardTitle>Visa Interview Practice Session</IonCardTitle>
          </IonItem>
        </IonCol>
      </IonRow>

      <IonRow>
        <IonCol>
          <IonItem>
            <IonDatetime
              isDateEnabled={isAMonthTime}
              hourValues="6, 8, 10, 12, 14, 16, 18, 20, 22, 24"
              minuteValues="0"
              value={selectedDate}
              onIonChange={(e) => setSelectedDate(e.detail.value)}

            // hourCycle="h12"
            />

          </IonItem>
        </IonCol>
      </IonRow>

      <IonItem>
        <IonButton
          onClick={sendInterviewRequest}
          disabled={!isAMonthTime(selectedDate)}
          >
          Schedule Interview  at {moment(selectedDate).format("dddd, MMMM-DD, h a")}
        </IonButton>
      </IonItem>

    </IonCard>
  )
}
