import { sendGAEvent } from "@/utils/analytics/events";
import { getCache } from "@/utils/cache";
import { useState } from "react";
 interface CommentOptionsButtonProps {
  commentId: string;
  commentUserId: string;
  onEdit: () => void;
  onDelete: () => void;
}
export const CommentOptionsButton: React.FC<CommentOptionsButtonProps> = ({ 
  commentId, 
  commentUserId, 
  onEdit, 
  onDelete 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Get the current user's ID from local storage
  const currentUserId = getCache<{ id: string }>("authData")?.id;

  // Check if the current user is the author of the comment
  const isAuthor = currentUserId === commentUserId;

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleEdit = () => {
    onEdit();
    setIsOpen(false);
    sendGAEvent('thread_action', {
      category: 'threads',
      label: 'edit_comment_button',
      commentId,
    });
  };

  const handleDelete = () => {
    onDelete();
    setIsOpen(false);
    sendGAEvent('thread_action', {
      category: 'threads',
      label: 'delete_comment_button',
      commentId,
    });
  };

  // If the user is not the author, don't render the button at all
  if (!isAuthor) {
    return null;
  }

  return (
    <div className="relative">
      <button
        id={`dropdownComment${commentId}`}
        onClick={toggleDropdown}
        className='inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
        type='button'
      >
        <svg
          className='w-4 h-4'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='currentColor'
          viewBox='0 0 16 3'
        >
          <path d='M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z' />
        </svg>
        <span className='sr-only'>Comment settings</span>
      </button>
      {isOpen && (
        <div
          id={`dropdownMenu${commentId}`}
          className='absolute right-0 mt-2 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 z-10'
        >
          <ul
            className='py-1 text-sm text-gray-700 dark:text-gray-200'
            aria-labelledby='dropdownMenuIconHorizontalButton'
          >
            <li>
              <button onClick={handleEdit} className='block w-full text-left py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                Edit
              </button>
            </li>
            <li>
              <button onClick={handleDelete} className='block w-full text-left py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                Remove
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};