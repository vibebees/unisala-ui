import React from "react";
import "react-quill/dist/quill.snow.css";
import "./ThreadExpand.css";

interface ThreadExpandProps {
  htmlText: string;
  _id: string;
  tags: Array<{
    _id: string;
    name?: string;
    parentId?: string;
    image?: string;
    description?: string;
  } | null> | null;
  videoURL?: string | null;
}

const ThreadExpand: React.FC<ThreadExpandProps> = ({
  htmlText,
  _id,
  tags,
  videoURL,
}) => {
  const formatContent = (content: string) => {
    // Replace highlighted spans with emphasized text
    const formattedContent = content.replace(
      /<span style="background-color: #ffffff;">(.*?)<\/span>/g,
      '<em class="highlighted-text">$1</em>'
    );
    return formattedContent;
  };

  return (
    <div className="thread-expand-container">
      <div className="thread-expand-content">
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: formatContent(htmlText) }}
        />
      </div>
      {videoURL && (
        <div className="video-container">
          <iframe
            src={videoURL}
            title="Video content"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen={true}
          />
        </div>
      )}
    </div>
  );
};

export default ThreadExpand;