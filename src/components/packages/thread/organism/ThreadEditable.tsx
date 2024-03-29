import React from "react"
import { useMutation } from "@apollo/client"
import { useIonToast, Button } from "../../../defaults/index"
import { EditPost } from "../../../../datasource/graphql/user"
import { useState } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { useLocation } from "react-router-dom"
import { USER_SERVICE_GQL } from "../../../../datasource/servers/types"

const ThreadEditable = ({ _id, postText, setEditable }) => {
  const pathname = useLocation().pathname
  const [present, dismiss] = useIonToast()
  const [updatedData, setUpdatedData] = useState({
    postText,
    // images,
    postId: _id
  })

  const handleChange = (e) => {
    setUpdatedData((prev) => ({ ...prev, postText: e }))
  }

  const isHome = pathname === "/" || pathname === "/home"

  console.log({ updatedData })
  const [editPost] = useMutation(EditPost, {
    context: { server: USER_SERVICE_GQL },
    variables: { ...updatedData },

    update: (cache, { data }) => {
      cache.modify({
        id: cache.identify({
          __typename: isHome ? "PostNewsFeed" : "Post",
          id: _id
        }),
        fields: {
          postText() {
            return updatedData.postText
          }
        }
      })
    },
    onCompleted: (data) => {
      const { editPost } = data

      if (editPost?.status?.success) {
        setEditable(false)
        present({
          duration: 3000,
          message: "Post Updated",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios"
        })
      } else {
        present({
          duration: 3000,
          message: editPost.message,
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios"
        })
      }
    }
  })

  return (
    <div>
      <div className="h-[170px] max-[320px]:mb-20 max-md:mx-1 max-md:mb-14 mb-10 mx-3 mt-2 text-black relative">
        <ReactQuill
          theme="snow"
          onChange={handleChange}
          defaultValue={postText}
          className="h-full "
        />
      </div>

      <br />
      <Button
        fill="clear"
        className="ion-no-padding capitalize px-4 font-semibold text-black hover:bg-[#eae8e8] rounded-2xl transition ease delay-200"
        size="small"
        style={{ "--ripple-color": "transparent" }}
        onClick={() => setEditable(false)}
      >
        Cancel
      </Button>
      <Button
        className="ion-no-padding capitalize font-bold px-4 text-white bg-blue-500 rounded-2xl transition ease delay-200 hover:bg-blue-600"
        fill="clear"
        size="small"
        onClick={editPost}
        style={{ "--ripple-color": "transparent" }}
      >
        Save
      </Button>
    </div>
  )
}

export default ThreadEditable

