// src/types/comment.d.ts
export interface Comment {
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
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  picture: string | null;
  userId: string;
  
}