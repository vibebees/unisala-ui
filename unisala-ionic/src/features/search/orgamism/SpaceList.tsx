import CardTitle from "../../university/rectangularCardGrid/atoms/CardTitle"
import { SpaceOrgCard } from "../atoms/SpaceOrgCard"

export const SpaceList = ({ spaces, loading }) => {
  console.log({ spaces })
  return (
    <div>
      <h3 style={{ margin: "1rem", color: "#4d4d4d" }} className="font-medium">
        Spaces based on your search
      </h3>
      {spaces?.length ? (
        <div className="grid lg:grid-cols-3 gap-12 place-items-center">
          {spaces.map((space, index) => (
            <SpaceOrgCard type="space" data={space} key={index} />
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

