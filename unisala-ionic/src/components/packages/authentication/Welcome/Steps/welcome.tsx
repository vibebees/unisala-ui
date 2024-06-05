import React from "react"
import { IonGrid, IonText } from "@ionic/react"

const FirstStep = ({ metaData }) => {
  return (
    <div>
      <IonGrid className="mx-4 max-md:mx-2 max-md:mt-9 mt-12">
        <IonGrid>
          <img
            src="https://i.ibb.co/wWtt9J2/unisala.webp"
            alt="unisala-log"
            width="100"
            className="align-middle mx-auto"
          />

          <IonText color="primary">
            <h1 className="font-bold text-2xl text-center mt-5 text-neutral-600">
              {metaData?.name}
            </h1>
          </IonText>

          {/* Paragraph */}
          <p
            className="text-base max-md:mx-5 leading-7 text-center mt-7 font-normal text-neutral-500 mx-14"
            dangerouslySetInnerHTML={{ __html: metaData?.description }}
          ></p>
        </IonGrid>
      </IonGrid>
    </div>
  )
}

export default FirstStep
