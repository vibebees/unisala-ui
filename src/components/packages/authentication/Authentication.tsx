import React from "react"
import { Grid, Row } from "../../defaults/index"
import clsx from "clsx"
import {useState} from "react"
import Card from "../../defaults/atoms/Card"
import LoginText from "./LoginText"
import SignIn from "./SignIn/Index"
import SignUp from "./SignUp/Index"
import "./auth.css"
import AuthTemplate from "./template/AuthTemplate"
const Authentication = ({ setActiveNavDrop = () => {} }) => {
  const [showSignup, setShowSignup] = useState(false)
  const [auth, setauth] = useState({
    state: "signin",
    email: "",
    code: 0
  })

  const width = window?.innerWidth
  return (
    <Grid className="!max-w-4xl w-full overflow-hidden ">
      <Row className="ion-no-padding">
        <Card
          className={clsx(
            "p-4 m-0 absolute max-md:h-1/2 max-md:w-full  transition-all duration-300 ease-linear w-1/2 z-20 flex flex-col justify-center gap-5 bottom-0 top-0 py-6 text-white bg-blue-500",
            showSignup
              ? "left-0 right-1/2 max-md:right-0   max-md:bottom-0"
              : "right-0 left-1/2 max-md:left-0 max-md:top-1/2"
          )}
        >
          <LoginText allProps={{ setShowSignup, showSignup, setauth }} />
        </Card>

        <AuthTemplate
          singupTrueClass={"slide-out-right"}
          singupFalseClass={"slide-in-right"}
          showSignup={showSignup}
          auth={auth}
          setauth={setauth}
        >
          <SignIn
            setauth={setauth}
            auth={auth}
            setActiveNavDrop={setActiveNavDrop}
            setShowSignup={setShowSignup}
          />
        </AuthTemplate>
        {width > 764 && auth.state !== "welcomeForm" && (
          <AuthTemplate
            auth={auth}
            setauth={setauth}
            showSignup={showSignup}
            singupTrueClass={"slide-in-left"}
            singupFalseClass={"slide-out-left"}
            setShowSignup={setShowSignup}
          >
            <SignUp setauth={setauth} setShowSignup={setShowSignup} />
          </AuthTemplate>
        )}
      </Row>
    </Grid>
  )
}
export default Authentication
