import CardTitle from "../../university/rectangularCardGrid/atoms/CardTitle"
import { SpaceOrgCard } from "../atoms/SpaceOrgCard"

export const OrgList = ({ orgs, loading }) => {
  console.log({ orgs })
  return (
    <div className="">
      <h3 style={{ margin: "1rem", color: "#4d4d4d" }} className="font-medium">
        Organizations based on your search
      </h3>
      {orgs?.length ? (
        <div className="grid lg:grid-cols-3 gap-12 place-items-center">
          {orgs.map((org, index) => (
            <SpaceOrgCard type="org" data={org} key={index} />
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

