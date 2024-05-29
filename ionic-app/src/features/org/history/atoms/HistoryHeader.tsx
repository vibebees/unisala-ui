import { Button, Col, Row, Text } from "@components/defaults"
import clsx from "clsx"
import AddHistory from "../../timeline/organism/AddHistory"
import React from "react"
const HistoryHeader = ({ setData }) => {
  const [showAddHistory, setshowAddHistory] = React.useState(false)

  return (
    <Row
      className={clsx("flex-col h-full", showAddHistory ? "mb-0" : "mb-5")}
    >
      <Row className="ion-no-margin mt-5 ion-no-padding items-center justify-between">
        <Col
          size="auto"
          className="w-full  h-full ion-no-margin ion-no-padding  px-0"
        >
          <Text className="text-neutral-950">
            <h2 className="text-center text-neutral-900 relative font-bold pl-1 text-lg">
              History of NSAS
            </h2>
          </Text>
        </Col>
        <Col size="auto" className="ion-no-padding ion-no-margin">
          <Button
            color={"primary"}
            fill="clear"
            className="capitalize bg-blue-100  rounded-md"
            onClick={() => setshowAddHistory(!showAddHistory)}
          >
            {showAddHistory ? "Cancel" : "Add History"}
          </Button>
        </Col>
      </Row>
      <Row
        className={clsx(
          "w-full  ion-no-margin  ion-no-padding overflow-hidden duration-200 transition-all ease-linear",
          showAddHistory ? "h-full" : "h-0"
        )}
      >
        <AddHistory setData={setData} />
      </Row>
    </Row>
  )
}

export default HistoryHeader
