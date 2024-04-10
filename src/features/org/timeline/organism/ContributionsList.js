import { useQuery } from "@apollo/client"
 import { GetAllHistoryEvents } from "../../../../datasource/graphql/user"
 import Contribution from "../atoms/Contribution"
import {List, Typography} from "../../../../components/defaults"
import {ListSkeleton} from "../../../../components/packages/skeleton/ListSkeleton"
import {USER_SERVICE_GQL} from "../../../../datasource/servers/types"

const ContributionArray = [
  {
    id: 1,
    fullName: "John Doe",
    username: "johndoe",
    profilePic: "https://example.com/profile-pic-1.jpg",
    description: "John contributed to the event"
  },
  {
    id: 2,
    fullName: "Jane Smith",
    username: "janesmith",
    profilePic: "https://example.com/profile-pic-2.jpg",
    description: "Jane also contributed to the event"
  },
  {
    id: 3,
    fullName: "Bob Johnson",
    username: "bobjohnson",
    profilePic: "https://example.com/profile-pic-3.jpg",
    description: "Bob contributed to the event"
  },
  {
    id: 4,
    fullName: "Alice Brown",
    username: "alicebrown",
    profilePic: "https://example.com/profile-pic-4.jpg",
    description: "Alice did the decoration"
  },
  {
    id: 5,
    fullName: "Mike Wilson",
    username: "mikewilson",
    profilePic: "https://example.com/profile-pic-5.jpg",
    Mike: "Mick did the hosting"
  }
]

const ContributionsList = ({ _id }) => {
  const { data, loading } = useQuery(GetAllHistoryEvents, {
    context: {
      server: USER_SERVICE_GQL
    },
    variables: {
      orgHistoryId: _id
    }
  })

  if (loading) {
    return (
      <>
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
      </>
    )
  }

  console.log("contribution data", data?.getAllHistoryActivity?.data)

  return (
    <List>
      {data?.getAllHistoryActivity?.data &&
        data?.getAllHistoryActivity?.data.length > 0 &&
        data?.getAllHistoryActivity?.data.map((item) => (
          <Contribution key={item.id} {...item} />
        ))}

      {data?.getAllHistoryActivity?.data &&
        data?.getAllHistoryActivity?.data.length === 0 && (
          <Typography
            variant="h3"
            className="text-sm opacity-70 text-center mt-14"
          >
            No contributions yet
          </Typography>
        )}
    </List>
  )
}

export default ContributionsList
