import React, { useState, useEffect, useRef, FC } from "react";
import linkifyHtml from "linkify-html";
import clsx from "clsx";
import { LikeATag } from "../../tags";
import { Link, useHistory } from "react-router-dom";

interface ThreadExpandProps {
  htmlText: string;
  _id: string;
  tags: Array<{
    __typename?: "SpaceCategoryQuery";
    _id: string;
    name?: string;
    parentId?: string;
    image?: string;
    description?: string;
  } | null> | null;
  videoURL?: string | null;
}

const ThreadExpand: FC<ThreadExpandProps> = ({
  htmlText,
  _id,
  tags,
  videoURL,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const history = useHistory();
  const [showSeeMore, setShowMore] = useState(true);
  const TextRef = useRef(null);
  const showSeeMoreOptionAtWordCount: number = 40;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const trimText = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit)?.join(" ") + "...";
    }
    return text;
  };

  useEffect(() => {
    const wordCount = htmlText.split(" ").length;
    setShowMore(wordCount > showSeeMoreOptionAtWordCount);
  }, [htmlText, showSeeMoreOptionAtWordCount]);

  const linkifiedText = linkifyHtml(
    isExpanded ? htmlText : trimText(htmlText, showSeeMoreOptionAtWordCount),
    {
      defaultProtocol: "https",
      className: "custom-link",
      target: {
        url: "_blank", // Opens links in a new tab
      },
    }
  );

  const PostBodyText = () => (
    <div
      className="ql-editor cursor-pointer"
      dangerouslySetInnerHTML={{ __html: linkifiedText }}
      ref={TextRef}
      onClick={(e: any) => {
        if (e.target.tagName === "A") {
          e.preventDefault();
          window.open(e.target.href, "_blank");
        } else {
          history.push(`/thread/${_id}`);
        }
      }}
    />
  );

  const TagsList = () => (
    <div className="tags-container">
      {tags?.map((tag) => (
        <Link to={`/space/${tag?.name}`} key={tag?._id} className="tag-link">
          <LikeATag
            colorTitle="blue"
            colorValue="yellow"
            title="NSAS"
            value={"NSAS"}
            key={tag?._id}
          />
        </Link>
      ))}
    </div>
  );

  return (
    <div>
      <PostBodyText />
      <TagsList />
      {videoURL && (
        <div className="mobile-video-style">
          <iframe
            src={videoURL}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen={true}
            style={{ width: "100%", height: "auto", aspectRatio: "16 / 9" }}
          ></iframe>
        </div>
      )}

      {showSeeMore && (
        <button
          onClick={toggleExpand}
          className={clsx(
            " text-blue-700 ml-3  px-2 my-2 py-1 rounded-md hover:underline transition-colors duration-200 ease-linear text-sm "
          )}
        >
          {isExpanded ? "See Less" : "See More"}
        </button>
      )}
    </div>
  );
};

export default ThreadExpand;
