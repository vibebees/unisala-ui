import { useAstroQuery } from "@/datasource/apollo-client";
import { Search } from "@/datasource/graphql/user";
import { USER_SERVICE_GQL } from "@/datasource/servers/types";
import type { IPost } from "@/types/post";
import { formatDate } from "@/utils/date";
import { extractImageFromPostText } from "@/utils/lib/image";
import { threadPointer } from "@/utils/lib/utils";
import { useEffect, useState, type SetStateAction } from "react";
import { ArticleCard } from "./articlecard";
import { navigator } from "@/utils/lib/URLupdate";

const CoreFeed = ({ articles }: { articles: IPost[] }) => {
  function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  }

  const [searchQuery, setSearchQuery] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get("q") || "";
  });
  const debouncedSearchQuery: string = useDebounce(searchQuery, 300);

  const { loading, error, data } = useAstroQuery(Search, {
    variables: { q: debouncedSearchQuery, post: true },
    context: { server: USER_SERVICE_GQL },
    skip: debouncedSearchQuery.length < 3,
  });

  const handleSearchChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchQuery(e.target.value);
  };

  const [questions, setQuestions] = useState<any>(articles);
  const [totalItems, setTotalItems] = useState(articles.length);

  useEffect(() => {
    if (data?.search?.posts) {
      setQuestions(data?.search?.posts);
      setTotalItems(data?.search?.totalItems);
    }
  }, [data]);

  // New effect to update URL when debouncedSearchQuery changes
  useEffect(() => {
    if (debouncedSearchQuery) {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set("q", debouncedSearchQuery);
      window.history.pushState({}, "", newUrl);
    } else {
      // Remove the 'q' parameter if the search query is empty
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("q");
      window.history.pushState({}, "", newUrl);
    }
  }, [debouncedSearchQuery]);

  // Rest of the component remains the same...
  const noItems = totalItems === 0;

  return (
    <section className="bg-white py-8  antialiased dark:bg-gray-900 md:py-16">
      <div className="md:mx-auto max-w-screen-lg md:px-4 2xl:px-0">
        <div className="flex flex-col items-center mb-8">
          {totalItems > 0 && (
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Questions ({totalItems})
            </h2>
          )}

          <form className="w-full max-w-2xl px-3 md:px-0">
            <label htmlFor="large-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4">
                <svg
                  className="h-5 w-5 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="large-search"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 md:p-4 ps-12 text-base text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                placeholder="Renew driver's license, apply for a visa, etc."
                value={searchQuery}
                onChange={handleSearchChange}
                required
              />
            </div>
          </form>

          {totalItems > 0 && (
            <button
              type="button"
              data-modal-target="question-modal"
              data-modal-toggle="question-modal"
              className="mt-4 w-full max-w-xs rounded-lg bg-primary-700 px-5 py-3 text-base font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              onClick={() => {
                navigator("/new-story?redirect=" + window.location.pathname);
              }}
            >
              Ask a question
            </button>
          )}
        </div>

        <div className="flow-root">
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}

          {!loading && !error && questions && questions.length > 0 && (
            <div className="-my-6 divide-y divide-gray-200 dark:divide-gray-800">
              {questions.map((article: IPost, index: number) => (
                <ArticleCard key={index} article={article} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CoreFeed;
