import React, { useRef, useEffect, useState, useLayoutEffect } from "react"
import Select from "react-select"
import { IonLabel } from "@ionic/react"
import { URLgetter, URLupdate } from "utils/lib/URLupdate"
import { useHistory } from "react-router"

const customStyles = {
  menuList: (styles) => ({
    ...styles
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isFocused ? "#eeeee" : isSelected ? "#90EE90" : undefined,
    zIndex: 1
  }),
  menu: (base) => ({
    ...base,
    zIndex: 100
  })
}

const MulitiSelect = ({ options, Label = "", URLkey }) => {
  const [selected, setSelected] = useState("")
  const history = useHistory()

  const handleChanges = (e) => {
    const data = URLupdate(URLkey, e.label)
    history.push({ search: data })
  }

  useLayoutEffect(() => {
    const data = URLgetter(URLkey)
    if (data) {
      setSelected(data)
    } else {
      setSelected("Select a state")
    }
  }, [history.location.search])

  return (
    <div className="search-control z-40">
      <IonLabel className="mb-2">{Label}</IonLabel>
      <Select
        options={options}
        isSearchable
        placeholder={"Select a state"}
        onChange={handleChanges}
        styles={customStyles}
        menuPlacement="top"
        value={{
          label: selected,
          value: selected
        }}
      />
    </div>
  )
}

export default MulitiSelect
