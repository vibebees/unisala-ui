import { IonText } from "@ionic/react"
import GoogleAuth from "../GoogleAuth"
import SignUpForm from "./SignUpForm"
import AppleAuth from "../AppleAuth"
import "../auth.css"
import { Typography } from "../../../defaults/index"

export const SignUp = ({ setauth, setShowSignup = null }) => {
  const params = new URLSearchParams(window.location.search)
  const isInvited = params.get("org")
  return (
    <div className="sign-content bg-white">
      <Typography variant="p" className=" border-blue-400 w-fit border-b-2">
        Start for free
      </Typography>
      <Typography className="font-semibold text-neutral-600 text-xl">
        Create a new account.
      </Typography>
      <br />
      <br />
      {!isInvited && (
        <div className="auth-button">
          <div
            style={{
              width: "234px"
            }}
          >
            <GoogleAuth setauth={setauth} />
          </div>
          <div className="auth-or">
            <p className="auth-or-p">OR</p>
          </div>
        </div>
      )}
      {/* <div className="auth-button">
        <AppleAuth />
      </div> */}

      <SignUpForm setauth={setauth} setShowSignup={setShowSignup} />
    </div>
  )
}
export default SignUp
