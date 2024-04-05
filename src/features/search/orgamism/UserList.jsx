import CardTitle from "../../university/rectangularCardGrid/atoms/CardTitle"

import UserCard from "../../../components/packages/userCard"
export const UserResults = ({ users, loading }) => {
  return (
    <div>
      <h3 style={{ margin: "1rem", color: "#4d4d4d" }} className="font-medium">
        Users based on you search
      </h3>
      {users?.length ? (
        <div className="grid-3">
          {users.map((user, index) => (
            <UserCard
              key={index}
              profileBanner={user?.coverPicture}
              profileImg={user?.picture}
              name={user?.firstName + " " + user?.lastName}
              username={user?.username}
              location={user?.location}
              oneLineBio={user?.oneLineBio}
            />
          ))}
        </div>
      ) : (
        <CardTitle style={{ textAlign: "center", color: "#898989" }}>
          {loading ? "Loading..." : "Sorry! No result found"}
        </CardTitle>
      )}
    </div>
  )
}

