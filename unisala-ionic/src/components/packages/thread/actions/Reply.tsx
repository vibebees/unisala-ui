import React, { FC } from "react";
import { Buttons, Typography } from "../../../defaults";
import ModalCustom from "@components/packages/reusable/modal";
import ReplyInput from "@components/packages/replyInput";
import { CommentIcon } from "@components/packages/icons";
import { cn } from "@utils/index";
import { useParams } from "react-router";
import { trackEvent } from "@components/analytics";

interface ReplyProps {
  repliesCount: number | null | undefined;
  postId?: string;
  isReply: boolean;
  parentId?: string;
  singlePost?: boolean;
  replyTo: string;
  feedId?: string;
}

const Reply: FC<ReplyProps> = ({
  repliesCount,
  isReply,
  replyTo,
  singlePost = false,
  parentId,
  feedId,
  postId,
}) => {
  const { id: postIdFromRoute } = useParams();

  console.log({postIdFromRoute,postId})
  return (
    <div>
      <ModalCustom
        header={"Add a Comment" + postId}
        ModalData={
          <ReplyInput
            isReply={isReply}
            replyTo={replyTo}
            singlePost={singlePost}
            parentId={parentId}
            postId={postIdFromRoute??postId}
            feedId={feedId}
          />
        }
      >
        <Buttons className="ThreadFooterBtn">
          <CommentIcon className={cn("w-6 fill-neutral-400")} />
          {!isReply && (
            <Typography variant="p" className={cn("blocktext-gray-600")}>
              {repliesCount || 0}
            </Typography>
          )}
        </Buttons>
      </ModalCustom>
    </div>
  );
};

export default Reply;
