import React, { useState } from "react"
import { IonCard } from "@ionic/react"
import ReplyInput from "../../replyInput"
import ShowPeopleComments from "../organism/ShowPeopleComments"
import { useSelector } from "react-redux"
import {
  ThreadHeader,
  ThreadFooter,
  ThreadExpand,
  ThreadEditable,
  ThreadImages,
  ThreadOptions
} from "../organism"

const SingleThread = ({ thread, refetch }) => {
  const {
      _id = "",
      date = new Date(),
      postText = "",
      admissionAndApplicationRating = 0,
      upVoteCount = 0,
      comments = [],
      postCommentsCount = 0,
      upVoted,
      postImage = "",
      images = [],
      saved,
      user = {}
    } = thread || {},
    props = { ...user, ...thread },
    [reply, setReply] = useState(false),
    [editable, setEditable] = useState(false),
    { user: loggedinUser } = useSelector((state) => state.userProfile),
    [singlePost, setSinglePost] = useState(true)

  if (!thread) return null
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
              htmlText={postText}
              maxLines={8}
              _id={_id}
              thread={thread}
            />
            {images.length > 0 && <ThreadImages images={images} _id={_id} />}
            {/* {images.length > 0 && <ImageCollage images={images} />} */}
          </>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-2xl w-full mx-auto mb-10">
      <IonCard className="relative mb-0 pt-4 pb-6">
        <div className="ml-6 max-md:ml-2">
          <ThreadHeader
            date={date}
            firstName={user.firstName}
            lastName={user.lastName}
            profilePic={user.profilePic}
            username={user.username}
          />
        </div>

        <div className="thread_content">{threadContent()}</div>
        <ThreadFooter
          _id={_id}
          postCommentsCount={postCommentsCount}
          saved={saved}
          setReply={setReply}
          upVoteCount={upVoteCount}
          upVoted={upVoted}
        />
        <ReplyInput
          setReply={setReply}
          postId={_id}
          isReply={false}
          singlePost={singlePost}
          reply={reply}
        />

        <ThreadOptions
          loggedinUser={loggedinUser}
          _id={_id}
          setEditable={setEditable}
          username={user.username}
        />

        {/* other people's replies */}
        <ShowPeopleComments postId={thread._id} />
      </IonCard>
    </div>
  )
}

export default SingleThread
