import React from "react"
import { chevronDownOutline } from "ionicons/icons"
import {IconAtom} from "../atoms/iconAtom"

export function SeeMoreButton() {
  return (
    <div className="px-2 flex justify-center">
      <IconAtom
        className="text-lg pt-1 opacity-60 group-hover:opacity-100 text-center"
        icon={chevronDownOutline}
      />
    </div>
  )
}
