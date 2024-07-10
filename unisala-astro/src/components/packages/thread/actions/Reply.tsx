import React from "react";
// import { Buttons, Typography } from "../../../defaults";
import ModalCustom from "@/components/packages/reusable/modal";
// import ReplyInput from "@/components/packages/replyInput";
import { CommentIcon } from "@/components/packages/icons";
import { cn } from '@/utils/lib/utils';

interface ReplyProps {
  repliesCount: number | null | undefined;
  postId?: string;
  isReply: boolean;
  parentId?: string;
  singlePost?: boolean;
  replyTo: string;
  feedId?: string;
}

const Reply = ({
  repliesCount,
  isReply,
  replyTo,
  singlePost = false,
  parentId,
  feedId,
  postId,
}: {
  repliesCount: number | null | undefined;
  isReply: boolean;
  replyTo: string;
  singlePost?: boolean;
  parentId?: string;
  feedId?: string;
  postId?: string;
}) => {

  return (
    <div>
    
    </div>
  );
};

export default Reply;
