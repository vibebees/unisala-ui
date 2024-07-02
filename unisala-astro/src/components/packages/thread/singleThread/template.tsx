import React, { FC, useState } from "react";
import ShowPeopleComments from "../organism/ShowPeopleComments";
import {
  ThreadHeader,
  ThreadFooter,
  ThreadExpand,
  ThreadEditable,
  ThreadImages,
  ThreadOptions,
  ThreadRating,
} from "../organism";
// import AuthValidator from "../../authentication/AuthValidator";

interface SingleThreadProps {
  _id: string;
  postText?: string | null;
  postCommentsCount?: number | null;
  admissionAndApplicationRating?: number | null;
  financialAidAndScholarshipRating?: number | null;
  academicProgramsAndDepartmentRating?: number | null;
  studentLifeAndServiceRating?: number | null;
  careerAndAlumniResourceRating?: number | null;
  postType?: string | null;
  postImage?: string | null;
  videoURL?: string | null;
  date?: any | null;
  saved: boolean;
  upVoted?: boolean | null;
  images?: Array<string | null> | null;
  upVoteCount?: number | null;
  tags?: Array<{
    __typename?: "SpaceCategoryQuery";
    _id: string;
    name?: string | null;
    parentId?: string | null;
    image?: string | null;
    description?: string | null;
  } | null> | null;
  user: {
    __typename?: "user";
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    picture?: string | null;
  } | null;
  comments?: Array<{
    __typename?: "CommentDetails";
    _id?: string | null;
    commentText?: string | null;
    upVoted?: boolean | null;
    upVoteCount?: number | null;
    user: {
      __typename?: "user";
      _id: string;
      firstName?: string;
      lastName?: string;
      picture?: string | null;
      username: string;
    } | null;
  } | null> | null;
}

const SingleThread: FC<SingleThreadProps> = ({
  _id,
  academicProgramsAndDepartmentRating,
  admissionAndApplicationRating,
  careerAndAlumniResourceRating,
  comments,
  date,
  financialAidAndScholarshipRating,
  images,
  postCommentsCount,
  postImage,
  postText,
  postType,
  studentLifeAndServiceRating,
  tags,
  upVoteCount,
  upVoted,
  user,
  videoURL,
  saved = false,
  postTags
}) => {
  const [reply, setReply] = useState(false),
    [editable, setEditable] = useState(false);

  const threadContent = () => {
    return (
      <div className="thread_comment">
        {editable ? (
          <ThreadEditable
            _id={_id}
            postText={postText}
            setEditable={setEditable}
          />
        ) : (
          <>
            <ThreadExpand
              htmlText={postText!}
              _id={_id}
              tags={tags as any}
              videoURL={videoURL}
            />
            {images && images.length > 0 && (
              <ThreadImages images={images} _id={_id} />
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-2xl w-full mx-auto mb-10">
      <div className="relative mb-0 pt-4 pb-6 shadow-none BorderCard">
        <div className="ml-6 max-md:ml-2">
          <ThreadHeader
            date={date}
            firstName={user?.firstName!}
            lastName={user?.lastName!}
            profilePic={user?.picture!}
            username={user?.username!}
            postTags={postTags}
          />
        </div>

        <div className="thread_content">
          {threadContent()}
          <ThreadRating
            academicProgramsAndDepartmentRating={
              academicProgramsAndDepartmentRating
            }
            admissionAndApplicationRating={admissionAndApplicationRating}
            careerAndAlumniResourceRating={careerAndAlumniResourceRating}
            financialAidAndScholarshipRating={financialAidAndScholarshipRating}
            studentLifeAndServiceRating={studentLifeAndServiceRating}
          />
        </div>
        {/* <AuthValidator> */}
          <ThreadFooter
            _id={_id}
            postCommentsCount={postCommentsCount!}
            saved={saved}
            upVoteCount={upVoteCount!}
            upVoted={upVoted!}
            isReply={false}
            singlePost={true}
            parentId={""}
            replyTo={user?.username!}
          />
          <ThreadOptions
            _id={_id}
            setEditable={setEditable}
            username={user?.username!}
          />
        {/* </AuthValidator> */}

        {/* other people's replies */}
        <ShowPeopleComments postId={_id!} singlePost={true} />
      </div>
    </div>
  );
};

export default SingleThread;
