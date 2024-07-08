// import React, { useCallback, useState } from "react";
//  import { ApolloCache, useMutation, type FetchResult, type MutationFunctionOptions, type OperationVariables } from "@apollo/client";
// import clsx from "clsx";
// import { USER_SERVICE_GQL } from "@/datasource/servers/types";
// import { UpVote } from "@/datasource/graphql/user";
// import { UpVoteIcon } from "@/components/packages/icons";
// import { trackEvent } from "@/components/packages/analytics";
// import { cn } from '@/utils/lib/utils';
// // import { useNavigate } from 'react-router';

// interface UpvoteProps {
//   upVoteCount: number;
//   postId: string;
//   upVoted: boolean;
//   isReply: boolean;
// }

// const Upvote = ({ upVoteCount, postId, upVoted, isReply }: UpvoteProps) => {
//   const navigate = () =>{}
//   const [voted, setVoted] = useState({
//     upVoted: upVoted,
//     upVoteCount: upVoteCount,
//   });

//   const [upVote] = useMutation(UpVote, {
//     variables: { postId },
//     context: { server: USER_SERVICE_GQL },
//     update: (cache, { data: upVote }) => {
//       analytics();
//       cache.modify({
//         id: cache.identify({
//           __typename: isReply ? "Comment" : "Post",
//           id: postId,
//         }),
//         fields: {
//           upVoteCount: (upVoteCount) => {
//             return upVoted ? upVoteCount - 1 : upVoteCount + 1;
//           },
//           upVoted: (upVoted) => !upVoted,
//         },
//         broadcast: false,
//       });
//     },
//     onError: (error) => {
//       alert(error.message);
//     },
//   });

//   const analytics = () => {
//     const activity = upVoted ? 'downvote' : 'upvote';
//     trackEvent({
//       action: activity + "_clicked_" + postId,
//       category: "engagement",
//       label: 'vote_' + activity,
//       value: voted.upVoteCount,
//     });
//   };

//   const debounce = (func: () => void) => {
//     let timer: NodeJS.Timeout | null = null;
//     return () => {
//       setVoted((prev) => ({
//         ...prev,
//         upVoted: !prev.upVoted,
//         upVoteCount: prev.upVoted ? prev.upVoteCount - 1 : prev.upVoteCount + 1,
//       }));
//       if (timer) clearTimeout(timer);
//       timer = setTimeout(() => {
//         func();
//       }, 2000);
//     };
//   };

//   const debouncedClick = useCallback(debounce(upVote), [upVoted]);

//   return (
//     <button
//       onClick={debouncedClick}
//       className={cn(
//         "flex items-center space-x-1 text-sm",
//         voted.upVoted ? "text-blue-500" : "text-gray-500"
//       )}
//     >
//       <UpVoteIcon className={cn("w-4 h-4", voted.upVoted ? "fill-blue-500" : "fill-gray-500")} />
//       <span>{voted.upVoteCount}</span>
//     </button>
//   );
// };

// export default Upvote;


const Upvote = () => {
  return(<>
  upvote
  </>)
}
export default Upvote;