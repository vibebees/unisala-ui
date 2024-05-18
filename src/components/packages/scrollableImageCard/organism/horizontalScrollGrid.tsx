import React from "react"
import { CardContent, Grid, Icon, Spinner, Typography } from "../../../defaults/index"
import clsx from "clsx"
import { chevronBackOutline, chevronForwardOutline } from "ionicons/icons"
import SingleImageCard from "../molecules/SingleImageCard"
import "./similarCollege.css"
import { CustomTrackingLink } from "../../../analytics/LinkTrack"

let Cmp = () => (
  <div className='relative flex max-w-[30rem] w-[20rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg'>
  <div className='relative mx-10 mt-10 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40'>
    <img
      src='https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80'
      alt='ui/ux review check'
    />
    <div className='absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60'></div>
    <button
      className='!absolute  top-4 right-4 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
      type='button'
    >
      <span className='absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='w-6 h-6'
        >
          <path d='M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z'></path>
        </svg>
      </span>
    </button>
  </div>
  <div className='p-6'>
    <div className='flex items-center justify-between mb-3'>
      <h5 className='block font-sans text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900'>
        Wooden House, Florida
      </h5>
      <p className='flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='-mt-0.5 h-5 w-5 text-yellow-700'
        >
          <path
            fillRule='evenodd'
            d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
            clipRule='evenodd'
          ></path>
        </svg>
        5.0
      </p>
    </div>
    <p className='block font-sans text-base antialiased font-light leading-relaxed text-gray-700'>
      Enter a freshly updated and thoughtfully furnished peaceful home
      surrounded by ancient trees, stone walls, and open meadows.
    </p>
    <div className='inline-flex flex-wrap items-center gap-3 mt-8 group'>
      <span className='cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='w-5 h-5'
        >
          <path d='M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z'></path>
          <path
            fillRule='evenodd'
            d='M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z'
            clipRule='evenodd'
          ></path>
          <path d='M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z'></path>
        </svg>
      </span>

    </div>
  </div>
  <div className='p-6 pt-3'>
    <button
      className='block w-full select-none rounded-lg bg-gray-900 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
      type='button'
    >
      Reserve
    </button>
  </div>
</div>
)


export const HorizontalScrollableCard = ({ allProps }) => {
  const { title, data, className , loading} = allProps
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
    <CardContent className="p-0   ion-no-margin w-full ">
      <Typography variant="h2" className="text-lg px-12 h-fit py-0">
        {title}
      </Typography>
      <Grid className=" flex  h-full gap-0 ion-no-margin">
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
                <Cmp key={index} allProps={item} />
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
