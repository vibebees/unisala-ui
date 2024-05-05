import React, { FC, useState } from 'react';
import './index.css';
import {
  ShowPeopleComments,
  ThreadEditable,
  ThreadExpand,
  ThreadFooter,
  ThreadHeader,
  ThreadImages,
  ThreadOptions,
  ThreadRating
} from './organism';
import { Buttons, Card } from '@components/defaults';
import { Reply, Save, Upvote } from './actions';
import Share from '@components/packages/share';

interface ThreadProps {
  thread: IPost;
  feedType: string;
  feedId?: string;
}

const Thread: FC<ThreadProps> = ({ thread, feedType, feedId }) => {
  const {
    _id,
    date,
    postText,
    upVoteCount,
    postCommentsCount,
    upVoted,
    images,
    saved,
    tags,
    user,
    admissionAndApplicationRating,
    financialAidAndScholarshipRating,
    academicProgramsAndDepartmentRating,
    studentLifeAndServiceRating,
    careerAndAlumniResourceRating,
    postType,
    levelOfStudy
  } = thread;
  const BASEURL = window.location.origin;
  const [editable, setEditable] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const postTypes = {
    suggestMeUniversity: 'Suggest Me University',
    askQuestion: 'Ask Question',
    shareExperience: 'Share Experience',
    shareOpportunity: 'Share Opportunity',
    shareEvent: 'Share Event',
    shareNews: 'Share News',
    shareArticle: 'Share Article',
    shareInternship: 'Share Internship',
    shareScholarship: 'Share Scholarship',
    shareJob: 'Share Job',
    shareProject: 'Share Project',
    shareResearch: 'Share Research',
    shareCourse: 'Share Course',
    shareBook: 'Share Book',
    sharePodcast: 'Share Podcast',
    shareVideo: 'Share Video',
    shareWebsite: 'Share Website',
    shareApp: 'Share App',
    shareOther: 'Share Other'
  };
  return (
    <>
      <div className='relative flex flex-col bg-white bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full max-w-[48rem]'>
        <div className='relative w-full m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0'>
          <img
            src='https://unisala-user.s3.ap-south-1.amazonaws.com/3663ea17-7efc-44de-b5c9-263808602c2c?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAUVJSKU37VIW3RYP6%2F20240505%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240505T193839Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCmFwLXNvdXRoLTEiSDBGAiEAmx1eryhwlMENA4GVgnssDmK9%2B7z0w49vdBvYbSuwM7ICIQDwSTJ1rPjO9zdKWKtz5x7%2Fz5YQIslmX7YxsvPU122qmCrIBQis%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAEaDDMyMDYxNzQ5MDE3NSIMntBzPR9w%2BcEbuvrWKpwFsKofnorR1rfMjiPrhc2zQeuivlPwW3Cyik%2BwZD%2BFDBBm%2FIUYCCO%2Bx16JVyap5lO8HHRiArrHo7Se49pfUFAC%2BMTvcBZy8FIk3FkO3RMY7v%2Fa7UeBYN12%2BI7qX3MMbF%2BoWcKXOOm8bCNI%2FWkCvQRAux33aGjVbnYwR5fBQsTatA5VhwymqSufgSX0tBYAC18M%2B0Zuryqj7wRsPxahpA4%2BX9ltkpxapFqVbT5JtoNhL5BntFZsI%2FfkT4zKHildR5TgtsE9PTUb2b69J%2FHTP5cwXG4OZ3SysEuBTlmTqkdi7MBxkhDNM%2FEb0dNksjoZGi3RaaW4cJREzs1q%2BaglBIW9XkXVJ16sQFaNtXOJpvFgD8dLzkWgDvRV9PJFNJyV66bfmY4uYQuDgpw3Sc46lT1oAUFd%2BjQf2ShezTuMjok8PTX7zSCY71tcSrxZZGeDvQYu%2FEV42payeGtZGlW25EddUDGlxeq7MHGfBooM8ABy82eeX0dzwRFsQTqjrnr7RcApofTbGZ%2BeING1KRPd1PENB1uBJXvX00PzI%2B6cfQfPJHrUIREcAHReElEJbXbonCJLoPk0ipk%2F7LBjFVZHVCBpfQ87Wk4Suda6kQffoEKsO7DRai4YDWbWydWNqPVs9Tn%2FW%2F8U0u9WmNba5q1VJB8v%2B7BWnS8%2FEdoZDzLCMTkKkD%2F5h%2BLo7HUZERCe3hdbLdm2WCEQhMjnphyCsw3iuE6xPY6Rq8Ehp4VJiz6%2BEKPQX%2BLyMwQpWtf6fHRuJFMHxClzrqr%2FG8osQzL4%2B6q5bJ4OSxBChAqyeXEYcSL%2FCo8Vu4C%2Bf7PzJPkKcs6ijicDTyEvl9bRYefpkZE3SQ95jQVucpIwKScOGF44tbnnaoONXCGvwsLXc21El86QKsgwhrbfsQY6sAHMJc5XNaQxh0OydsJHeUKDnK3ELpt1Xx492WglGdUpmb451%2BHHObDfsiuyOBA5IfBywvlZ4swkF%2F%2BMfNb4ykfLnLBcoC5LjRRjUjW8k%2FsMXQ28W%2FuhWw5qPBXrtLldp3p9iCa%2FaC3P6o3zjwSi5PwVkHP%2Fn%2BSEiTONsteuwzxoeXYchNzF%2Ft7TTqWNeLYFE6eu8rSRKUNq01FT38zffhb0MlQKhVy6Rbgf37mmvp5Apw%3D%3D&X-Amz-Signature=fb56e9420b62e0c706080b30fe9f8cb4100a00475d0ac723ae58d852ec6d179b&X-Amz-SignedHeaders=host'
            alt='card-image'
            className='object-cover w-full h-full'
          />
        </div>

        <div className='p-6 bg-white'>
          <div className='relative flex w-full max-w-[26rem] flex-col rounded-xl  bg-clip-border text-gray-700 shadow-none'>
            <div className='relative flex items-center gap-4 pt-0 pb-8 mx-0 mt-4 overflow-hidden text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border'>
              <ThreadHeader
                firstName={user?.firstName}
                lastName={user?.lastName}
                date={date}
                profilePic={user?.picture!}
                username={user?.username}
              />
            </div>
            <div className='p-0 mb-6'>
              <ThreadExpand htmlText={postText} _id={_id} tags={tags} />
            </div>
            <ThreadRating
              academicProgramsAndDepartmentRating={
                academicProgramsAndDepartmentRating
              }
              admissionAndApplicationRating={admissionAndApplicationRating}
              careerAndAlumniResourceRating={careerAndAlumniResourceRating}
              financialAidAndScholarshipRating={
                financialAidAndScholarshipRating
              }
              studentLifeAndServiceRating={studentLifeAndServiceRating}
          />

          </div>
        </div>

        <div className='p-6'>
        <ThreadRating
              academicProgramsAndDepartmentRating={
                academicProgramsAndDepartmentRating
              }
              admissionAndApplicationRating={admissionAndApplicationRating}
              careerAndAlumniResourceRating={careerAndAlumniResourceRating}
              financialAidAndScholarshipRating={
                financialAidAndScholarshipRating
              }
              studentLifeAndServiceRating={studentLifeAndServiceRating}
          />



          <div className='inline-flex flex-wrap items-center gap-3 mt-8 group'>
            <Upvote
              upVoteCount={upVoteCount}
              postId={_id}
              upVoted={upVoted}
              isReply={isReply}
            />
            <Reply
              repliesCount={postCommentsCount}
              isReply={isReply}
              replyTo=''
              singlePost={false}
              parentId={''}
              postId={_id}
            />
            {!isReply && <Save postId={_id} saved={saved} thread={{}} />}

            {!isReply && (
              <Buttons className='ThreadFooterBtn h-7'>
                <Share
                  allProps={{
                    link: `${BASEURL}/thread/${_id}`,
                    btnstyle: {
                      width: '55px',
                      height: '55px',
                      backgroundColor: 'transparent'
                    },
                    Iconstyle: {
                      color: 'gray ',
                      width: '18px',
                      height: '18px'
                    },
                    showAddList: false
                  }}
                />
              </Buttons>
            )}
            {/*

          <ThreadOptions
            setEditable={setEditable}
            username={user?.username}
            feedType={feedType}
            feedId={feedId!}
            _id={_id}
          /> */}

            <span className='cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70'>
              +20
            </span>
          </div>
        </div>
        <div className='p-6 pt-3'>
          <button
            className='block w-full select-none rounded-lg bg-gray-900 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
            type='button'
          >
            {postTypes[postType]}
          </button>
        </div>
      </div>

      <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full max-w-[48rem]'>
        <div className='relative w-full m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0'>
          <img
            src='https://unisala-user.s3.ap-south-1.amazonaws.com/3663ea17-7efc-44de-b5c9-263808602c2c?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAUVJSKU37VIW3RYP6%2F20240505%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240505T193839Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCmFwLXNvdXRoLTEiSDBGAiEAmx1eryhwlMENA4GVgnssDmK9%2B7z0w49vdBvYbSuwM7ICIQDwSTJ1rPjO9zdKWKtz5x7%2Fz5YQIslmX7YxsvPU122qmCrIBQis%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAEaDDMyMDYxNzQ5MDE3NSIMntBzPR9w%2BcEbuvrWKpwFsKofnorR1rfMjiPrhc2zQeuivlPwW3Cyik%2BwZD%2BFDBBm%2FIUYCCO%2Bx16JVyap5lO8HHRiArrHo7Se49pfUFAC%2BMTvcBZy8FIk3FkO3RMY7v%2Fa7UeBYN12%2BI7qX3MMbF%2BoWcKXOOm8bCNI%2FWkCvQRAux33aGjVbnYwR5fBQsTatA5VhwymqSufgSX0tBYAC18M%2B0Zuryqj7wRsPxahpA4%2BX9ltkpxapFqVbT5JtoNhL5BntFZsI%2FfkT4zKHildR5TgtsE9PTUb2b69J%2FHTP5cwXG4OZ3SysEuBTlmTqkdi7MBxkhDNM%2FEb0dNksjoZGi3RaaW4cJREzs1q%2BaglBIW9XkXVJ16sQFaNtXOJpvFgD8dLzkWgDvRV9PJFNJyV66bfmY4uYQuDgpw3Sc46lT1oAUFd%2BjQf2ShezTuMjok8PTX7zSCY71tcSrxZZGeDvQYu%2FEV42payeGtZGlW25EddUDGlxeq7MHGfBooM8ABy82eeX0dzwRFsQTqjrnr7RcApofTbGZ%2BeING1KRPd1PENB1uBJXvX00PzI%2B6cfQfPJHrUIREcAHReElEJbXbonCJLoPk0ipk%2F7LBjFVZHVCBpfQ87Wk4Suda6kQffoEKsO7DRai4YDWbWydWNqPVs9Tn%2FW%2F8U0u9WmNba5q1VJB8v%2B7BWnS8%2FEdoZDzLCMTkKkD%2F5h%2BLo7HUZERCe3hdbLdm2WCEQhMjnphyCsw3iuE6xPY6Rq8Ehp4VJiz6%2BEKPQX%2BLyMwQpWtf6fHRuJFMHxClzrqr%2FG8osQzL4%2B6q5bJ4OSxBChAqyeXEYcSL%2FCo8Vu4C%2Bf7PzJPkKcs6ijicDTyEvl9bRYefpkZE3SQ95jQVucpIwKScOGF44tbnnaoONXCGvwsLXc21El86QKsgwhrbfsQY6sAHMJc5XNaQxh0OydsJHeUKDnK3ELpt1Xx492WglGdUpmb451%2BHHObDfsiuyOBA5IfBywvlZ4swkF%2F%2BMfNb4ykfLnLBcoC5LjRRjUjW8k%2FsMXQ28W%2FuhWw5qPBXrtLldp3p9iCa%2FaC3P6o3zjwSi5PwVkHP%2Fn%2BSEiTONsteuwzxoeXYchNzF%2Ft7TTqWNeLYFE6eu8rSRKUNq01FT38zffhb0MlQKhVy6Rbgf37mmvp5Apw%3D%3D&X-Amz-Signature=fb56e9420b62e0c706080b30fe9f8cb4100a00475d0ac723ae58d852ec6d179b&X-Amz-SignedHeaders=host'
            alt='card-image'
            className='object-cover w-full h-full'
          />
        </div>

        <div className='p-6'>
          <div className='relative flex w-full max-w-[26rem] flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none'>
            <div className='relative flex items-center gap-4 pt-0 pb-8 mx-0 mt-4 overflow-hidden text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border'>
              <img
                src='https://unisala-user.s3.ap-south-1.amazonaws.com/3663ea17-7efc-44de-b5c9-263808602c2c?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAUVJSKU37VIW3RYP6%2F20240505%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240505T193839Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCmFwLXNvdXRoLTEiSDBGAiEAmx1eryhwlMENA4GVgnssDmK9%2B7z0w49vdBvYbSuwM7ICIQDwSTJ1rPjO9zdKWKtz5x7%2Fz5YQIslmX7YxsvPU122qmCrIBQis%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAEaDDMyMDYxNzQ5MDE3NSIMntBzPR9w%2BcEbuvrWKpwFsKofnorR1rfMjiPrhc2zQeuivlPwW3Cyik%2BwZD%2BFDBBm%2FIUYCCO%2Bx16JVyap5lO8HHRiArrHo7Se49pfUFAC%2BMTvcBZy8FIk3FkO3RMY7v%2Fa7UeBYN12%2BI7qX3MMbF%2BoWcKXOOm8bCNI%2FWkCvQRAux33aGjVbnYwR5fBQsTatA5VhwymqSufgSX0tBYAC18M%2B0Zuryqj7wRsPxahpA4%2BX9ltkpxapFqVbT5JtoNhL5BntFZsI%2FfkT4zKHildR5TgtsE9PTUb2b69J%2FHTP5cwXG4OZ3SysEuBTlmTqkdi7MBxkhDNM%2FEb0dNksjoZGi3RaaW4cJREzs1q%2BaglBIW9XkXVJ16sQFaNtXOJpvFgD8dLzkWgDvRV9PJFNJyV66bfmY4uYQuDgpw3Sc46lT1oAUFd%2BjQf2ShezTuMjok8PTX7zSCY71tcSrxZZGeDvQYu%2FEV42payeGtZGlW25EddUDGlxeq7MHGfBooM8ABy82eeX0dzwRFsQTqjrnr7RcApofTbGZ%2BeING1KRPd1PENB1uBJXvX00PzI%2B6cfQfPJHrUIREcAHReElEJbXbonCJLoPk0ipk%2F7LBjFVZHVCBpfQ87Wk4Suda6kQffoEKsO7DRai4YDWbWydWNqPVs9Tn%2FW%2F8U0u9WmNba5q1VJB8v%2B7BWnS8%2FEdoZDzLCMTkKkD%2F5h%2BLo7HUZERCe3hdbLdm2WCEQhMjnphyCsw3iuE6xPY6Rq8Ehp4VJiz6%2BEKPQX%2BLyMwQpWtf6fHRuJFMHxClzrqr%2FG8osQzL4%2B6q5bJ4OSxBChAqyeXEYcSL%2FCo8Vu4C%2Bf7PzJPkKcs6ijicDTyEvl9bRYefpkZE3SQ95jQVucpIwKScOGF44tbnnaoONXCGvwsLXc21El86QKsgwhrbfsQY6sAHMJc5XNaQxh0OydsJHeUKDnK3ELpt1Xx492WglGdUpmb451%2BHHObDfsiuyOBA5IfBywvlZ4swkF%2F%2BMfNb4ykfLnLBcoC5LjRRjUjW8k%2FsMXQ28W%2FuhWw5qPBXrtLldp3p9iCa%2FaC3P6o3zjwSi5PwVkHP%2Fn%2BSEiTONsteuwzxoeXYchNzF%2Ft7TTqWNeLYFE6eu8rSRKUNq01FT38zffhb0MlQKhVy6Rbgf37mmvp5Apw%3D%3D&X-Amz-Signature=fb56e9420b62e0c706080b30fe9f8cb4100a00475d0ac723ae58d852ec6d179b&X-Amz-SignedHeaders=host'
                alt='Tania Andrew'
                className='relative inline-block h-[58px] w-[58px] !rounded-full  object-cover object-center'
              />
              <div className='flex w-full flex-col gap-0.5'>
                <div className='flex items-center justify-between'>
                  <h5 className='block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900'>
                    Tania Andrew
                  </h5>
                  <div className='flex items-center gap-0 5'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                      className='w-5 h-5 text-yellow-700'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
                        clipRule='evenodd'
                      ></path>
                    </svg>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                      className='w-5 h-5 text-yellow-700'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
                        clipRule='evenodd'
                      ></path>
                    </svg>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                      className='w-5 h-5 text-yellow-700'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
                        clipRule='evenodd'
                      ></path>
                    </svg>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                      className='w-5 h-5 text-yellow-700'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
                        clipRule='evenodd'
                      ></path>
                    </svg>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                      className='w-5 h-5 text-yellow-700'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
                        clipRule='evenodd'
                      ></path>
                    </svg>
                  </div>
                </div>
                <p className='block font-sans text-base antialiased font-light leading-relaxed text-blue-gray-900'>
                  Frontend Lead @ Google
                </p>
              </div>
            </div>
            <div className='p-0 mb-6'>
              <p className='block font-sans text-base antialiased font-light leading-relaxed text-inherit'>
                "I found solution to all my design needs from Creative Tim. I
                use them as a freelancer in my hobby projects for fun! And its
                really affordable, very humble guys !!!"
              </p>
            </div>
          </div>
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
            <span className='cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='w-5 h-5'
              >
                <path
                  fillRule='evenodd'
                  d='M1.371 8.143c5.858-5.857 15.356-5.857 21.213 0a.75.75 0 010 1.061l-.53.53a.75.75 0 01-1.06 0c-4.98-4.979-13.053-4.979-18.032 0a.75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.182 3.182c4.1-4.1 10.749-4.1 14.85 0a.75.75 0 010 1.061l-.53.53a.75.75 0 01-1.062 0 8.25 8.25 0 00-11.667 0 .75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.204 3.182a6 6 0 018.486 0 .75.75 0 010 1.061l-.53.53a.75.75 0 01-1.061 0 3.75 3.75 0 00-5.304 0 .75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.182 3.182a1.5 1.5 0 012.122 0 .75.75 0 010 1.061l-.53.53a.75.75 0 01-1.061 0l-.53-.53a.75.75 0 010-1.06z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </span>
            <span className='cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='w-5 h-5'
              >
                <path d='M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z'></path>
                <path d='M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z'></path>
              </svg>
            </span>
            <span className='cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='w-5 h-5'
              >
                <path d='M19.5 6h-15v9h15V6z'></path>
                <path
                  fillRule='evenodd'
                  d='M3.375 3C2.339 3 1.5 3.84 1.5 4.875v11.25C1.5 17.16 2.34 18 3.375 18H9.75v1.5H6A.75.75 0 006 21h12a.75.75 0 000-1.5h-3.75V18h6.375c1.035 0 1.875-.84 1.875-1.875V4.875C22.5 3.839 21.66 3 20.625 3H3.375zm0 13.5h17.25a.375.375 0 00.375-.375V4.875a.375.375 0 00-.375-.375H3.375A.375.375 0 003 4.875v11.25c0 .207.168.375.375.375z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </span>
            <span className='cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='w-5 h-5'
              >
                <path
                  fillRule='evenodd'
                  d='M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </span>
            <span className='cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70'>
              +20
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
    </>
  );
  return (
    <>
      <Card className=' BorderCard shadow-none  pt-4 pb-3 max-md:my-1 ion-no-margin'>
        <div className='px-4'>
          <ThreadHeader
            firstName={user?.firstName}
            lastName={user?.lastName}
            date={date}
            profilePic={user?.picture!}
            username={user?.username}
          />
        </div>

        <div className='thread_content '>
          <ThreadExpand htmlText={postText} _id={_id} tags={tags} />

          <div className='px-4 py-2'>
            <ThreadRating
              academicProgramsAndDepartmentRating={
                academicProgramsAndDepartmentRating
              }
              admissionAndApplicationRating={admissionAndApplicationRating}
              careerAndAlumniResourceRating={careerAndAlumniResourceRating}
              financialAidAndScholarshipRating={
                financialAidAndScholarshipRating
              }
              studentLifeAndServiceRating={studentLifeAndServiceRating}
            />
          </div>
          <div>
            <ThreadImages _id={_id} images={images} />
          </div>

          <ThreadFooter
            _id={_id}
            upVoteCount={upVoteCount}
            upVoted={upVoted}
            postCommentsCount={postCommentsCount}
            saved={saved}
            isReply={false}
            parentId=''
            replyTo=''
            singlePost={false}
          />

          <ThreadOptions
            setEditable={setEditable}
            username={user?.username}
            feedType={feedType}
            feedId={feedId!}
            _id={_id}
          />

          {postCommentsCount > 0 && (
            <ShowPeopleComments
              postId={_id}
              parentId=''
              singlePost={false}
              postCommentsCount={postCommentsCount}
            />
          )}
        </div>
      </Card>
    </>
  );
};

export default Thread;
