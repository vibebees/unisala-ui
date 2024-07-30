import { formatCommentDate, formatDate } from '@/utils/date';
import { similarThreadDetail, similarThreadHeading, stripHtmlTags } from '@/utils/lib/utils';
import React, { useState } from 'react';

interface SimilarThreadProps {
    articles: IPost[];
    title: string;
    titleDescription: string;
}

export const SimilarThread: React.FC<SimilarThreadProps> = ({ articles, title, titleDescription }) => {
    const [loading, setLoading] = useState(false);
    const [loadingArticleId, setLoadingArticleId] = useState<string | null>(null);

    function handleThreadClick(id: string) {
        setLoading(true);
        setLoadingArticleId(id);
        // Use Astro's navigation API or update the URL manually
        window.location.href = `/threads/${id}`;
    }

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="grid gap-8 lg:grid-cols-2">
                    <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
                        {title}
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-2">
                    {articles.map((article, index) => (
                        <article key={index} className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex justify-between items-center mb-5 text-gray-500">
                                <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                                    <svg className="mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd"></path><path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path></svg>
                                    Article
                                </span>
                                <span className="text-sm">
                                    {article.date ? formatDate(article?.date) : 'No Date'}
                                </span>
                            </div>
                            <h4 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                <a href="#" onClick={(e) => {
                                    e.preventDefault();
                                    handleThreadClick(article._id);
                                }}>
                                    {similarThreadHeading(article?.postText)}
                                </a>
                            </h4>
                            <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
                                {similarThreadDetail(article?.postText)}
                            </p>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-4">
                                    <img className="w-7 h-7 rounded-full" src={article.avatar} alt={`${article.author} avatar`} />
                                    <span className="font-medium dark:text-white">{article.author}</span>
                                </div>
                                <a 
                                    href="#" 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleThreadClick(article._id);
                                    }} 
                                    className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
                                >
                                    {loadingArticleId === article._id ? 'Loading...' : 'Read more'}
                                    {loadingArticleId !== article._id && (
                                        <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                        </svg>
                                    )}
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded-lg">
                        <p>Loading...</p>
                    </div>
                </div>
            )}
        </section>
    );
};