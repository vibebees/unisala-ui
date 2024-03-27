import { IonCardContent, IonGrid, IonIcon, IonText } from "@ionic/react"
import clsx from "clsx"
import CustomTrackingLink from "features/analytics/LinkTrack"
import { chevronBackOutline, chevronForwardOutline } from "ionicons/icons"
import SingleImageCard from "../molecules/SingleImageCard"
import "./similarCollege.css"
import { Typography } from "component/ui"

const ScrollableCard = ({ allProps }) => {
  const { title, data, className } = allProps
  const handleRightScrollClick = () => {
    const container = document.querySelector(`.${className}`)
    container?.scrollBy({
      left: 500,
      behavior: "smooth"
    })
  }

  const handleLeftScrollClick = () => {
    const container = document.querySelector(`.${className}`)
    container?.scrollBy({
      left: -500,
      behavior: "smooth"
    })
  }
  return (
    <IonCardContent className="p-0 ion-no-padding mt-4  ion-no-margin w-full ">
      <Typography variant="h2" className="text-lg px-12 h-fit py-0">
        {title}
      </Typography>
      <IonGrid className=" flex ion-no-padding h-full gap-0 ion-no-margin">
        <button
          onClick={handleLeftScrollClick}
          className=" active:bg-neutral-200 duration-200 ease-linear transition-all w-6 flex justify-center items-center hover:bg-neutral-100 "
        >
          <IonIcon size="large" icon={chevronBackOutline} />
        </button>
        <div
          className={clsx(
            " overflow-hidden  flex similarcollegeContainer  max-md:w-full overflow-x-auto   ",
            className
          )}
        >
          {data?.map((item, index) => {
            return (
              <CustomTrackingLink
                to={"/university/" + item?.name}
                key={index}
                destination={"/university"}
                title={"clicked on university card"}
                className="h-full py-2"
              >
                <SingleImageCard key={index} allProps={item} />
              </CustomTrackingLink>
            )
          })}
        </div>
        <button
          onClick={handleRightScrollClick}
          className=" active:bg-neutral-200 duration-200 ease-linear transition-all w-6 flex justify-center items-center hover:bg-opacity-60 "
        >
          <IonIcon size="large" icon={chevronForwardOutline} />
        </button>
      </IonGrid>
    </IonCardContent>
  )
}

export default ScrollableCard
