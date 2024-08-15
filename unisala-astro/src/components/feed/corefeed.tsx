import { useAstroQuery } from '@/datasource/apollo-client';
import { Search } from '@/datasource/graphql/user';
import { USER_SERVICE_GQL } from '@/datasource/servers/types';
import type { IPost } from '@/types/post';
import { formatDate } from '@/utils/date';
import { extractImageFromPostText } from '@/utils/lib/image';
import { threadPointer } from '@/utils/lib/utils';
import { useEffect, useState, type SetStateAction, type Key } from 'react';


export const CoreFeed = ({ articles = [] }) => {

  function useDebounce(value: string, delay: number) {
    const [ debouncedValue, setDebouncedValue ] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [ value, delay ]);

    return debouncedValue;
  }
  const [ searchQuery, setSearchQuery ] = useState('');
  const debouncedSearchQuery: string = useDebounce(searchQuery, 300); // 300ms delay


  const { loading, error, data } = useAstroQuery(Search, {
    variables: { q: debouncedSearchQuery, post: true },
    context: { server: USER_SERVICE_GQL },
    skip: debouncedSearchQuery.length < 3,
  });

  const handleSearchChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setSearchQuery(e.target.value);
  };


  const [ questions, setQuestions ] = useState<any>(articles);
  const [ totalItems, setTotalItems ] = useState(articles.length);

  useEffect(() => {
    if (data?.search?.posts) {
      setQuestions(data?.search?.posts);
      setTotalItems(data?.search?.totalItems);
    }
  }, [ data ]);

  console.log("Questions", questions)

  return (
    <>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-lg px-4 2xl:px-0">
          <div className="lg:flex lg:items-center lg:justify-between lg:gap-4">
            <h2 className="shrink-0 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Questions ({totalItems})</h2>

            <form className="mt-4 w-full gap-4 sm:flex sm:items-center sm:justify-end lg:mt-0">
              <label htmlFor="simple-search" className="sr-only">Search</label>
              <div className="relative w-full flex-1 lg:max-w-sm">
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                  <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 ps-9 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  placeholder="Renew driver's license, apply for a visa, etc."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  required
                />
              </div>

              <button type="button" data-modal-target="question-modal" data-modal-toggle="question-modal" className="mt-4 w-full shrink-0 rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:mt-0 sm:w-auto">Ask a question</button>
            </form>
          </div>

          <div className="mt-6 flow-root">
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {!loading && !error && (
              <div className="-my-6 divide-y divide-gray-200 dark:divide-gray-800">
                {questions?.map((question: IPost, index: Key | null | undefined) => {
                  const imageUrl = extractImageFromPostText({ user: false, postText: question.postText });
                  return (
                    <div key={index} className="space-y-4 py-6 md:py-8">

                      <div className="grid gap-4">
                        <div>
                          <span className="inline-block ">
                           { imageUrl && <img
                              src={imageUrl}
                              alt="unisala post"
                              className="w-full h-48 object-cover mb-4 rounded-lg border border-gray-300 dark:border-gray-600"
                            />}
                          </span>
                        </div>
                        <a href={ '/' + threadPointer(question)} className="text-xl font-semibold text-gray-900 hover:underline dark:text-white">
                          {question?.title
                            ? question?.title.replace(/<[^>]*>/g, '').substring(0, 100)
                            : question?.postText?.replace(/<[^>]*>/g, '').substring(0, 100)}
                          {(question?.title?.length > 100 || question?.postText?.length > 100) && '...'}
                        </a>
                      </div>
                      <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        {question?.postText?.replace(/<[^>]*>/g, '').substring(0, 200)}
                        {question?.postText?.length > 200 && '...'}
                      </p>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Answered
                        {question?.date ? ' ' + formatDate(question?.date) : 'No Date'}

                        {/* <a href="#" className="text-gray-900 hover:underline dark:text-white"> User Name</a> */}
                      </p>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* <div className="mt-6 flex items-center justify-center lg:justify-start">
            <button type="button" className="w-full rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto">View more questions</button>
          </div> */}
        </div>
      </section>
    </>
  );
};