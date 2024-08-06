import React, { useState, useEffect, useRef } from "react";

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

const ThreadExpand = ({
  htmlText,
  _id,
  tags,
  videoURL,
}: ThreadExpandProps) => {
  const [showSeeMore, setShowMore] = useState(true);
  const TextRef = useRef(null);
  let showSeeMoreOptionAtWordCount: number = 40;




  useEffect(() => {
    const wordCount = htmlText.split(" ").length;
    setShowMore(wordCount > showSeeMoreOptionAtWordCount);
  }, [htmlText, showSeeMoreOptionAtWordCount]);



  const PostBodyText = () => (
    <div
      className="ql-editor cursor-pointer"
      dangerouslySetInnerHTML={{ __html: htmlText }}
      ref={TextRef}
      onClick={(e: any) => {
        if (e.target.tagName === "A") {
          e.preventDefault();
          // window.open(e.target.href, "_blank");
        } else {
        //   history.push(`/thread/${_id}`);
        }
      }}
    />
  );


  return (
    <div>
      <PostBodyText />
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


    </div>
  );
};

export default ThreadExpand;