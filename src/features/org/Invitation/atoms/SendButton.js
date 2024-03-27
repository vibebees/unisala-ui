import {IonSpinner} from "@ionic/react"
import clsx from "clsx"
import Button from "../../../../component/ui/Button"

const SendButton = ({ loading = false, label = "Submit", onclick }) => {
  return (
    <Button
      onClick={onclick}
      color="primary"
      className={clsx(
        "mt-6 h-10 text-base capitalize w-full",
        loading && "opacity-50 pointer-events-none cursor-not-allowed"
      )}
    >
      {loading ? <IonSpinner></IonSpinner> : label}
    </Button>
  )
}

export default SendButton

