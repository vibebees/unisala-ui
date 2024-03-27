import InfiniteFeed from "../../../component/feed/Feed"

export default function Review({ uniId }) {
  return <InfiniteFeed feedType="uniWall" feedId={uniId} />
}
