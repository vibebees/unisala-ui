import React from "react"
import { CardContent, Grid, Icon, Spinner, Typography } from "../../../defaults/index"
import clsx from "clsx"
import { chevronBackOutline, chevronForwardOutline } from "ionicons/icons"
import SingleImageCard from "../molecules/SingleImageCard"
import "./similarCollege.css"
import { CustomTrackingLink } from "../../../analytics/LinkTrack"
import { DesignedCards } from "@components/packages/designed/cards"

export const HorizontalScrollableCard = ({ title, data = [0 ,1, 2,3, 4,5,6,7,8,9], className , loading} ) => {

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
  if (loading) {
    return <CardContent> <Spinner /></CardContent>
  }
  return (
    <CardContent className="p-0 ion-no-padding mt-4  ion-no-margin w-full ">
      <Typography variant="h2" className="text-lg px-12 h-fit py-0">
        {title}
      </Typography>
      <Grid className=" flex ion-no-padding h-full gap-0 ion-no-margin">
        <button
          onClick={handleLeftScrollClick}
          className=" active:bg-neutral-200 duration-200 ease-linear transition-all w-6 flex justify-center items-center hover:bg-neutral-100 "
        >
          <Icon size="large" icon={chevronBackOutline} />
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
                <DesignedCards key={index}  />
               </CustomTrackingLink>
            )
          })}
        </div>
        <button
          onClick={handleRightScrollClick}
          className=" active:bg-neutral-200 duration-200 ease-linear transition-all w-6 flex justify-center items-center hover:bg-opacity-60 "
        >
          <Icon size="large" icon={chevronForwardOutline} />
        </button>
      </Grid>
    </CardContent>
  )
}
