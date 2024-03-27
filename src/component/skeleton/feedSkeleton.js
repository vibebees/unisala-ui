import {
    IonCard,
    IonList
} from "@ionic/react"
import {musicalNotes} from "ionicons/icons"
import "./index.css"
import {ThreadSkeleton} from "./threadSkeleton"

export const FeedSkeleton = () => {
    const skeleton = [0, 1, 2, 3]
    return (

        <IonList>
            {skeleton.map((item, key) => <ThreadSkeleton key={item} style ={{marginTop: "50px"}} />)}
        </IonList>

    )
}
