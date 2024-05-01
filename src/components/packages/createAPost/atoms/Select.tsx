import React, { useState } from "react"
import ReactSelect from "react-select"
 import { IonInput, IonLabel } from "@ionic/react"
import { htmlForEditor } from "../utils/htmlForEditor"

const SelectAtom = ({ options, item, setPostData, postData }) => {
  const [scoreType, setScoreType] = useState(null)
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
  const modifiedOptions = options?.map((option) => ({
    value: option,
    label: option
  }))

  const handleChange = (e) => {
    setPostData((prev) => {
      const postText = htmlForEditor(
        postData?.postText,
        item.name,
        e.value
      )
      let obj = {
        ...prev
      }
      obj[item.id] = e.value.toLowerCase()
      obj.postText = postText
      return obj
    })

    if (item.id === "testScores") {
      setScoreType(e.value.toLowerCase())
    }
  }
  return (
    <>
      <ReactSelect
        options={modifiedOptions}
        styles={customStyles}
        menuPlacement="bottom"
        placeholder={item.placeholder || ""}
        defaultValue={
          postData && postData.levelOfStudy ? postData.levelOfStudy : null
        }
        onChange={handleChange}
      />

      {scoreType && (
        <div className="mt-4">
          <IonLabel className="capitalize">{scoreType} Score</IonLabel>
          <IonInput
            type="string"
            className="border border-[#bdbdbd] rounded-sm"
            placeholder="Enter score"
            onIonChange={(e) => {
              const postText = htmlForEditor(
                postData.postText,
                scoreType,
                e.target.value
              )

              console.log("he", e.target.value)

              setPostData((prev) => ({
                ...prev,
                postText,
                testScoreMark: {
                  [`${scoreType}Score`]: parseFloat(e?.target?.value)
                }
              }))
            }}
          />
        </div>
      )}
    </>
  )
}

export default SelectAtom
