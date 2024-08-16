import { formatDate } from "@/utils/date";
import { extractImageFromPostText } from "@/utils/lib/image";
import { calculateReadTime, threadPointer } from "@/utils/lib/utils";

export const ArticleCard = ({ article }) => {
  const imageUrl = extractImageFromPostText({ user: false, postText: article.postText });
  const stripHtml = (html) => html.replace(/<[^>]*>/g, '');

  const title = article?.title ? stripHtml(article.title) : '';
  const postText = stripHtml(article?.postText || '');

  const displayTitle = title || postText.substring(0, 100);
  const displayBody = title ? postText.substring(0, 160) : postText.substring(0, 160);

  return (
    <div className="w-full py-6 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center mb-3">
        <img
          className="w-8 h-8 rounded-full mr-2"
          src={`https://api.multiavatar.com/${article?.user?.firstName}.svg`}
          alt="Author avatar"
        />
        <div className="flex flex-col xs:flex-row xs:items-center">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {article?.user?.firstName} {article?.user?.lastName}
          </span>
          <span className="hidden xs:inline mx-2 text-gray-500">·</span>
          <span className="text-xs text-gray-500">
            {article?.date ? formatDate(article.date) : 'No Date'}
          </span>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row w-full">
        <div className="w-full sm:w-2/3 sm:pr-4">
          <a
            href={'/' + threadPointer(article)}
            className="text-lg font-bold text-gray-900 hover:underline dark:text-white mb-2 block"
            data-astro-reload
          >
            {displayTitle}
          </a>
          {displayBody && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
              {displayBody}
            </p>
          )}
          <div className="flex items-center text-xs text-gray-500">
            <span>{calculateReadTime(article.postText) || 'few min read'}</span>
            <span className="mx-2">·</span>
            <span>{article?.postTags?.tagType || 'General'}</span>
          </div>
        </div>
        {imageUrl && (
          <div className="w-full sm:w-1/3 mt-3 sm:mt-0">
            <img
              className="w-full h-48 sm:h-32 object-cover rounded"
              src={imageUrl}
              alt="Article cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};