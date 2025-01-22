import { useState } from "react"
import { PostOptions } from "./molecules"
import ThreadExpand from "../organism/ThreadExpand"
import ImageCollage from "../ImageCollages"

export const ThreadContent = ({
  thread,
  editable,
  setEditable,
  deletePost
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
            maxLines={8}
            _id={_id}
            thread={thread}
          />
          {images.length > 0 && <ImageCollage images={images} />}
        </>
      )}
      <PostOptions setEditable={setEditable} deletePost={deletePost} />
    </div>
  )
}
