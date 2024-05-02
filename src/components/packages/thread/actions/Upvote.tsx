import React, { FC } from "react";
import { useCallback, useState } from "react";
import {
  Icon,
  Buttons,
  Text,
  useIonToast,
  Typography,
} from "../../../defaults";
import { useMutation } from "@apollo/client";
import clsx from "clsx";
import { USER_SERVICE_GQL } from "../../../../datasource/servers/types";
import { UpVote } from "../../../../datasource/graphql/user";
import { UpVoteIcon } from "@components/packages/icons";
import { cn } from "@utils/index";

interface UpvoteProps {
  upVoteCount: number;
  postId: string;
  upVoted: boolean;
  isReply: boolean;
}

const Upvote: FC<UpvoteProps> = ({ upVoteCount, postId, upVoted, isReply }) => {
  const [present, dismiss] = useIonToast();
  const [voted, setVoted] = useState({
    upVoted: upVoted,
    upVoteCount: upVoteCount,
  });
  const [upVote] = useMutation(UpVote, {
    variables: { postId },
    context: { server: USER_SERVICE_GQL },
    update: (cache, { data: upVote }) => {
      cache.modify({
        id: cache.identify({
          __typename: isReply ? "Comment" : "Post",
          id: postId,
        }),
        fields: {
          upVoteCount: (upVoteCount) => {
            return upVoted ? upVoteCount - 1 : upVoteCount + 1;
          },
          upVoted: (upVoted) => !upVoted,
        },
        broadcast: false,
      });
    },
    onError: (error) => {
      present({
        duration: 3000,
        message: error.message,
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "primary",
        mode: "ios",
      });
    },
  });

  const debounce = (func) => {
    let timer;
    return function (...args) {
      setVoted((prev) => ({
        ...prev,
        upVoted: !prev.upVoted,
        upVoteCount: prev.upVoted ? prev.upVoteCount - 1 : prev.upVoteCount + 1,
      }));
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 2000);
    };
  };

  const debouncedClick = useCallback(debounce(upVote), [upVoted]);

  return (
    <Buttons
      className=" active:scale-90  min-w-16 flex justify-center hover:bg-blue-100 px-2 py-1 rounded-full duration-200"
      onClick={debouncedClick}
      style={{ cursor: "pointer" }}
    >
      <UpVoteIcon
        className={cn(
          "w-6",
          voted.upVoted ? "fill-blue-600" : "fill-neutral-400"
        )}
      />

      <Typography
        variant="p"
        className={cn(
          "block ",
          voted.upVoted ? "!text-blue-600 !font-medium" : "text-gray-600"
        )}
      >
        {voted.upVoteCount}
      </Typography>
    </Buttons>
  );
};

export default Upvote;
