import { IonItem } from "@ionic/react"
import {LabelAtom} from "../atoms/labelAtom"

export function DetailItem({ label = "", value = "" }) {
  return (
    <IonItem>
      <div className="flex flex-col py-2">
        <LabelAtom>{label}</LabelAtom>
        <span className="!text-sm tracking-wide mt-1 text-neutral-500">
          {value}
        </span>
      </div>
    </IonItem>
  )
}
