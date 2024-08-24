import "react-quill/dist/quill.snow.css";

export const CommentBody: React.FC<{ commentText: string }> = ({ commentText }) => (
    <div
    className="ql-editor"
          dangerouslySetInnerHTML={{ __html: commentText }}
    />
  );