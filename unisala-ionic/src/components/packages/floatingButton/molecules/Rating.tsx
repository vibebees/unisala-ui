import React, { useState } from "react"
import clsx from "clsx"
import {
  Row,
  Col,
  Text
} from "../../../defaults/index"
import SingleEmojis from "../atoms/SingleEmojis"

let RatingData = [
  {
    value: 1,
    imageURL:
      "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Enraged%20Face.png",
    Emojis: "😡"
  },
  {
    value: 2,
    imageURL:
      "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Downcast%20Face%20with%20Sweat.png",
    Emojis: "😞"
  },
  {
    value: 3,
    imageURL:
      "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Neutral%20Face.png",
    Emojis: "😐"
  },
  {
    value: 4,
    imageURL:
      "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Beaming%20Face%20with%20Smiling%20Eyes.png",
    Emojis: "😊"
  },
  {
    value: 5,
    imageURL:
      "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Smiling%20Face%20with%20Heart-Eyes.png",
    Emojis: "😍"
  }
]

const Rating = ({ allProps }) => {
  const { feedBack, Setfeedback } = allProps
  const handleRatingChange = (value) => {
    Setfeedback({ ...feedBack, rating: value })
  }

  return (
    <Row className="flex-col">
      <Col size="lg" className=" w-full flex flex-col   ">
        <Text className="text-center w-full font-semibold text-lg">
          Please rate our website
        </Text>
        <Row className=" mt-1 mb-0 justify-center  ">
          {RatingData.map((data, index) => (
            <SingleEmojis
              key={index}
              allProps={{
                ...data,
                rating: feedBack.rating,
                handleRatingChange
              }}
            />
          ))}
        </Row>
      </Col>
    </Row>
  )
}

export default Rating
