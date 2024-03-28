import React from "react"
import { IonRow, IonCol } from "@ionic/react"

const index = () => {
  return (
    <>
      <IonRow className=" !px-0 border  h-full rounded-md border-neutral-300 border-opacity-75 pt-2">
        <IonCol className="w-full h-full  px-0">
          <h2 className="text-center relative  font-medium text-lg mb-3">
            History of NSAS
          </h2>

          <div className="border-t h-full py-3 px-4  border-neutral-400 border-opacity-25 items-baseline border-op justify-start flex">
            <p className="w-[10rem]  h-full text-sm opacity-40">2022 sep 23</p>
            <p className=" block text-sm h-full opacity-70">
              Nsas was founded
            </p>
          </div>
          <div className="border-t h-full py-3 px-4  border-neutral-400 border-opacity-25 items-baseline border-op justify-start flex">
            <p className="w-[10rem]  h-full text-sm opacity-40">2022 sep 23</p>
            <p className=" block text-sm h-full opacity-70">
            Sonja joined the team
            </p>
          </div>



          <div className="border-t h-full py-3 px-4  border-neutral-400 border-opacity-25 items-baseline border-op justify-start flex">
            <p className="w-[10rem]  h-full text-sm opacity-40">2022 sep 23</p>
            <p className=" block text-sm h-full opacity-70">
            Subin joined the team
            </p>
          </div>

          <div className="border-t h-full py-3 px-4  border-neutral-400 border-opacity-25 items-baseline border-op justify-start flex">
            <p className="w-[10rem]  h-full text-sm opacity-40">2022 sep 23</p>
            <p className=" block text-sm h-full opacity-70">
            Sonja became the president
            </p>
          </div>

          <div className="border-t h-full py-3 px-4  border-neutral-400 border-opacity-25 items-baseline border-op justify-start flex">
            <p className="w-[10rem]  h-full text-sm opacity-40">2022 sep 23</p>
            <p className=" block text-sm h-full opacity-70">
            Subin left the team
            </p>
          </div>

        </IonCol>
      </IonRow>
    </>
  )
}

export default index
