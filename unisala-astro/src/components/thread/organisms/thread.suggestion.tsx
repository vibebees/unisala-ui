import React, { useMemo } from 'react';
import { useAstroQuery } from "@/datasource/apollo-client";
import { SimilarThread } from "./similar.thread"
import { getNewsFeed } from "@/datasource/graphql/user";
import { USER_SERVICE_GQL } from "@/datasource/servers/types";

const articles = [
    {
        title: "How to quickly deploy a static website",
        description: "Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers.",
        author: "Jese Leos",
        avatar: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png",
        date: "14 days ago",
        category: "Tutorial",
        link: "#"
    },
    {
        title: "Our first project with React",
        description: "Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers.",
        author: "Bonnie Green",
        avatar: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png",
        date: "14 days ago",
        category: "Article",
        link: "#"
    },
    ,
    {
        title: "Our first project with React",
        description: "Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers.",
        author: "Bonnie Green",
        avatar: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png",
        date: "14 days ago",
        category: "Article",
        link: "#"
    }
];


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

    console.log({ posts });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
      <>
        <SimilarThread
            articles={posts}
            title="Paul Moore"
            titleDescription="We use an agile approach to test assumptions and connect with the needs of your audience early and often."
        />
        <SimilarThread
            articles={articles}
            title="Paul Moore1"
            titleDescription="We use an agile approach to test assumptions and connect with the needs of your audience early and often."
        />
        </>
    );
};