import { SimilarThread } from "./similar.thread"
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
    return (
        <>
            <SimilarThread
                articles={articles}
                title="Paul Moore"
                titleDescription="We use an agile approach to test assumptions and connect with the needs of your audience early and often."
            />
             <SimilarThread
                articles={articles}
                title=" Recommended from Unisala"
                titleDescription="We use an agile approach to test assumptions and connect with the needs of your audience early and often."
            />
        </>
    )
}