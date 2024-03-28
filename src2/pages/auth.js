import LoginPage from "../features/login"
import { IonCardContent } from "@ionic/react"
const AuthPage = ({ allProps }) => {
  return (
    <IonCardContent className="auth-pop min-h-[100vh] grid place-content-center bg-white">
      <LoginPage allProps={allProps} />
    </IonCardContent>
  )
}
export default AuthPage
