import React from "react"
import clsx from "clsx"
import { IonRow, IonText } from "@ionic/react"

const LoginText = ({ allProps }) => {
  const { setShowSignup, showSignup, setauth } = allProps
  return (
    <IonRow className="w-full flex flex-col">
      <div className="relative h-20">
        <IonText
          className={clsx(
            "w-full  text-center top-0 absolute text-3xl font-bold",
            showSignup ? "slide-in-left" : "slide-out-left-text"
          )}
        >
          Welcome Back!
        </IonText>
        <IonText
          className={clsx(
            "w-full  absolute top-0 text-center text-3xl font-bold",

            showSignup ? "slide-out-right-text" : "slide-in-right"
          )}
        >
          Hello There!, Welcome to Unisala
        </IonText>
      </div>

      <div className=" bordre-white h-20 relative   ">
        <IonText
          className={clsx(
            " mt-2 px-10 bg-transparent absolute top-0  text-neutral-200 w-full  text-center text-base font-medium",

            showSignup ? "slide-in-left" : "slide-out-left-text"
          )}
        >
          To keep connected with us please login with your personal info.
        </IonText>
        <IonText
          className={clsx(
            " mt-2 px-8 absolute top-0 text-neutral-200 w-full  text-center text-base font-medium",
            showSignup ? "slide-out-right-text" : "slide-in-right"
          )}
        >
          We&lsquo;re thrilled to have you join our community. Let&lsquo;s get
          you set up.
        </IonText>
      </div>

      <button
        onClick={() => {
          if (!showSignup) {
            setauth({
              state: "signup",
              email: "",
              code: 0
            })
          } else {
            setauth({
              state: "signin",
              email: "",
              code: 0
            })
          }
          setShowSignup(!showSignup)
        }}
        className={clsx(
          " border mx-auto border-solid   mt-1  px-6 text-lg py-1 text-white bg-blue-500   border-neutral-300  rounded-full"
        )}
      >
        {showSignup ? "Login" : "Sign Up"}
      </button>
    </IonRow>
  )
}

export default LoginText
