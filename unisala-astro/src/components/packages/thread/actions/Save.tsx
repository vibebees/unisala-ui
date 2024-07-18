// import { bookmark } from "ionicons/icons";
// import { useMutation } from "@apollo/client";
// import { USER_SERVICE_GQL } from "@/datasource/servers/types";
// import {
//   GetSavedList,
//   SavePost,
//   UnSavePost,
// } from "@/datasource/graphql/user";
// import React from "react";
// import { BookMarkIcon } from "@/components/packages/icons";
// import { trackEvent } from "@/components/packages/analytics";
// import { useAuth } from "@/context/AuthContext";
// import { cn } from '@/utils/lib/utils';

// interface SaveProps {
//   postId: string;
//   saved: boolean;
//   thread: any;
// }

// const Save = ({ postId, saved, thread }: SaveProps) => {
//   console.log({
//     saved

//   })
//   const {user} = useAuth();
//   const userId = user?.id
//   const [present, dismiss] = [() => {}, () => {}];

//   const [save] = useMutation(saved ? UnSavePost : SavePost, {
//     variables: { postId },
//     context: { server: USER_SERVICE_GQL },
//     update: (cache, { data }) => {
//       trackEvent({
//         action: saved ? "Unsaved_" : "Saved_" +  postId,
//         category: "engagement",
//         label: saved ? "Unsaved_" : "Saved_" + postId + '_by_' + userId,
//       })
//       cache.modify({
//         id: cache.identify({
//           __typename: "Post",
//           id: postId,
//         }),
//         fields: {
//           saved: () => data?.save?.message === "saved",
//         },
//       });
//       if (data?.save?.message === "saved") {
//         const data = cache.readQuery({
//           query: GetSavedList,
//           variables: { userId, page: 0 },
//         });
//         data &&
//           cache.writeQuery({
//             query: GetSavedList,
//             variables: { userId, page: 0 },
//             data: {
//               ...(data as { savedList: any }), // Add type declaration for 'data'
//               savedList: {
//                 ...(data as { savedList: any }).savedList, // Add type declaration for 'data.savedList'
//                 Posts: [{ ...thread, saved: true }, ...(data as { savedList: any }).savedList.Posts], // Add type declaration for 'data.savedList.Posts'
//               },
//             },
//           });
//       }
//     },
//     onCompleted: () => {
//       // present({
//       //   duration: 3000,
//       //   message: saved ? "Unsaved" : "Saved",
//       //   buttons: [{ text: "X", handler: () => dismiss() }],
//       //   color: "primary",
//       //   mode: "ios",
//       // });
//     },
//     onError: (error) => {
//       // present({
//       //   duration: 3000,
//       //   message: error.message,
//       //   buttons: [{ text: "X", handler: () => dismiss() }],
//       //   color: "primary",
//       //   mode: "ios",
//       // });
//     },
//   });

//   return (
//     <button
//       className="ThreadFooterBtn"
//       onClick={(event) => save()}
//       style={{ cursor: "pointer" }}
//     >
//       {/* <Icon
//         color={saved ? "secondary" : "medium"}
//         style={{
//           margin: "0px",
//         }}
//         className="text-2xl max-md:text-lg"
//         icon={bookmark}
//       /> */}
//       <BookMarkIcon
//         className={cn("w-6 ", saved ? "fill-blue-600" : "fill-neutral-400")}
//       />
//     </button>
//   );
// };

// export default Save;


const Save = () => {
  return(<>
  save
  </>)
}
export default Save;