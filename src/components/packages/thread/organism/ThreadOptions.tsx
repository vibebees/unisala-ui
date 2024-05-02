import React from "react"
import { useMutation } from "@apollo/client"
import { IonIcon, useIonToast } from "@ionic/react"
import { DeletePost, getNewsFeed } from "../../../../datasource/graphql/user"
import { create, ellipsisHorizontalOutline, trash } from "ionicons/icons"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import { USER_SERVICE_GQL } from "../../../../datasource/servers/types"
import { userName } from "../../../../utils/cache"

const ThreadOptions = ({
  username,
  _id,
  setEditable,
  feedType,
  feedId
}: {
  username: string,
  _id: string,
  setEditable: Function,
  feedType: string,
  feedId: string
}) => {
  const pathname = useLocation().pathname
  const [showOptions, setShowOptions] = useState(false)
  const [present, dismiss] = useIonToast()
  const isHome = pathname === "/" || pathname === "/home"

  const [deletePost] = useMutation(DeletePost, {
    context: { server: USER_SERVICE_GQL },
    variables: {
      postId: _id
    },

    update: (cache, data) => {
      const cachedData = cache.readQuery({
        query: getNewsFeed,
        variables: {
          feedQuery: {
            feedType,
            page: 0,
            feedId
          }
        }
      })
      cache.writeQuery({
        query: getNewsFeed,
        variables: {
          feedQuery: {
            feedType,
            page: 0,
            feedId
          }
        },

        data: {
          fetchFeedV2: {
            ...(cachedData.fetchFeedV2.data || []),
            ...cachedData.fetchFeedV2.data.filter((post) => post._id !== _id)
          }
        }
      })
    },

    onCompleted: (data) => {
      const { deletePost } = data
      if (deletePost.success) {
        setShowOptions(false)
        present({
          duration: 3000,
          message: "Post Deleted",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios"
        })
      } else {
        present({
          duration: 3000,
          message: deletePost?.message
        })
      }
    }
  })

  if (userName === username) {
    return (
      <div className="absolute z-20 top-4 right-8">
        <div className="relative">
          <button onClick={() => setShowOptions((prev) => !prev)}>
            <IonIcon icon={ellipsisHorizontalOutline} className="text-2xl" />
          </button>

          {showOptions && (
            <div className="absolute w-[160px] -right-6 top-5 z-[100] bg-[#fafafa] rounded-xl px-6 py-4 shadow-xl">
              <button
                onClick={() => {
                  setEditable(true)
                  setShowOptions(false)
                }}
                className="w-full py-1.5 rounded-lg flex justify-center items-center gap-1 text-gray font-bold hover:bg-[#f1eeee]"
              >
                <IonIcon icon={create} className="text-xl" />
                Update
              </button>
              <button
                onClick={() => deletePost(_id)} // Assuming 'deletePost' is a function defined to handle the deletion
                className="w-full py-1.5 rounded-lg flex justify-center items-center gap-1.5 text-gray font-bold hover:bg-[#f1eeee]"
              >
                <IonIcon icon={trash} className="text-xl" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }
  return null
}

export default ThreadOptions

