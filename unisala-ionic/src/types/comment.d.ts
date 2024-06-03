/* eslint-disable no-unused-vars */
interface Icomment {
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
