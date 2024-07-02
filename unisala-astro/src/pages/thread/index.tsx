import { useAstroQuery } from "@/datasource/apollo-client";
import { GetPostById } from "@/graphql/user";


const Thread = () => {
  const postId = "123"; // Replace this with the actual ID or pass it as a prop

  const { data, error, loading } = useAstroQuery(GetPostById, {
    variables: { id: postId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>{data.post.title}</h1>
      <p>{data.post.content}</p>
    </div>
  );
};

export default Thread;
