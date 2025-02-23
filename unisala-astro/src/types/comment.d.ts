// src/types/comment.d.ts
export interface Comment {
  userId: string;
  _id: string;
  postId: string;
  parentId: string;
  commentText: string;
  commentImage: string;
  upVoteCount: number;
  replyTo: string;
  date: Date;
  user: IUser;
  upVoted?: boolean;
  repliesCount?: number;
}


interface IUser {
  id: string;
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  picture: string | null;
  userId: string;

}