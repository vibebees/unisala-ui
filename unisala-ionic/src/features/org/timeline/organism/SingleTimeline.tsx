import React from "react"
import { Col, Row } from "@components/defaults"
import DateList from "../atoms/DateList"

const SingleTimeline = ({ data }) => {
  return (
    <Row className=" !px-0   ion-no-margin ion-no-padding h-full rounded-md  pt-2">
      <Col className="w-full ion-no-margin ion-no-padding h-full ion-no-margin  px-0">
        {data &&
          data.length > 0 &&
          data.map((item, index) => (
            <DateList
              key={index}
              date={new Date(item.date).toISOString().slice(0, 10)}
              content={item?.description || item?.title}
              _id={item._id}
            />
          ))}
      </Col>
    </Row>
  )
}

export default SingleTimeline
