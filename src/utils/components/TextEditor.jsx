import React from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { IonItem, IonSelect, IonSelectOption, IonIcon } from "@ionic/react"

const TextEditor = ({
  postText,
  setPostText,
  file,
  handleChangeImage,
  handleImageDrop,
  imageOutline,
  imgfile,
  setTag,
  showImage = false
}) => {
  return (
    <div className=" h-64">
      <div className=" relative">
        <ReactQuill
          value={postText}
          onChange={(e) => {
            setPostText(e)
          }}
          theme="snow"
          className="h-40 mb-12 text-black relative"
        />
      </div>

      <div className="text-black w-full flex">
        <IonItem className="w-full !border-none">
          <label htmlFor="tagSelect" className=" w-full text-sm">
            Choose a tag
          </label>
          <div className="w-full">
            <IonSelect
              onIonChange={(e) => setTag(e.target.value)}
              label="Fixed label"
              labelPlacement="fixed"
              placeholder="Select a tag"
              className=" border-gray-300 rounded-md m-0"
            >
              <IonSelectOption value="query">Query</IonSelectOption>
              <IonSelectOption className="text-xs" value="interview experience">
                Interview Experience
              </IonSelectOption>
              <IonSelectOption value="review">Review</IonSelectOption>
            </IonSelect>
          </div>
        </IonItem>
        {showImage && (
          <div className=" flex shrink-0 justify-center items-center">
            <label
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleImageDrop}
              htmlFor="post-image"
              className="flex gap-2 items-center "
            >
              <h5 className="text-[#818080] font-medium text-sm">
                Upload image
              </h5>
              <IonIcon icon={imageOutline} className="text-xl text-[#818080]" />
            </label>
            <input
              type="file"
              ref={imgfile}
              hidden
              onChange={handleChangeImage}
              id="post-image"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default TextEditor
