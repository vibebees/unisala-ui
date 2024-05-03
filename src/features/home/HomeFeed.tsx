import CourseCard from "../../../component/courseCard";
import Thread from "../../../component/thread";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { USER_SERVICE_GQL } from "servers/types";
import { getNewsFeed } from "graphql/user";

const HomeFeed = ({ userInfo }) => {
  const { user } = useSelector((store) => store?.userProfile);
  const { data, loading, error } = useQuery(getNewsFeed, {
    context: { server: USER_SERVICE_GQL },
    variables: {
      feedQuery: {
        userId: user._id,
        page: 1,
        pageSize: 10,
        feedType: "newsfeed",
        // include other necessary fields as per FeedQueryInput definition
      },
    },
  });

  return (
    <>
      <div style={{ margin: "10px 0px 0px 0px" }}>
        {Array.isArray(data?.fetchMyNewsFeed) &&
          data?.fetchMyNewsFeed?.map((post, index) => {
            if (!post) {
              return "";
            }
            return post.type === "uni" ? (
              <Link key={index} to={`/university/${post?.name}`}>
                <CourseCard allProps={post} />
              </Link>
            ) : (
              <div
                style={{
                  width: "100%",
                  marginTop: "10px",
                }}
                key={index}
              >
                <Thread thread={post} id={post?._id} />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default HomeFeed;
