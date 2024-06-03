import {authInstance} from "../../../datasource/api/axiosInstance"
import {userServer} from "../../../datasource/servers/endpoints"

export const handleSendInvitation = ({
    email = "",
    orgId = "",
    invitationType = "",
    setLoading = () => {},
    present = () => {},
    dismiss = () => {},
  setEmail = () => {},
   done = () => {}
}) => {
    if (!email || !orgId) {
      return present({
        duration: 3000,
        message: "Please enter email address",
        buttons: [{text: "X", handler: () => dismiss()}],
        color: "danger",
        mode: "ios"
      })
    }
  setLoading(true)
    // present({
    //   duration: 3000,
    //   message: "Preparing to send invitation",
    //   buttons: [{text: "X", handler: () => dismiss()}],
    //   color: "primary",
    //   mode: "ios"
    // })
    // setEmail("")
    authInstance
      .post(`${userServer}/org-invitation-request/${orgId}`, {
        emails: [email],
        description: "invitation for space",
        role: invitationType.toLowerCase()
      })
      .then((res) => {
        if (res.data.success) {
          present({
            duration: 3000,
            message: "Invitation sent successfully",
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
          message: err?.response?.data?.message || " Something went wrong",
          buttons: [{text: "X", handler: () => dismiss()}],
          color: "danger",
          mode: "ios"
        })

      })
      .finally(() => {
        setLoading(false)
        done()

      })
  }
