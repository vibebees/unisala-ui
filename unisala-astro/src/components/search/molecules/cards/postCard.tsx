import * as Avatar from '@radix-ui/react-avatar';

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  readTime: string;
  publishDate: string;
  author: {
    name: string;
    avatar: string;
  };
}

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => (
  <article className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
    <Avatar.Root>
      <Avatar.Image
        src={post?.author?.avatar}
        alt={post?.author?.name}
        className="h-8 w-8 sm:h-10 sm:w-10 rounded-full"
      />
      <Avatar.Fallback className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-200 dark:bg-gray-700">
        {post?.author?.name[0]}
      </Avatar.Fallback>
    </Avatar.Root>
    <div className="flex-1 min-w-0">
      <h3 className="font-medium text-base sm:text-lg text-gray-900 dark:text-white truncate">
        {post?.title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mt-1">
        {post?.excerpt}
      </p>
      <div className="mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
        {post?.readTime} · {post?.publishDate}
      </div>
    </div>
  </article>
);
