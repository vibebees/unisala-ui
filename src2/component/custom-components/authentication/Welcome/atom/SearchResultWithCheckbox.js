import React from "react"
import { IonItem, IonCheckbox } from "@ionic/react"

const SearchResultWithCheckbox = ({
  handleClick,
  value,
  label,
  pictureLink = null,
  isChecked = false
}) => {
  return (
    <IonItem>
      <IonCheckbox value={value} isChecked={isChecked} onClick={handleClick}>
        {label}
      </IonCheckbox>
      {pictureLink && (
        <img
          src={pictureLink}
          alt={label}
          className="w-10 h-11 mx-2 ml-4 rounded-sm"
        />
      )}
      <span className="px-2 text-sm font-medium text-neutral-600">{label}</span>
    </IonItem>
  )
}

export default SearchResultWithCheckbox
