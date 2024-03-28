import React, { useEffect, useState } from "react"
import { IonCard, IonCardContent, IonCol, IonGrid, IonRow } from "@ionic/react"
import { FolderScholarship } from "./organisms/sch.folder"
import { Link } from "react-router-dom"
import { FolderGeneral } from "./organisms/folder"
import { CardHeader } from "component/Reusable/cardHeader"
import clsx from "clsx"
import { Card } from "component/defaults"

// Create a function to render a folder based on conditions
const RenderFolder = ({
  item,
  allProps,
  customStyles,
  popUp,
  customHeight
}) => {
  const ComponentToRender = popUp ? FolderScholarship : FolderGeneral
  return (
    <ComponentToRender
      allProps={allProps}
      item={item}
      customHeight={customHeight}
      className="w-full"
      style={{ flex: "1 1 40%", ...customStyles }}
    />
  )
}
const FolderStructure = ({ allProps = {} }) => {
  const { folderName = "", customStyles = {}, customHeight = true } = allProps
  const [popUp, setPopup] = useState(allProps?.popUp || false)
  const [currentURL, setCurrentURL] = useState("")
  const [showMore, setShowMore] = useState(false)

  const handleItemClick = (item) => {
    if (item.key === "interviewPrep") {
      setCurrentURL(item.link)
      setPopup(true)
    }
  }
  const [data, setData] = useState(allProps?.data || [])

  useEffect(() => {
    setData(allProps?.data || [])
  }, [allProps?.data])

  if (allProps?.data?.length === 0) return null

  return (
    <Card style={{ margin: "10px 0px 0px 0px" }} className="flex flex-col">
      {folderName && <CardHeader header={folderName} />}
      <IonCardContent key={"index"} className="w-full">
        <IonGrid className="w-full gap-3 flex flex-wrap">
          <IonRow
            className={clsx(
              "transition-all w-full gap-3 duration-150 ease-linear",
              showMore && customHeight
                ? "h-full "
                : "h-[328px] overflow-hidden",
              !customHeight && "h-fit flex-nowrap"
            )}
          >
            {data.map((item, index) => (
              <IonCol key={index}>
                {item.key === "interviewPrep" ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    <RenderFolder
                      {...{ item, allProps, customStyles, popUp, customHeight }}
                    />
                  </a>
                ) : popUp ? (
                  <RenderFolder
                    {...{ item, allProps, customStyles, popUp, customHeight }}
                  />
                ) : (
                  <Link to={item.link}>
                    <RenderFolder
                      {...{ item, allProps, customStyles, popUp, customHeight }}
                    />
                  </Link>
                )}
              </IonCol>
            ))}
          </IonRow>
          {data.length > 4 && (
            <IonRow className="w-full  z-30 h-full  rounded-sm">
              <IonCol className="w-full flex justify-center">
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="text-neutral-800 bg-neutral-100 px-3 py-1 rounded-sm shadow-sm font-medium"
                >
                  {showMore ? "Show Less" : "See all scholarships"}
                </button>
              </IonCol>
            </IonRow>
          )}
        </IonGrid>
      </IonCardContent>
    </Card>
  )
}

export default FolderStructure
