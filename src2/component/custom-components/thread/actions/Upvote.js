import { useCallback, useState } from "react"
import { IonIcon, IonButtons, IonText, useIonToast } from "@ionic/react"
import { arrowUpCircle } from "ionicons/icons"
import { useMutation } from "@apollo/client"
import clsx from "clsx"
import { USER_SERVICE_GQL } from "servers/types"
import { UpVote } from "@graphql/user"

function Upvote({ upVoteCount, postId, upVoted, isReply }) {
  const [present, dismiss] = useIonToast()
  const [voted, setVoted] = useState({
    upVoted: upVoted,
    upVoteCount: upVoteCount
  })
  const [upVote] = useMutation(UpVote, {
    variables: { postId },
    context: { server: USER_SERVICE_GQL },
    update: (cache, { data: upVote }) => {
      cache.modify({
        id: cache.identify({
          __typename: isReply ? "Comment" : "Post",
          id: postId
        }),
        fields: {
          upVoteCount: (upVoteCount) => {
            return upVoted ? upVoteCount - 1 : upVoteCount + 1
          },
          upVoted: (upVoted) => !upVoted
        },
        broadcast: false
      })
    },
    onError: (error) => {
      present({
        duration: 3000,
        message: error.message,
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "primary",
        mode: "ios"
      })
    }
  })

  const debounce = (func) => {
    let timer
    return function (...args) {
      setVoted((prev) => ({
        ...prev,
        upVoted: !prev.upVoted,
        upVoteCount: prev.upVoted ? prev.upVoteCount - 1 : prev.upVoteCount + 1
      }))
      const context = this
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        timer = null
        func.apply(context, args)
      }, 2000)
    }
  }

  const debouncedClick = useCallback(debounce(upVote), [upVoted])

  return (
    <IonButtons
      className="post-button"
      onClick={debouncedClick}
      style={{ cursor: "pointer" }}
    >
      <IonIcon
        color={voted.upVoted ? "primary" : "medium"}
        style={{
          margin: "0px"
        }}
        icon={arrowUpCircle}
        className="text-2xl max-md:text-lg"
      />
      <IonText style={{ marginLeft: "5px" }}>
        <p
          style={{
            margin: "0px",
            padding: "0px"
          }}
          className={clsx(
            "block ",
            voted.upVoted ? "!text-blue-600 !font-medium" : "text-gray-600"
          )}
        >
          {voted.upVoteCount}
        </p>
      </IonText>
    </IonButtons>
  )
}

export default Upvote
