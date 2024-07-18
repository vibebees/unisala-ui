export const CommentSkeleton = () => (
    <div className="animate-pulse p-6 mb-3 bg-white rounded-lg border border-gray-200 dark:bg-gray-900 dark:border-gray-700 w-full">
      <div className="flex items-center space-x-3 mb-4">
        <div className="rounded-full bg-gray-300 h-10 w-10"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-3 bg-gray-300 rounded w-1/3"></div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-300 rounded"></div>
        <div className="h-3 bg-gray-300 rounded w-5/6"></div>
      </div>
    </div>
  );
  
  export const CommentsSketelon = () => (
    <>
    <CommentSkeleton />
    <CommentSkeleton />
    <CommentSkeleton />
  </>
  )