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
import { Buttons, Card, Item, ItemDivider } from '@components/defaults';
import { Reply, Save, Upvote } from './actions';
import Share from '@components/packages/share';
import ImageCollage from './ImageCollages';

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
  let dummyImages = [
    'https://cdn.britannica.com/85/13085-050-C2E88389/Corpus-Christi-College-University-of-Cambridge-England.jpg',
    'https://www.creighton.edu/sites/default/files/styles/hero_mobile/public/2024-05/may-commencement-hero-9.jpg?itok=3Mu4dsF2',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDLci5lWs5pqELaAP_LDOMzqLF8QzsBt_j9nEto30DVw&s',
    'https://www.purdue.edu/home/wp-content/uploads/2023/07/16_2022_RM13902-2.jpg'

  ]
  return (
    <>
      <div className='relative flex flex-col bg-white bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full max-w-[48rem]'>
        <div className='p-6 bg-white border'>
          <ThreadHeader
            firstName={user?.firstName}
            lastName={user?.lastName}
            date={date}
            profilePic={user?.picture!}
            username={user?.username}
          />
        </div>

        {dummyImages.length > 0 && <ImageCollage images={dummyImages} />}

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
        <div className='pt-0 pb-5 border '>
          <div className='inline-flex flex-wrap items-center gap-3 mt-3 group '>
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
