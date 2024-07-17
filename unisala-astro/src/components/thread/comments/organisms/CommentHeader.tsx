import { formatCommentDate } from "@/utils/date";
import type { Comment } from "@/types/comment";
import { CommentOptionsButton } from "./CommentOptionButton";

interface CommentHeaderProps {
  comment: Comment;
  onEdit: () => void;
  onDelete: () => void;
}

export const CommentHeader: React.FC<CommentHeaderProps> = ({ comment, onEdit, onDelete }) => {
  return (
    <footer className='flex justify-between items-center mb-2'>
      <div className='flex items-center'>
        <p className='inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold'>
          <img
            className='mr-2 w-6 h-6 rounded-full'
            src={comment?.user?.picture || 'https://via.placeholder.com/40'}
            alt={comment?.user?.firstName}
          />
          {comment?.user?.firstName} {comment?.user?.lastName}
        </p>
        <p className='text-sm text-gray-600 dark:text-gray-400'>
          <time
            dateTime={comment?.date?.toString()}
            title={new Date(comment?.date).toLocaleString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric'
            })}
          >
            {formatCommentDate(comment?.date?.toString())}
          </time>
        </p>
      </div>
      <CommentOptionsButton commentId={comment._id} onEdit={onEdit} onDelete={onDelete} />
    </footer>
  );
};