import { IonPopover } from "@ionic/react"
import "./auth.css"
import Authentication from "./Authentication"

export const AuthModal = ({ allProps }) => {
  const { activeNavDrop, setActiveNavDrop } = allProps

  return (
    <>
      <IonPopover
        isOpen={activeNavDrop?.profile}
        onDidDismiss={() =>
          setActiveNavDrop({
            profile: false
          })
        }
        className="auth-pop "
      >
        <Authentication setActiveNavDrop={setActiveNavDrop} />
      </IonPopover>
      <div
        style={{
          background: "rgba(0,0,0,0.3)",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999,
          display: activeNavDrop?.profile ? "block" : "none"
        }}
      />
    </>
  )
}
export default AuthModal
