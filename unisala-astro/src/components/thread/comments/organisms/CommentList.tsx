import type { Comment } from "@/types/comment";
import { CommentItem } from "./CommentItem";


export const CommentList: React.FC<{ comments: Comment[], nestedComment: boolean }> = ({ comments , nestedComment= false}) => (
    <>
      {comments?.map((comment) => (
        <CommentItem key={comment._id} comment={comment} nestedComment ={nestedComment}/>
      ))}
    </>
  );
