import React, { useEffect } from "react"
import InfiniteFeed from "../../../components/packages/feed/Feed"
import { trackEvent } from "@components/analytics"
import { useAuth } from "@context/AuthContext";

export default function Review({ uniId }) {
  const {user} = useAuth();
  useEffect(() => {
    trackEvent({
      action: "Uni_page_reviews_viewed_by_"+ user?.id,
      category: "navigation",
      label: uniId
    })
  },[])
  return <InfiniteFeed feedType="uniWall" feedId={uniId} />
}
