import { useLazyQuery } from "@apollo/client"
 import { lazy, Suspense, useState } from "react"
import { Input, List, Row } from  "../../../../components/defaults"
 import { useDebouncedEffect } from "../../../../hooks/useDebouncedEffect"
import { USER_SERVICE_GQL } from "../../../../datasource/servers/types"
import {Search} from "../../../../datasource/graphql/user"
import {FeedSkeleton} from "../../../../components/packages/skeleton/feedSkeleton"
const AddPeopleForm = lazy(() => import("../../timeline/atoms/AddPeopleForm"))
const PeopleList = lazy(() => import("../../timeline/atoms/PeopleList"))

const AddPeople = ({ data: historyData, setdata }) => {
  const [query, setQuery] = useState("")

  const [SearchPeople, { data, loading }] = useLazyQuery(Search, {
    context: {
      server: USER_SERVICE_GQL
    },
    skip: true
  })

  const handleSearch = async () => {
    if (query.length > 0) {
      await SearchPeople({
        variables: {
          q: query
        }
      })
    }
  }

  useDebouncedEffect(handleSearch, [query, data], 500)

  return (
    <Row className="h-full flex-col w-full my-2 rounded-md">
      {historyData.events.length > 0 && (
        <List>
          {historyData.events.map((person) => (
            <Suspense fallback={<ListSkeleton />} key={person.username}>
              <AddPeopleForm
                key={person.username}
                {...person}
                setdata={setdata}
                data={historyData}
              />
            </Suspense>
          ))}
        </List>
      )}

      <br />
      <Input
        value={query}
        onIonChange={(e) => setQuery(e.target.value)}
        className="w-full rounded-md"
        placeholder="Search people..."
        type="search"
      />

      {loading && (
        <>
          <FeedSkeleton />
          <FeedSkeleton />
          <FeedSkeleton />
          <FeedSkeleton />
          <FeedSkeleton />
        </>
      )}

      <List className="ion-no-padding">
        {data &&
          !loading &&
          data?.search &&
          data?.search?.users.map((person) => (
            <Suspense fallback={<ListSkeleton />} key={person.username}>
              <PeopleList
                {...person}
                historyData={historyData}
                setdata={setdata}
              />
            </Suspense>
          ))}
      </List>
    </Row>
  )
}

export default AddPeople
