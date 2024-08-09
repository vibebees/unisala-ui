import React, { useMemo } from 'react';
import { useAstroQuery } from "@/datasource/apollo-client";
import { SimilarThread } from "./similar.thread"
import { getNewsFeed } from "@/datasource/graphql/user";
import { USER_SERVICE_GQL } from "@/datasource/servers/types";

export const ThreadSuggestions = () => {
    const { loading, error, data } = useAstroQuery(getNewsFeed, {
        variables: {
            feedQuery: {
                feedType: "specificSpace",
                feedId: "650b292f076ea53586758b94",
                page: 0
            }
        },
        context: { server: USER_SERVICE_GQL },
    });

    const posts = useMemo(() => data?.fetchFeedV2.data || [], [data]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            <SimilarThread
                articles={posts}
                title="More from this space"
                titleDescription="We use an agile approach to test assumptions and connect with the needs of your audience early and often."
            />
        </>
    );
};