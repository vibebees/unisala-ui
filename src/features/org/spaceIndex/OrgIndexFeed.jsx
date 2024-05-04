import Thread from "../../../component/thread"

const SpaceIndexFeed = ({ posts }) => {
  return (
    <>
      {Array.isArray(posts) &&
        posts.map((thread) => <Thread key={thread._id} thread={thread} />)}
    </>
  )
}

export default SpaceIndexFeed

