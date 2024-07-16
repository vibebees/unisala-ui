export const CommentBody: React.FC<{ commentText: string }> = ({ commentText }) => (
    <div
      className='text-gray-500 dark:text-gray-400'
      dangerouslySetInnerHTML={{ __html: commentText }}
    />
  );