import React, { FC, useRef, useState } from "react";
import "./index.css";
import {
  ShowPeopleComments,
  ThreadEditable,
  ThreadExpand,
  ThreadHeader,
  ThreadOptions,
  ThreadRating,
} from "./organism";
import { Buttons } from "@components/defaults";
import { Reply, Save, Upvote } from "./actions";
import Share from "@components/packages/share";
import ImageCollage from "./ImageCollages";
import AuthValidator from "../authentication/AuthValidator";
import { InView } from "react-intersection-observer";
import useViewDuration from "@hooks/useViewDuration";

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
  } = thread;
  const BASEURL = window.location.origin;
  const [editable, setEditable] = useState(false);
  const isReply = false;
  const viewDuration = useRef<number | null>(null);
  const [viewTime, setViewTime] = useState(0);
  const { ViewDurationCacheUpdate, getDuration } = useViewDuration();

  return (
    <>
      <div className="relative flex flex-col bg-white bg-clip-border rounded-xl  text-gray-700 shadow-md w-full max-w-[48rem]">
        <div className="p-4 bg-white border flex justify-between items-center">
          <ThreadHeader
            firstName={user?.firstName}
            lastName={user?.lastName}
            date={date}
            profilePic={user?.picture!}
            username={user?.username}
          />
          <div>
            <h2>
              viewed duration :{" "}
              <span className="text-blue-700">{viewTime}</span>
            </h2>
          </div>
        </div>

        {editable && (
          <ThreadEditable
            _id={_id}
            postText={postText}
            setEditable={setEditable}
          />
        )}

        <InView
          as="div"
          className="p-0"
          onChange={(inView) => {
            if (inView) {
              viewDuration.current = Date.now();
              setViewTime(getDuration(_id));
            } else {
              if (viewDuration.current) {
                const viewTime = Math.floor(
                  (Date.now() - viewDuration.current) / 1000
                );
                ViewDurationCacheUpdate(viewTime, _id);
                viewDuration.current = null;
              }
            }
          }}
        >
          {/* <div ref={ref}> */}
          <div>{images.length > 0 && <ImageCollage images={images} />}</div>
          {!editable && (
            <ThreadExpand htmlText={postText} _id={_id} tags={tags} />
          )}
          <div className="relative flex w-full max-w-[26rem] flex-col rounded-xl  bg-clip-border text-gray-700 shadow-none">
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
          {/* </div> */}
        </InView>
        <div className="pt-0 pb-5  ">
          <div className="inline-flex flex-wrap items-center gap-3 mt-3 group ">
            <AuthValidator>
              <Upvote
                upVoteCount={upVoteCount}
                postId={_id}
                upVoted={upVoted}
                isReply={isReply}
              />
            </AuthValidator>

            <AuthValidator>
              <Reply
                repliesCount={postCommentsCount}
                isReply={isReply}
                replyTo=""
                singlePost={false}
                parentId={""}
                postId={_id}
                feedId={feedId}
              />
            </AuthValidator>
            <AuthValidator>
              {!isReply ? (
                <Save postId={_id} saved={saved} thread={{}} />
              ) : (
                <></>
              )}
            </AuthValidator>

            {!isReply && (
              <Buttons className="ThreadFooterBtn h-7">
                <Share
                  allProps={{
                    link: `${BASEURL}/thread/${_id}`,
                    btnstyle: {
                      width: "55px",
                      height: "55px",
                      backgroundColor: "transparent",
                    },
                    Iconstyle: {
                      color: "gray ",
                      width: "18px",
                      height: "18px",
                    },
                    showAddList: false,
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
        {/* <div className='p-3 pt-3'>
          <button
            className='block w-full select-none rounded-lg bg-gray-900 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
            type='button'
          >
            {postTypes[postType]}
          </button>
        </div> */}

        <div className="px-3">
          {postCommentsCount > 0 && (
            <ShowPeopleComments
              postId={_id}
              parentId=""
              singlePost={false}
              postCommentsCount={postCommentsCount}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Thread;
