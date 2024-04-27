import InfiniteFeed from "@components/packages/feed/Feed";

function index({ userId, firstName }) {
  return <InfiniteFeed feedId={userId} feedType="user" />;
}

export default index;
