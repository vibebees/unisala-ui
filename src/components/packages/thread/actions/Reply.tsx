import React from "react"
import { Icon, Buttons, Text } from "../../../defaults"
import { chatbubble } from "ionicons/icons"

function Reply({ repliesCount, setReply }) {
  return (
    <Buttons
      className="post-button cursor-pointer"
      onClick={() => setReply((state) => !state)}
    >
      <Icon
        color="medium"
        style={{
          margin: "0px"
        }}
        icon={chatbubble}
        className="text-2xl max-md:text-lg"
      />
      <Text style={{ marginLeft: "5px" }}>
        <p
          style={{
            margin: "0px",
            padding: "0px"
          }}
        >
          {repliesCount}
        </p>
      </Text>
    </Buttons>
  )
}

export default Reply
