import React from 'react';
import "react-quill/dist/quill.snow.css";

export const CommentBody: React.FC<{ commentText: string }> = ({ commentText }) => (
  <div className="comment-body-wrapper">
    <style jsx>{`
      .comment-body-wrapper :global(.ql-editor) {
        padding: 0;
      }
      .comment-body-wrapper :global(.ql-editor p) {
        margin-bottom: 1em;
      }
      .comment-body-wrapper :global(.ql-editor ul),
      .comment-body-wrapper :global(.ql-editor ol) {
        padding-left: 1.5em;
        margin-bottom: 1em;
      }
      .comment-body-wrapper :global(.ql-editor li) {
        margin-bottom: 0.5em;
      }
      .comment-body-wrapper :global(.ql-editor ul > li) {
        list-style-type: disc;
      }
      .comment-body-wrapper :global(.ql-editor ol > li) {
        list-style-type: decimal;
      }
    `}</style>
    <div
      className="ql-editor"
      dangerouslySetInnerHTML={{ __html: commentText }}
    />
  </div>
);