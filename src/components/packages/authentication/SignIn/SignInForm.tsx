import { useState } from "react"
import { IonSpinner, IonRow, useIonToast } from "@ionic/react"
import { Typography, Button } from "../../../defaults"
import AuthInput from "../AuthInput"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import { validateSignIn } from "../../../../utils/components/validate"
import { loginUser } from "../../../../datasource/store/action/authenticationAction"

const SignInForm = ({
  setauth,
  setShowSignup = null,
  setActiveNavDrop = () => {}
}) => {
  const params = new URLSearchParams(window.location.search)
  const spaceOrgName = params.get("org")
  const [input, setInput] = useState({
    email: params.get("email"),
    password: "",
    spaceOrgName,
    type: spaceOrgName && "invitation",
    code: params.get("code")
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const [present, dismiss] = useIonToast()
  const history = useHistory()

  const handleChange = (e) => {
    const { name, value } = e.target
    setInput((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validateSignIn(input)
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true)
      dispatch(
        loginUser({
          input,
          history,
          setLoading,
          present,
          setActiveNavDrop,
          redirectUrl: params.get("uni")
            ? params.get("uni") + `?unitId=${params.get("unitId")}`
            : null
        })
      )
    } else {
      setErrors(validationErrors)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Email input */}
      <div className="auth-input-div">
        <label className="auth-label">Email</label>
        <br />
        <AuthInput
          HandleChange={handleChange}
          type="text"
          name="email"
          value={input?.email}
          validation={errors?.email}
        />
      </div>
      <div className="auth-input-div">
        <label className="auth-label">Password</label>
        <br />
        <AuthInput
          HandleChange={handleChange}
          type="password"
          name="password"
          value={input?.password}
          validation={errors?.password}
        />
      </div>
      <div className="auth-policy">
        <Typography
          style={{ color: "#3880ff", cursor: "pointer" }}
          onClick={() => {
            setauth({ state: "emailVerify" })
          }}
          variant="p"
        >
          Forgot Password?
        </Typography>
      </div>
      <Button
        disabled={loading}
        type="submit"
        shape="round"
        onSubmit={handleSubmit}
        className="block text-center  w-full outline-none text-sm text-white uppercase rounded-2xl tracking-wide  text-opacity-90 hover:opacity-90"
      >
        {loading ? <IonSpinner></IonSpinner> : "Login"}
      </Button>

      <IonRow
        onClick={() => {
          setauth({ state: "signup" })
          if (setShowSignup) setShowSignup(true)
        }}
        className="auth-change mt-8 inline-flex "
      >
        <p className="text-blue-600 font-medium text-lg">
          Not Registered Yet?{" "}
          <span className="underline underline-offset-4"> Click Here</span>
        </p>
      </IonRow>
    </form>
  )
}
export default SignInForm
