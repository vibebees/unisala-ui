
// import CreateSpace from "./createSpace/CreateSpace"
import React from "react"
import { Content, Text, Button, Row } from "../components/defaults"

const PageNotFound = ({ msg }) => {
  return (
    <Content color="light">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%"
        }}
      >
        <Text color="dark">
          <h1
            style={{
              fontSize: "2.5rem"
            }}
          >
            Oops!
          </h1>
        </Text>
        <br />
        <Text color="dark">
          <h6>{msg}</h6>
        </Text>
        <br />
        <Button routerLink="/home">Go Home</Button>
      </div>
    </Content>
  )
}

export const SpaceNotFound = () => {
  return (
    <Content color="light">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%"
        }}
      >
        <Text>
          <h1 className="text-2xl font-semibold">
            Oops! The space is not available
          </h1>
        </Text>

        <Text>
          <h5 className="text-lg font-medium">But, you can make your own 😃</h5>
        </Text>

        <Row className="mt-4">
          {/* <CreateSpace /> */}
        </Row>
      </div>
    </Content>
  )
}

export default PageNotFound