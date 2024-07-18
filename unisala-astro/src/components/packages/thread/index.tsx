import React, { useRef, useState } from "react";
import "./index.css";
import {
  ShowPeopleComments,
  ThreadEditable,
  ThreadExpand,
  ThreadHeader,
  ThreadOptions,
  ThreadRating,
} from "./organism";
// import Share from "@/components/packages/share";
import ImageCollage from "./ImageCollages";
import AuthValidator from "../authentication/AuthValidator";
import { InView } from "react-intersection-observer";
import useViewDuration from "@/hooks/useViewDuration";

interface ThreadProps {
  thread: IPost;
  feedType: string;
  feedId?: string;
}

const Thread = ({ thread, feedType, feedId }: ThreadProps) => {
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
    postTags
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
          {/* <ThreadHeader
            date={date}
            profilePic={user?.picture!}
            username={user?.username}
          /> */}
          <div className="">
            <h2>
              viewed duration :{" "}
              <span className="text-blue-700">{viewTime}</span>
            </h2>
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
          {/* {postCommentsCount > 0 && (
            <ShowPeopleComments
              postId={_id}
              parentId=""
              singlePost={false}
              postCommentsCount={postCommentsCount}
            />
          )} */}
        </div>
      </div>
    </>
  );
};

export default Thread;
