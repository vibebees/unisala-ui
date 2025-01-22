// import React from 'react';
// import { Link } from 'react-router-dom';
// import moment from 'moment';
// import { color } from 'framer-motion';
// import { trackEvent } from '@/components/packages/analytics';
// import { useAuth } from '@/context/AuthContext';
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
// const renderTagLink = (postTags?: PostTag, user?:IUser ) => {
//   if (postTags && postTags.tag) {
//     const path = postTags.tagType === 'space' ? '/space/' : '/org/';

//     // Function to handle link click event for tracking
//     const handleLinkClick = () => {
//       trackEvent({
//         action: postTags.tag.name +'_tag_clicked_'+user?.id,
//         category: postTags.tagType+'_tag_click',
//         label: ` ${postTags.tag.name}`
//       });
//     };

//     return (
//       <Link to={`${path}${postTags.tag.name}`} className='h-fit block max-md:px-2' onClick={handleLinkClick}>
//         <p style={{ fontSize: '15px', color: '#551A8B' }}>#{postTags.tag.name}</p>
//       </Link>
//     );
//   }
// };

// const ThreadHeader = ({
//   username,
//   profilePic,
//   firstName,
//   lastName,
//   date,
//   postTags
// }: ThreadHeaderProps) => {
//   const { user } = useAuth();
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

//         {renderTagLink(postTags, user as IUser)}
//       </div>
//     </div>
//   );
// };

// export default ThreadHeader;


const ThreadHeader = () => {
  return (
    <div>
      comments
    </div>
  )
}
export default ThreadHeader;