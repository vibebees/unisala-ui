import { useEffect, useState } from "react"
import { IonCard, IonButton } from "@ionic/react"
import { useQuery } from "@apollo/client"
import { GetInterviewExperience } from "@datasource/graphql/user"
import { USER_SERVICE_GQL } from "@datasource/servers/types"
 import { Button, CardHeader } from "@components/defaults"
import { InterviewExperienceCard } from "@components/packages/interviewExperienceCard"

export default function index({ unitId }) {
  const [page, setPage] = useState(1)
  const { data, loading, fetchMore } = useQuery(GetInterviewExperience, {
      variables: { unitId, page: 1, pageSize: 1 },
      context: { server: USER_SERVICE_GQL }
    }),
    [interviewExperiences, setInterviewExperiences] = useState([])

  useEffect(() => {
    setInterviewExperiences(data?.getInterviewExperience?.interviewExperience)
  }, [data])
  const fetchMoreHandler = () => {
    setPage(page + 1)
    fetchMore({
      variables: {
        unitId: unitId,
        page: page + 1,
        pageSize: 3
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev
        return Object.assign({}, prev, {
          getInterviewExperience: {
            ...prev.getInterviewExperience,
            interviewExperience: [
              ...prev?.getInterviewExperience?.interviewExperience??[],
              ...fetchMoreResult?.getInterviewExperience?.interviewExperience??[]
            ]
          }
        })
      }
    })
  }

  return (
    <IonCard style={{ margin: "15px 0px 0px 0px" }} className="ion-margin-top">
      <CardHeader header={"Interview Experience"} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px"
        }}
      >
        {!interviewExperiences?.length > 0 && (
          <h1
            style={{
              textAlign: "center",
              margin: "20px"
            }}
          >
            No data available
          </h1>
        )}
        {interviewExperiences?.length > 0 &&
          interviewExperiences.map((data, index) => {
            return <InterviewExperienceCard key={index} data={data} />
          })}

        <div className="flex justify-center pb-4">
          <Button size="small" onClick={fetchMoreHandler}>
            {loading ? "Loading" : "Load More Interview"}
          </Button>
        </div>
      </div>
    </IonCard>
  )
}
