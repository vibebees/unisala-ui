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
    questionAboutUniversity: 'Question About University',
    reviewUniversity: 'Review University'
  };
  return (
    <>
      <div className='relative flex flex-col bg-white bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full max-w-[48rem]'>
      <div className='p-6 bg-white'>
      <ThreadHeader
                firstName={user?.firstName}
                lastName={user?.lastName}
                date={date}
                profilePic={user?.picture!}
                username={user?.username}
              />
        </div>

        <div className='relative w-full m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0'>
          <img
            src='https://unisala-user.s3.ap-south-1.amazonaws.com/3663ea17-7efc-44de-b5c9-263808602c2c?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAUVJSKU37VIW3RYP6%2F20240505%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240505T193839Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCmFwLXNvdXRoLTEiSDBGAiEAmx1eryhwlMENA4GVgnssDmK9%2B7z0w49vdBvYbSuwM7ICIQDwSTJ1rPjO9zdKWKtz5x7%2Fz5YQIslmX7YxsvPU122qmCrIBQis%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAEaDDMyMDYxNzQ5MDE3NSIMntBzPR9w%2BcEbuvrWKpwFsKofnorR1rfMjiPrhc2zQeuivlPwW3Cyik%2BwZD%2BFDBBm%2FIUYCCO%2Bx16JVyap5lO8HHRiArrHo7Se49pfUFAC%2BMTvcBZy8FIk3FkO3RMY7v%2Fa7UeBYN12%2BI7qX3MMbF%2BoWcKXOOm8bCNI%2FWkCvQRAux33aGjVbnYwR5fBQsTatA5VhwymqSufgSX0tBYAC18M%2B0Zuryqj7wRsPxahpA4%2BX9ltkpxapFqVbT5JtoNhL5BntFZsI%2FfkT4zKHildR5TgtsE9PTUb2b69J%2FHTP5cwXG4OZ3SysEuBTlmTqkdi7MBxkhDNM%2FEb0dNksjoZGi3RaaW4cJREzs1q%2BaglBIW9XkXVJ16sQFaNtXOJpvFgD8dLzkWgDvRV9PJFNJyV66bfmY4uYQuDgpw3Sc46lT1oAUFd%2BjQf2ShezTuMjok8PTX7zSCY71tcSrxZZGeDvQYu%2FEV42payeGtZGlW25EddUDGlxeq7MHGfBooM8ABy82eeX0dzwRFsQTqjrnr7RcApofTbGZ%2BeING1KRPd1PENB1uBJXvX00PzI%2B6cfQfPJHrUIREcAHReElEJbXbonCJLoPk0ipk%2F7LBjFVZHVCBpfQ87Wk4Suda6kQffoEKsO7DRai4YDWbWydWNqPVs9Tn%2FW%2F8U0u9WmNba5q1VJB8v%2B7BWnS8%2FEdoZDzLCMTkKkD%2F5h%2BLo7HUZERCe3hdbLdm2WCEQhMjnphyCsw3iuE6xPY6Rq8Ehp4VJiz6%2BEKPQX%2BLyMwQpWtf6fHRuJFMHxClzrqr%2FG8osQzL4%2B6q5bJ4OSxBChAqyeXEYcSL%2FCo8Vu4C%2Bf7PzJPkKcs6ijicDTyEvl9bRYefpkZE3SQ95jQVucpIwKScOGF44tbnnaoONXCGvwsLXc21El86QKsgwhrbfsQY6sAHMJc5XNaQxh0OydsJHeUKDnK3ELpt1Xx492WglGdUpmb451%2BHHObDfsiuyOBA5IfBywvlZ4swkF%2F%2BMfNb4ykfLnLBcoC5LjRRjUjW8k%2FsMXQ28W%2FuhWw5qPBXrtLldp3p9iCa%2FaC3P6o3zjwSi5PwVkHP%2Fn%2BSEiTONsteuwzxoeXYchNzF%2Ft7TTqWNeLYFE6eu8rSRKUNq01FT38zffhb0MlQKhVy6Rbgf37mmvp5Apw%3D%3D&X-Amz-Signature=fb56e9420b62e0c706080b30fe9f8cb4100a00475d0ac723ae58d852ec6d179b&X-Amz-SignedHeaders=host'
            alt='card-image'
            className='object-cover w-full h-full'
          />
        </div>


        <div className='p-6 bg-white'>
        <ThreadExpand htmlText={postText} _id={_id} tags={tags} />
          <div className='relative flex w-full max-w-[26rem] flex-col rounded-xl  bg-clip-border text-gray-700 shadow-none'>
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


          <ThreadOptions
            setEditable={setEditable}
            username={user?.username}
            feedType={feedType}
            feedId={feedId!}
            _id={_id}
          />

          </div>
        </div>
        {/* <div className='p-6 pt-3'>
          <button
            className='block w-full select-none rounded-lg bg-gray-900 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
            type='button'
          >
            {postTypes[postType]}
          </button>
        </div> */}
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
