import React from "react"
import { IonThumbnail, IonSkeletonText } from "@ionic/react"

const SearchLoadingSkeleton = () => {
  return (
    <>
      {Array(4)
        .fill(0)
        .map((_, idx) => (
          <div key={idx} className="border h-12 w-full">
            <IonThumbnail slot="start" className="w-full">
              <IonSkeletonText animated={true}></IonSkeletonText>
            </IonThumbnail>
          </div>
        ))}
    </>
  )
}

export default SearchLoadingSkeleton
