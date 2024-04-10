// import StepInput from "../../component/roadmap/StepInput"
import { useQuery } from "@apollo/client"
 import { OrgContext } from "features/org"
 import { useContext } from "react"
import { USER_SERVICE_GQL } from "../../../datasource/servers/types"
import SingleTimeline from "./organism/SingleTimeline"
import {Grid} from "../../../components/defaults"
import {GetAllHistory} from "../../../datasource/graphql/user"

export const TimeLine = ({ year }) => {
  const { orgData } = useContext(OrgContext)
  const { data, loading, fetchMore } = useQuery(GetAllHistory, {
    context: { server: USER_SERVICE_GQL },
    variables: { orgId: orgData?._id, year: year }
  })
  return (
    <Grid
      style={{ maxWidth: "900px" }}
      className="w-full ion-no-margin ion-no-padding max-w-[900px]  h-full ion-no-margin  px-0 "
    >
      {/* <Row className=" !px-0  ion-no-margin ion-no-padding h-full rounded-md  pt-2">
        <Col className="w-full ion-no-margin ion-no-padding h-full ion-no-margin  px-0">
          {data?.getAllHistory?.data &&
            data?.getAllHistory?.data.map((item, index) => (
              <DateList
                key={index}
                date={new Date(item.date).getFullYear("YY-MM-DD")}
                content={item?.description}
              />
            ))}
        </Col>
      </Row> */}
      <SingleTimeline data={data?.getAllHistory?.data} />
    </Grid>
  )
}
