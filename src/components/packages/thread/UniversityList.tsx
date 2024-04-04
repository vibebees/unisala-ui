import React, { useState, useRef } from "react"
import { IonPopover, IonItem, IonInput, IonIcon } from "@ionic/react"
import { universityServer } from "servers/endpoints"
import { arrowBackOutline } from "ionicons/icons"
import { authInstance } from "api/axiosInstance"
import { useDebouncedEffect } from "hooks/useDebouncedEffect"
import SearchLoadingSkeleton from "component/authentication/Welcome/atom/SearchLoadingSkeleton"
import ImageWithLoader from "../reusable/Image/ImageWithLoader"
import NoImageFound from "assets/no_image_found.png"
const UniversityList = ({
  handleUniversitySelect,
  popoverOpen,
  setPopoverOpen,
  searchText
}) => {
  const [results, setResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const getUniversitites = async () => {
    setIsLoading(true)
    try {
      const res = await authInstance.get(
        `${universityServer}/keyword/schoolname/${
          searchText.trim().length === 0 ? "New York" : searchText.trim()
        }/5`
      )
      setResults(res.data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInput = () => {
    getUniversitites()
  }

  useDebouncedEffect(handleInput, [searchText], 1000)

  if (!popoverOpen) {
    return null
  }

  return (
    // <IonPopover
    //   ref={popover}
    //   isOpen={popoverOpen}
    //   onDidDismiss={() => setPopoverOpen(false)}
    //   style={{
    //     height: "300px",
    //     position: "absolute",
    //     top: `${popoverPosition.top}px`,
    //     left: `${popoverPosition.left}px`
    //   }}
    // >
    <section
      // style={{
      //   height: "200px",
      //   position: "absolute",
      //   bottom: `${popoverPosition.top}px`,
      //   left: `0px`
      // }}
      className="w-full h-full bg-white z-[1000] shadow-lg rounded-md "
    >
      <div className="sticky top-0 flex items-center gap-1 border bg-white rounded-none">
        <IonIcon
          icon={arrowBackOutline}
          className="text-xl text-neutral-400 hover:text-neutral-600 p-2"
          onClick={() => setPopoverOpen(false)}
        />
        <IonInput
          label="Default input"
          showCancelButton="always"
          placeholder="Search University..."
          autofocus
          className="h-8 w-full pointer-events-none ion-no-margin text-xs font-normal ion-no-padding border-none"
          value={searchText}
          disabled
        />
      </div>

      <div className="h-[calc(100%-30px)] overflow-y-auto">
        {isLoading && <SearchLoadingSkeleton />}
        {!isLoading &&
          results?.length > 0 &&
          results?.map((result, index) => (
            <IonItem
              key={index}
              className="ion-no-padding ion-no-margin px-1 cursor-pointer"
              onClick={() => {
                handleUniversitySelect(result.name)
                setPopoverOpen(false)
              }}
            >
              {result.picture ? (
                <ImageWithLoader
                  src={result.picture}
                  className={"w-10 h-10 rounded-sm"}
                  alt={result.name}
                />
              ) : (
                <img
                  className="w-10 h-10 rounded-sm"
                  src={NoImageFound}
                  alt={result.name}
                />
              )}
              <span className="px-1 text-xs capitalize leading-4 font-medium text-neutral-600">
                {result?.name}
              </span>
            </IonItem>
          ))}

        {!isLoading && results?.length === 0 && (
          <div className="h-16 flex justify-center items-center">
            <h3 className="text-neutral-600">No result found</h3>
          </div>
        )}

        {!isLoading && !results && (
          <div className="h-16 flex justify-center text-sm items-center">
            <h3 className="text-neutral-600">Search for a university</h3>
          </div>
        )}
      </div>
    </section>

    // </IonPopover>
  )
}

export default UniversityList
