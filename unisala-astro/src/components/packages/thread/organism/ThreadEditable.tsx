// import React from "react";
// import { useMutation } from "@apollo/client";
// // import { useIonToast, Button } from "../../../defaults/index";
// import { useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { useLocation } from "react-router-dom";
//  import { EditPost } from '@/datasource/graphql/user';
// import { USER_SERVICE_GQL } from '@/datasource/servers/types';

// interface ThreadEditableProps {
//   _id: string;
//   postText: string;
//   setEditable: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const ThreadEditable = ({
//   _id,
//   postText,
//   setEditable,
// }: ThreadEditableProps) => {
//   const pathname = useLocation().pathname;
//   const [present, dismiss] = [() => {}, () => {}];
  
//   const [updatedData, setUpdatedData] = useState({
//     postText,
//     // images,
//     postId: _id,
//   });

//   const handleChange = (e: any) => {
//     setUpdatedData((prev) => ({ ...prev, postText: e }));
//   };

//   const isHome =
//     pathname === "/" || pathname === "/home" || pathname === "/feed";

//   console.log("isHome", isHome);

//   console.log({ updatedData });
//   const [editPost] = useMutation(EditPost, {
//     context: { server: USER_SERVICE_GQL },
//     variables: { ...updatedData },

//     update: (cache) => {
//       cache.modify({
//         id: cache.identify({
//           __typename: isHome ? "PostNewsFeed" : "Post",
//           id: _id,
//         }),
//         fields: {
//           postText: () => updatedData.postText,
//         },
//       });
//     },
//     onCompleted: (data) => {
//       const { editPost } = data;

//       if (editPost?.status?.success) {
//         setEditable(false);
//         // present({
//         //   duration: 3000,
//         //   message: "Post Updated",
//         //   buttons: [{ text: "X", handler: () => dismiss() }],
//         //   color: "primary",
//         //   mode: "ios",
//         // });
//       } else {
//         // present({
//         //   duration: 3000,
//         //   message: editPost.message,
//         //   buttons: [{ text: "X", handler: () => dismiss() }],
//         //   color: "primary",
//         //   mode: "ios",
//         // });
//       }
//     },
//   });

//   return (
//     <div>
//       <div className="h-[170px] max-[320px]:mb-20 max-md:mx-1 max-md:mb-14 mb-10 mx-3 mt-2 text-black relative">
//         <ReactQuill
//           theme="snow"
//           onChange={handleChange}
//           defaultValue={postText}
//           className="h-full "
//         />
//       </div>

//       <br />
//       <button
//         // fill="clear"
//         className="ion-no-padding capitalize px-4 font-semibold text-black hover:bg-[#eae8e8] rounded-2xl transition ease delay-200"
//         // size="small"
//         // style={{ rippleColor: "transparent" }}
//         onClick={() => setEditable(false)}
//       >
//         Cancel
//       </button>
//       <button
//         className="ion-no-padding capitalize font-bold px-4 text-white bg-blue-500 rounded-2xl transition ease delay-200 hover:bg-blue-600"
//         // fill="clear"
//         // size="small"
//         onClick={() => editPost()}
//         // style={{ "--ripple-color": "transparent" }}
//       >
//         Save
//       </button>
//     </div>
//   );
// };

// export default ThreadEditable;


const ThreadEditable = () => {
  return (
    <div>
      comments
    </div>
  )
}
export default ThreadEditable;