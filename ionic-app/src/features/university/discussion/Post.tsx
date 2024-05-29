import React from "react"
import InfiniteFeed from "../../../components/packages/feed/Feed"

export default function Review({ uniId }) {
  return <InfiniteFeed feedType="uniWall" feedId={uniId} />
}
