import propTypes from "prop-types"
import { IonCardContent } from "@ionic/react"
import "./index.css"

function index(props) {
  const { title, subtitle, children } = props
  return (
    <IonCardContent className="flex justify-center space-x-12 items-center">
      <div>{children}</div>
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </IonCardContent>
  )
}

index.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string
}

export default index
