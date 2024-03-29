import GoogleAuth from "../GoogleAuth"
import SignInForm from "./SignInForm"
import AppleAuth from "../AppleAuth"
import "../auth.css"
import clsx from "clsx"
import { Typography } from "../../../defaults/index"

export const SignIn = ({
  setauth,
  auth,
  setShowSignup = null,
  setActiveNavDrop = () => {}
}) => {
  return (
    <div
      className={clsx(
        "sign-content",
        auth?.state === "welcomeForm"
          ? "opacity-0 pointer-events-none"
          : "opacity-100 pointer-events-auto"
      )}
    >
      <Typography
        variant="h2"
        className="text-2xl font-semibold auth-start border-b-4 border-blue-500 pb-2 mb-4 w-fit"
      >
        Sign in
      </Typography>

      <div className="auth-button">
        <div
          style={{
            width: "234px"
          }}
        >
          <GoogleAuth setauth={setauth} setActiveNavDrop={setActiveNavDrop} />
        </div>
      </div>
      {/* <div className="auth-button">
        <AppleAuth setauth={setauth} />
      </div> */}

      <div className="auth-or">
        <Typography variant="p" className="auth-or-p">
          or Sign in with Email!
        </Typography>
      </div>
      <SignInForm
        setauth={setauth}
        setActiveNavDrop={setActiveNavDrop}
        setShowSignup={setShowSignup}
      />
    </div>
  )
}
export default SignIn
