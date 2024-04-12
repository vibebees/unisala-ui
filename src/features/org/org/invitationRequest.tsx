import {IonToast} from "@ionic/react"
 import {useEffect, useState} from "react"
import {useHistory, useParams} from "react-router"
import {handleSendInvitation} from "../Invitation/utility"
import {FeedSkeleton} from "../../../components/packages/skeleton/feedSkeleton"
export const InvitationRequest = () => {
    const [isOpen, setIsOpen] = useState(true)
    const params = useParams(),
        {orgId, admin, requestor, category, role} = params,
        history = useHistory()
    const done = () => {
        history.push(`/org/${category}`)
    }
    useEffect(() => {

        handleSendInvitation({
            email: requestor,
            orgId: orgId,
            invitationType: role,
            present: ({duration, message, buttons, color, mode}) => {
                setIsOpen(true)
            },
            dismiss: () => {},
            setEmail: () => {},
            done
        })
    }, [])

    return (
        <>
            <IonToast
                isOpen={isOpen}
                onDidDismiss={() => setIsOpen(false)}
                message="Bridge sent successfully"
                duration={3000}
                color="primary"
                mode="ios">
            </IonToast>
            <FeedSkeleton />
        </>
    )
}
