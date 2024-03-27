import React from "react"
import {
  IonCol,
  IonInput,
  IonLabel,
  IonRow,
  IonText,
  useIonToast
} from "@ionic/react"

import { useMutation } from "@apollo/client"

const StepInput = ({
  currentstep,
  label,
  inputType,
  placeholder,
  setInput,
  inputValue,
  defaultValue,
  name
}) => {
  const [present, dismiss] = useIonToast()
  // const [addSpaceCategory, { error }] = useMutation(AddSpaceCategory, {
  //   context: { server: USER_SERVICE_GQL },
  //   onCompleted: (data) => {
  //     if (!data?.addSpaceCategory?.status?.success) {
  //       // SPACE CREATION UNSUCCESSFUL
  //       present({
  //         duration: 5000,
  //         className: "text-white font-bold",
  //         message: data?.addSpaceCategory?.status?.message,
  //         buttons: [
  //           {
  //             text: "Redirect?",
  //             handler: () => {
  //               setIsOpen(false)
  //               setTimeout(() => {
  //                 history.push(`/space/${spaceNameRef?.current?.value}`)
  //               })
  //             }
  //           }
  //         ],
  //         color: "danger",
  //         mode: "ios"
  //       })
  //     } else {
  //       // SPACE CREATING SUCCESSFUL
  //       setRedirecting(true)
  //       present({
  //         duration: 3000,
  //         message: "Space has been created",
  //         buttons: [{ text: "X", handler: () => dismiss() }],
  //         color: "primary",
  //         mode: "ios"
  //       })
  //       setIsOpen(false)
  //       setTimeout(() => {
  //         history.push("/space/" + data?.addSpaceCategory?.spaceCategory?.name)
  //       })
  //     }
  //   },
  //   onError: (error) => {
  //     present({
  //       duration: 3000,
  //       message: error.message,
  //       buttons: [{ text: "X", handler: () => dismiss() }],
  //       color: "danger",
  //       mode: "ios"
  //     })
  //   }
  // })

  return (
    <>
      <div className="border-b border-neutral-400 border-opacity-40 pb-2 w-full ">
        <span className="text-sm text-neutral-400">{currentstep}</span>
        <div className="flex items-center h-fit gap-4 py-2">
          <label htmlFor="Gpa" className="text-sm w-fit shrink-0 h-fit">
            {label}
          </label>
          <input
            placeholder={placeholder}
            name={name}
            onChange={(e) => {
              setInput((prev) => {
                return { ...prev, [e.target.name]: e.target.value }
              })
            }}
            value={inputValue}
            type={inputType}
            defaultValue={defaultValue}
            className="w-full placeholder:text-neutral-400 placeholder:text-base border-none outline-none   bg-transparent placeholder:text-opacity-40"
          />

          {inputValue && (
            <button className="text-xs border border-neutral-700 bg-neutral-300 text-neutral-700 hover:bg-neutral-400 hover:text-neutral-900 h-fit rounded-md px-2 py-1 ">
              Save
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default StepInput
