/* eslint-disable no-unneeded-ternary */
import React, { useEffect } from "react"
import {
  IonRadioGroup,
  IonRow,
  IonText,
  IonRadio,
  useIonToast
} from "@ionic/react"
import Label from "./Label"
import { useLocation, useHistory } from "react-router"
import { URLupdate, URLgetter } from "utils/lib/URLupdate"

const RadioGroup = ({
  Label1,
  Label2,
  value1,
  value2,
  urlKey,
  header = ""
}) => {
  const history = useHistory()
  const [selected, setSelected] = React.useState("")
  const [present, dismiss] = useIonToast()
  const handleChange = (e) => {
    const data = URLupdate(urlKey, e.target.value[0])
    history.push({ search: data.toString() })
    setSelected(e.target.value)
  }

  useEffect(() => {
    const data = URLgetter(urlKey)
    if (data) {
      if (data === value1[0]) {
        setSelected(value1)
      } else if (data === value2[0]) {
        setSelected(value2)
      } else {
        setSelected("")
      }
    } else {
      setSelected("")
    }
  }, [history.location.search])

  return (
    <IonRadioGroup allowEmptySelection={false} value={selected}>
      <h2 className="search-control__label">{header}</h2>
      <IonRow className="mt-3">
        <Label label={Label1} />

        <IonRadio
          className="text-sm"
          onIonFocus={handleChange}
          value={value1}
        ></IonRadio>
        <IonText className="mx-3">{Label2}</IonText>
        <IonRadio onIonFocus={handleChange} value={value2}></IonRadio>
      </IonRow>
    </IonRadioGroup>
  )
}

export default RadioGroup
