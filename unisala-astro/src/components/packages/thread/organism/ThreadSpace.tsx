// import React from 'react';
// import { Link } from 'react-router-dom';
// import moment from 'moment';
// import { Avatar } from '@/components/avatar';

// interface Tag {
//   _id: string;
//   name: string;
// }

// interface PostTag {
//   __typename: 'PostTags';
//   tag: Tag;
//   tagType: string;
// }

// interface ThreadHeaderProps {
//   username: string;
//   profilePic: string;
//   firstName: string;
//   lastName: string;
//   date: string;
//   postTags?: PostTag;
// }

// const ThreadHeader = ({
//   username,
//   profilePic,
//   firstName,
//   lastName,
//   date,
//   postTags
// }: {
//   username: string;
//   profilePic: string;
//   firstName: string;
//   lastName: string;
//   date: string;
//   postTags: PostTag | undefined;
// }) => {
//   return (
//     <div className='thread-header gap-2'>
//       <Link to={`/@/${username}`} className='h-fit block max-md:px-2'>
//         <div className='thread_profile-pic'>
//           <Avatar profilePic={profilePic} username={firstName + lastName} />
//         </div>
//       </Link>
//       <div className='thread_userdetails'>
//         <Link to={`/@/${username}`} className='h-fit block max-md:px-2'>
//           <h3
//             style={{
//               color: '#222428',
//               fontSize: '14px',
//               textTransform: 'capitalize'
//             }}
//           >
//             {firstName + ' ' + lastName}
//           </h3>
//           <div className='threads_username h-fit'>
//             <p style={{ fontSize: '12px' }}>@{username}</p>
//             {date && (
//               <>
//                 <span className='block w-[4px] h-[4px] bg-neutral-300 rounded-full mx-1 inline-block'></span>
//                 <p className='threads_date'>{moment(date).fromNow()}</p>
//               </>
//             )}
//           </div>
//         </Link>

//         {postTags?.tagType === 'space' && postTags.tag && (
//           <div >
//             <Link to={`/space/${postTags?.tag?.name}`} className='h-fit block max-md:px-2'>
//                           <p style={{ fontSize: '12px' }}>#{postTags.tag.name}</p>
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ThreadHeader;


const ThreadHeader = () => {
  return (
    <div>
      ThreadHeader
    </div>
  )
}
export default ThreadHeader;