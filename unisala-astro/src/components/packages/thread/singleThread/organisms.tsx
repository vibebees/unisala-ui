import { useState } from "react"
import { PostOptions } from "./molecules"
import ThreadExpand from "../organism/ThreadExpand"
import ImageCollage from "../ImageCollages"

export const ThreadContent = ({
  thread,
  editable,
  setEditable,
  deletePost
}: {
  thread: any;
  editable: boolean;
  setEditable: (editable: boolean) => void;
  deletePost: () => void;
}) => {
  const [showOptions, setShowOptions] = useState(false)

  const { postText, images, _id } = thread

  return (
    <div className="thread_content">
      {editable ? (
        "test"
      ) : (
        <>
          <ThreadExpand
              htmlText={postText}
              _id={_id} tags={null}            // thread={thread}
          />
          {images.length > 0 && <ImageCollage images={images} />}
        </>
      )}
      <PostOptions setEditable={setEditable} deletePost={deletePost} />
    </div>
  )
}
