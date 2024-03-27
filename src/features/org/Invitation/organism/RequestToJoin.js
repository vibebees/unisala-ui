import {useIonToast} from "@ionic/react"
import {authInstance} from "api/axiosInstance"
import React from "react"
import {useSelector} from "react-redux"
import {userServer} from "servers/endpoints"
import Card from "../../../../component/ui/Card"
import Input from "../../../../component/ui/Input"
import SendButton from "../atoms/SendButton"
import InvitationTypesCheckbox from "./InvitationTypesCheckbox"
const JoinOrganizationRequest = ({orgId, orgData}) => {
    const [present, dismiss] = useIonToast()
    const [loading, setLoading] = React.useState(false)
    const [invitationType, setInvitationType] = React.useState("")
    const {user, loggedIn} = useSelector((state) => state.userProfile),
    [email, setEmail] = React.useState(user?.email || "")


    const {name = "Community!"} = orgData
    const handleRequestToJoin = () => {
        // Check for email and invitationType
        if (!email || !orgId) {
            return present({
                duration: 3000,
                message: "Please enter your email address",
                buttons: [{text: "X", handler: () => dismiss()}],
                color: "danger",
                mode: "ios"
            })
        }
        if (!invitationType) {
            return present({
                duration: 3000,
                message: "Please select an invitation type",
                buttons: [{text: "X", handler: () => dismiss()}],
                color: "danger",
                mode: "ios"
            })
        }

        // const { data: requestToJoin, loading, refetch} = useQuery(handleRequestToJoin, {
        //     variables: {
        //         email: "prashantbasnet94@gmail.com",
        //         status: "alumini",
        //         orgId: "65f84a1678bf41455732a91b"
        //      },
        //     context: { server: USER_SERVICE_GQL }
        //   })

        // Proceed with the request if both email and invitationType are present
        setLoading(true)

        authInstance
            .post(`${userServer}/join-organization-request/${orgId}`, {
                email,
                status: invitationType,
                orgId
            })
            .then((res) => {
                if (res.data.success) {
                    present({
                        duration: 3000,
                        message: "Request sent successfully. We will get in touch soon!",
                        buttons: [{text: "X", handler: () => dismiss()}],
                        color: "primary",
                        mode: "ios"
                    })
                }
                setEmail("")
            })
            .catch((err) => {
                present({
                    duration: 3000,
                    message: err?.response?.data?.message || "Something went wrong, please try again later",
                    buttons: [{text: "X", handler: () => dismiss()}],
                    color: "danger",
                    mode: "ios"
                })
            })
            .finally(() => {
                setLoading(false)
            })
    }


    return (
        <div className="animate-fade-in-up">
            <Card className="ion-no-margin ion-padding">
                <h2 className="text-2xl font-bold text-center">
                    Join {name}
                </h2>
                <p className="text-center text-sm mt-2">
                Connect, Engage, Inspire: Join the NSAS Network Today!
                </p>
                <div className="mt-6">
                    {!loggedIn && (
                        <Input
                        type="email"
                        className="bg-gray-100 border-none w-full p-3 rounded-lg"
                        placeholder="Your email address"
                        value={email}
                        onIonChange={(e) => setEmail(e.detail.value)}
                    />

                    )}
                    <InvitationTypesCheckbox
                        allProps={{
                            invitationType,
                            setInvitationType,
                            admin: false
                        }}
                    />

                    <SendButton
                        loading={loading}
                        onclick={handleRequestToJoin}
                        label="Request to Join"
                        className="bg-primary-500 text-white w-full mt-4 p-3 rounded-lg"
                    />
                </div>
            </Card>
        </div>
    )
}

export default JoinOrganizationRequest
