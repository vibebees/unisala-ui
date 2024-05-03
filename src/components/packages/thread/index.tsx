import React, { FC, useState } from "react";
import "./index.css";
import {
  ShowPeopleComments,
  ThreadEditable,
  ThreadExpand,
  ThreadFooter,
  ThreadHeader,
  ThreadImages,
  ThreadOptions,
  ThreadRating,
} from "./organism";
import { Card } from "../../defaults";

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

  console.log("thread", thread);

  const [editable, setEditable] = useState(false);

  return (
    <>
      <Card className=" BorderCard shadow-none  pt-4 pb-3 max-md:my-1 ion-no-margin">
        <div className="px-4">
          <ThreadHeader
            firstName={user?.firstName}
            lastName={user?.lastName}
            date={date}
            profilePic={user?.picture!}
            username={user?.username}
          />
        </div>

        <div className="thread_content ">
          {editable ? (
            <ThreadEditable
              _id={_id}
              postText={postText}
              setEditable={setEditable}
            />
          ) : (
            <div className="thread_comment">
              <ThreadExpand htmlText={postText} _id={_id} tags={tags} />
            </div>
          )}

          <div className="px-4 py-2">
            <ThreadRating
              academicProgramsAndDepartmentRatingm={
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
            parentId=""
            replyTo=""
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
              parentId=""
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
