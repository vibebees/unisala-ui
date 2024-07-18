import type { Comment } from "@/types/comment";
import { CommentItem } from "./CommentItem";
import { getCache } from "@/utils/cache";


export const CommentList: React.FC<{ comments: Comment[], nestedComment: boolean }> = ({ comments , nestedComment= false}) => {
  return(
    <>
      {comments?.map((comment) => (
        <CommentItem key={comment._id} comment={comment} nestedComment ={nestedComment}/>
      ))}
    </>
  )
}