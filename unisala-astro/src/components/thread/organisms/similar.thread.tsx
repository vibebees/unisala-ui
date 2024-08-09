import { formatCommentDate, formatDate } from '@/utils/date';
import { similarThreadDetail, similarThreadHeading, stripHtmlTags } from '@/utils/lib/utils';
import React, { useState } from 'react';
import { LoadingScreen } from '@/components/ui/loading';
import { extractImageFromPostText } from '@/utils/lib/image';
import { sendGAEvent } from '@/utils/analytics/events';
import type { IPost } from '@/types/post';

interface SimilarThreadProps {
    articles: IPost[];
    title: string;
    titleDescription: string;
    id: string;
}

export const SimilarThread: React.FC<SimilarThreadProps> = ({ articles, title, titleDescription, id }) => {

    function handleThreadClick(id: string, action: string) {
        sendGAEvent('suggested_thread', {
            category: 'threads',
            label: 'suggested_thread_clicked',
            postId: id,
            type: action + '_click'
          });
    }
 
    return (
        <section className="bg-white dark:bg-gray-900" id={id}>
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="grid gap-8 lg:grid-cols-2">
                    <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
                        {title}
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-2">
                    {articles.map((article, index) => {
                        const image = article?.images?.length > 0 ? article?.images[0] : extractImageFromPostText({postText:article?.postText, user: true});
                        return (
                            <article key={index} className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 relative">
                                <div className="flex justify-between items-center mb-5 text-gray-500">
                                    <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                                        <svg className="mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd"></path><path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path></svg>
                                        {article?.postTags?.tag?.name || ''}

</span>
                                    <span className="text-sm">
                                        {article?.date ? formatDate(article?.date) : 'No Date'}
                                    </span>
                                </div>
                                <h4 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    <a
                                        href={`/threads/${article?._id}`}
                                        onClick={(e) => {
                                            handleThreadClick(article?._id, 'heading');
                                        }}
                                        data-astro-reload
                                    >
                                        {similarThreadHeading(article?.postText)}
                                    </a>
                                </h4>
                                <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
                                    {similarThreadDetail(article?.postText)}
                                </p>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-4">
                                        <img className="w-7 h-7 rounded-full" src={ image ?? ''} alt={`${article?.user?.firstName + article?.user?.lastName} avatar`} />
                                        <span className="font-medium dark:text-white">{article?.user?.firstName + article?.user?.lastName}</span>
                                    </div>
                                    <a
                                        href={`/threads/${article._id}`}
                                        onClick={(e) => {
                                            handleThreadClick(article._id, 'read_more');
                                        }}
                                        className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
                                        data-astro-reload
                                    >
                                        Read more
                                        <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                        </svg>
                                    </a>
                                </div>
                            </article>
                        )
                    }

                    )}
                </div>
            </div>
        </section>
    );
};