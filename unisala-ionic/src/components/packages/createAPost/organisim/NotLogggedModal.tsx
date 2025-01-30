import React from "react"
import { Button, Typography } from "../../../defaults"

const NotLogggedModal = ({ setAllowPost }) => {
  return (
    <div className="p-4 grid place-items-center">
      <div></div>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRUsQiplH_OWtHnMb1Nrk31z58OJN009JG-w&usqp=CAU"
        className="w-28 "
      />
      <Typography variant="h3" className="text-lg text-center">
        We recommend signing in so that we could provide you with the best
        experience in future. 😃
      </Typography>

      <Button
        expand="block"
        className="mt-4 w-4/5"
        onClick={() => {
          //   params.delete("create")
          //   params.delete("type")
          //   setCreateAPostPopUp(false)
          //   params.set("uni", location.pathname.split("university/")[1])
          //   history.push({ search: params.toString() })
          //   ButtonTrack(
          //     "Not logged user attempted to login when we was about to post on university page"
          //   )
          //   setTimeout(() => {
          //     history.push("/login")
          //   })
        }}
      >
        Login
      </Button>

      <Button
        color={"warning"}
        className="mt-4 w-4/5"
        onClick={() => {
          setAllowPost(true)
          //   ButtonTrack("Not logged user wants to post without logging in")
        }}
      >
        Continue without logging in
      </Button>
    </div>
  )
}

export default NotLogggedModal
