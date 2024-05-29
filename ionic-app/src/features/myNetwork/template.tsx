import React from "react"
import Sidebar from "./sidebar"
import Requests from "./requests"
import useDocTitle from "../../hooks/useDocTitile"
import { Col, Grid, Row } from "../../components/defaults"

function index() {
  useDocTitle("My Network")
  const windowWidth = window.innerWidth

  return (
    <>
      <Grid className="max-width-container">
        <Row>


          <Col className="results-col">
            <Requests />
            {/* <Recommendations /> */}
          </Col>
        </Row>
      </Grid>
    </>
  )
}

export default index
