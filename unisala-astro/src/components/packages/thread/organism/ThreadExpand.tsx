import linkifyHtml from "linkify-html";

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
  // const TextRef = useRef(null);
  // if the url includes thread then increase the word count to 100, else 40
  const showSeeMoreOptionAtWordCount: number = 40;




  // useEffect(() => {
  //   const wordCount = htmlText.split(" ").length;
  //   setShowMore(wordCount > showSeeMoreOptionAtWordCount);
  // }, [htmlText, showSeeMoreOptionAtWordCount]);

  const linkifiedText = linkifyHtml(
    htmlText,
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
      // ref={TextRef}
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
