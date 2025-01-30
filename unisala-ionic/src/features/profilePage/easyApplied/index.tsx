// eslint-disable-next-line no-use-before-define
import React from "react"
import { IonCard } from "@ionic/react"
import StateMessage from "component/stateMessage"
import emptyState from "assets/emptyState.png"
import locked from "assets/private.png"

function index() {
    const threads = []
    const isPrivate = true
    const userThreads = () => {
        if (isPrivate) {
            return (
                <StateMessage
                    title="Fulkumari lives a very private life!"
                    subtitle="Connect with Fulkumari to see universities Fulkumari has applied for."
                >
                    <img src={locked} alt="empty state" className="state-img" />
                </StateMessage>
            )
        }
        if (threads.length === 0) {
            return (
                <StateMessage
                    title="Fulkumari has not applied to any universities yet!"
                    subtitle="All the applied universities will be visible here"
                >
                    <img
                        src={emptyState}
                        alt="empty state"
                        className="state-img"
                    />
                </StateMessage>
            )
        }
        return <h1>Applied uni</h1>
    }
    return <IonCard className="mb-2">{userThreads()}</IonCard>
}

export default index
