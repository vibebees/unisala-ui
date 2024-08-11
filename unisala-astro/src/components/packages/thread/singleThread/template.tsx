import React, { type FC } from "react";
import {
  ThreadExpand,
  // ThreadEditable,
  ThreadImages,
  ThreadRating,
} from "../organism";
import { AuthProvider } from '@/context/AuthContext';
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
  academicProgramsAndDepartmentRating = null,
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
  saved = false }) => {
  const editable = false, setEditable = () => { };

  const threadContent = () => {
    return (
      <div className="thread_comment">
        {editable ? (
          // <ThreadEditable
          //   _id={_id}
          //   postText={postText || ""}
          //   setEditable={setEditable}
          // />
          'edit'
        ) : (
          <>
           {images && images.length > 0 && (
              // 'image'
              <ThreadImages images={images.filter(image => image !== null) as string[]} _id={_id} />
            )}
            <ThreadExpand
              htmlText={postText!}
              _id={_id}
              tags={tags as any}
              videoURL={videoURL}
            />
           
          </>
        )}
      </div>
    );
  };

  return (
    <AuthProvider>
      <div className="max-w-2xl w-full mx-auto mb-5">
        <div className="relative mb-0 pt-4 pb-6 shadow-none BorderCard">
          <div className="ml-6 max-md:ml-2">
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
            {/* <ThreadFooter
              _id={_id}
              postCommentsCount={postCommentsCount!}
              saved={saved}
              upVoteCount={upVoteCount!}
              upVoted={upVoted!}
              isReply={false}
              singlePost={true}
              parentId={""}
              replyTo={user?.username!}
            /> */}
          {/* </AuthValidator> */}
        </div>
      </div>
    </AuthProvider>
  );
};

export default SingleThread;
