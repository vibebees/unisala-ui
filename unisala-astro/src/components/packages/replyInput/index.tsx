import React, { type FormEvent, useState } from "react";
// import { useMutation } from "@apollo/client";
// import RichTextInput from "../input/RichTextInput";
// import { ThreadHeader } from "../thread/organism";
import { useAuth } from "@/context/AuthContext";
import "./index.css";
// import { AddCommentMutation } from "@/types/gqlTypes/graphql";
import { currentFeedType } from "@/utils/lib/URLupdate";
// import { useLocation } from "react-router-dom";

interface ReplyInputProps {
  postId?: string;
  isReply: boolean;
  parentId?: string;
  singlePost: boolean;
  replyTo: string;
  feedId?: string;
}

function ReplyInput({
  postId,
  isReply = false,
  parentId,
  singlePost,
  feedId,
  replyTo,
}: ReplyInputProps) {
  const [commentText, setCommentText] = useState("");
  const { user } = useAuth();
  // const location = useLocation();
  const feedType = currentFeedType(location as unknown as Location);

  const [addComment] = [() =>{}]

  const submitReply = (e: FormEvent) => {
    e.preventDefault();
    const variables = {
      postId: postId,
      commentText: commentText,
      parentId,
      replyTo: "", // Add the replyTo property and initialize it with an empty string
    };

    if (isReply) {
      variables.replyTo = replyTo;
    }
    // addComment({ variables });
  };

  return (
    <div className="content">
      <form className="border flex flex-col px-5" onSubmit={submitReply}>
        <div className="my-3">
         
        </div>

        <div>
          <input
            value={commentText}
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full rounded-full mt-2 bg-blue-500 text-white py-2 px-4 flex items-center justify-center"
          >
            <span className="mr-3">Reply</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReplyInput;