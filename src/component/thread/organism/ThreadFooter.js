import { IonButtons } from "@ionic/react"
import Share from "component/Share"
import { Reply, Save, Upvote } from "../actions"

const ThreadFooter = ({
  upVoteCount,
  upVoted,
  _id,
  setReply,
  postCommentsCount,
  saved
}) => {
  const BASEURL = window.location.origin
  return (
    <div className="thread_footer mx-9 w-4/5  flex justify-start  gap-x-12">
      <Upvote upVoteCount={upVoteCount} postId={_id} upVoted={upVoted} />
      <Reply repliesCount={postCommentsCount} setReply={setReply} />
      <Save postId={_id} saved={saved} />
      <IonButtons className="post-button w-full h-full max-md:scale-75">
        <Share
          allProps={{
            link: `${BASEURL}/thread/${_id}`,
            btnstyle: {
              width: "55px",
              height: "55px"
            },
            Iconstyle: {
              color: "gray"
            },
            showAddList: false
          }}
        />
      </IonButtons>
    </div>
  )
}

export default ThreadFooter

