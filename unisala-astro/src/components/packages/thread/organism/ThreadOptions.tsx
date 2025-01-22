// import React from "react";
// import { useMutation } from "@apollo/client";
// import { IonIcon, useIonToast } from "@ionic/react";
// import { DeletePost, getNewsFeed } from "@/datasource/graphql/user";
// import { ellipsisHorizontalOutline } from "ionicons/icons";
// import { useState } from "react";
// import { useLocation } from "react-router-dom";
// import { USER_SERVICE_GQL } from "@/datasource/servers/types";
// import { useAuth } from "@/context/AuthContext";
// import { AnimatePresence } from "framer-motion";
// import Actions from "../actions/Actions";

// interface ThreadOptionsProps {
//   username: string;
//   _id: string;
//   setEditable: Function;
//   feedType: string;
//   feedId: string;
// }

// const ThreadOptions = ({
//   username,
//   _id,
//   setEditable,
//   feedType,
//   feedId,
// }: ThreadOptionsProps) => {
//   const { user } = useAuth();
//   const pathname = useLocation().pathname;
//   const [showOptions, setShowOptions] = useState(false);
//   const [present, dismiss] = useIonToast();
//   const isHome = pathname === "/" || pathname === "/home";

//   const [deletePost] = useMutation(DeletePost, {
//     context: { server: USER_SERVICE_GQL },
//     variables: {
//       postId: _id,
//     },

//     update: (cache, data) => {
//       const cachedData = cache.readQuery({
//         query: getNewsFeed,
//         variables: {
//           feedQuery: {
//             feedType,
//             page: 0,
//             feedId,
//           },
//         },
//       });
//       cache.writeQuery({
//         query: getNewsFeed,
//         variables: {
//           feedQuery: {
//             feedType,
//             page: 0,
//             feedId,
//           },
//         },

//         data: {
//           fetchFeedV2: {
//             ...(cachedData as { fetchFeedV2: { data: any[] } }).fetchFeedV2.data || [],
//             ...(cachedData as { fetchFeedV2: { data: any[] } }).fetchFeedV2.data.filter((post) => post._id !== _id),
//           },
//         },
//       });
//     },

//     onCompleted: (data) => {
//       const { deletePost } = data;
//       if (deletePost.success) {
//         setShowOptions(false);
//         present({
//           duration: 3000,
//           message: "Post Deleted",
//           buttons: [{ text: "X", handler: () => dismiss() }],
//           color: "primary",
//           mode: "ios",
//         });
//       } else {
//         present({
//           duration: 3000,
//           message: deletePost?.message,
//         });
//       }
//     },
//   });

//   if (username !== user?.username) return null;

//   return (
//     <div className="absolute z-20 top-4 right-8">
//       <div className="relative">
//         <button
//           className="active:scale-75 duration-200"
//           onClick={() => setShowOptions((prev) => !prev)}
//         >
//           <IonIcon icon={ellipsisHorizontalOutline} className="text-2xl" />
//         </button>

//         <AnimatePresence>
//           {showOptions && (
//             <Actions
//               DeleteAction={() => {
//                 deletePost();
//               }}
//               EditAction={() => {
//                 setEditable(true);
//                 setShowOptions(false);
//               }}
//             />
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default ThreadOptions;



const ThreadOptions = () => {
  return (
    <div>
      comments
    </div>
  )
}
export default ThreadOptions;