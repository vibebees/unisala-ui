import { IonIcon } from "@ionic/react"
import clsx from "clsx"
import { closeOutline, imageOutline } from "ionicons/icons"
import React from "react"

const ImageUpload = ({ files, setFiles }) => {
  const handleRemoveFile = (index) => {
    const newFiles = Array.from(files)

    newFiles.splice(index, 1)
    setFiles(newFiles)
  }
  return files?.length > 0 ? (
    <div
      className={clsx(
        "grid gap-x-4 items-center justify-center",
        files.length === 1 ? "grid-cols-1" : "grid-cols-2"
      )}
    >
      {files.length > 0 &&
        Array.from(files).map((file, i) => (
          <div className="relative mt-16" key={i}>
            <img
              src={URL.createObjectURL(file)}
              className="post-image-preview"
            />
            <button
              type="button"
              onClick={() => handleRemoveFile(i)}
              className="absolute right-0 top-2 w-6 h-6 rounded-full bg-[#585C5F] flex items-center justify-center hover:bg-opacity-80"
            >
              <IonIcon icon={closeOutline} color="light" className="" />
            </button>
          </div>
        ))}
    </div>
  ) : (
    <div className="mt-20 flex justify-center items-center">
      <label
        onDragOver={(e) => e.preventDefault()}
        // onDrop={handleImageDrop}
        htmlFor="post-image"
        className="flex flex-col items-center"
      >
        <IonIcon icon={imageOutline} className="text-3xl text-[#818080]" />
        <h5 className="text-[#818080] font-medium text-xl">
          Upload your image
        </h5>
      </label>
      <input
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(e) => setFiles(e.target.files)}
        id="post-image"
      />
    </div>
  )
}

export default ImageUpload
