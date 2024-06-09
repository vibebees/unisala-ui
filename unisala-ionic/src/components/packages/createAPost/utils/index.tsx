import React from "react"
import { Typography, Input, Label, Checkbox } from "../../../defaults"
import RichTextInput from "../../input/RichTextInput"
import AsyncSelectAtom from "../atoms/AsyncSelect"
import SelectAtom from "../atoms/Select"
import { htmlForEditor } from "./htmlForEditor"

const generateInputTag = ({item,postData, setPostData}) => {
    console.log({ item })

    return (
      <>
        <Typography className="text-sm">{item.name}</Typography>
        <Input
          id={item.id} // Add id attribute here
          name={item.name}
          type={item.type}
          placeholder={item.placeholder || ""}
          className="border border-[#bdbdbd]  !px-2 text-sm rounded-sm "
          onIonChange={(e) => {
            const postText = htmlForEditor(
              postData?.postText,
              item.name,
              e.target.value
            )
            setPostData((prev) => ({
              ...prev,
              postText,
              [item.id]: isNaN(e.target.value)
                ? e.target.value
                : parseFloat(e.target.value)
            }))
          }}
        />
      </>
    )
  }

  const generateSelectTag = (item) => {
    return (
      <>
        <Typography variant="p" className="text-sm">
          {item.name}
        </Typography>
        {item.api ? (
          <AsyncSelectAtom
            item={item}
            setPostData={setPostData}
            postData={postData}
            className="text-sm"
          />
        ) : (
          <SelectAtom
            options={item.options}
            item={item}
            setPostData={setPostData}
            postData={postData}
            className="text-sm"
          />
        )}
      </>
    )
  }

  const generateTextareaTag = (item) => {
    return (
      <>
        <Typography className="text-sm mb-1">{item.name}</Typography>
        <div>
          <RichTextInput
            id={item.id}
            onChange={(e) => setPostData((prev) => ({ ...prev, postText: e }))}
            value={postData?.postText}
            showUniversityListOnAt={true}
            searchText={postData?.postText?.split("@").pop().split("<")[0]}
            handleUniversitySelect={(e) => {
              if (postData?.postText.endsWith("</p>")) {
                const removeTextafter = postData.postText.split("@")[0]
                setPostData((prev) => ({
                  ...prev,
                  postText:
                    removeTextafter +
                    `<a href="https://unisala.com/university/${e}" rel="noopener noreferrer" target="_blank">${e}</a></p></p>`
                }))
              } else {
                const removeTextafter = postData.postText.split("@")[0]
                setPostData((prev) => ({
                  ...prev,
                  postText:
                    removeTextafter +
                    `<a href="https://unisala.com/university/${e}" rel="noopener noreferrer" target="_blank">${e}</a></p>`
                }))
              }
            }}
          />
        </div>
      </>
    )
  }

  const generateCheckbox = (item) => {
    return (
      <div className="flex mt-2 w-fit items-center">
        <Label htmlFor={item.id}>{item.name}</Label>

        <Checkbox
          className="ml-2 "
          id={item.id} // Add id attribute here
          name={item.name}
          onIonChange={(e) => {
            setPostData((prev) => ({
              ...prev,
              [item.id]: e.target.checked
            }))
          }}
        />
      </div>
    )
  }
  const generateHTML = (item) => {
    switch (item?.type) {
      case "input":
        return generateInputTag(item)
      case "checkbox":
        return generateCheckbox(item)
      case "select":
        return item?.rating
          ? generateRatingComponent(item)
          : generateSelectTag(item)
      case "textarea":
        return generateTextareaTag(item)
      case "date":
        return generateDateComponent(item)
      default:
        return null
    }
  }
