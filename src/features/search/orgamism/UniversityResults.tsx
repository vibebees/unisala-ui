import CourseCard from "../../../components/packages/userCard"
import CardTitle from "../../university/rectangularCardGrid/atoms/CardTitle"
import { Link } from "react-router-dom"

export const UniversityResults = ({ universities, loading }) => {
  return (
    <div>
      <h3 style={{ color: "#4d4d4d" }}>Universities</h3>
      <div>
        {universities?.length ? (
          universities?.map((data, index) => (
            <Link to={`/university/${data?.name}`} key={index}>
              <CourseCard allProps={data} />
            </Link>
          ))
        ) : (
          <CardTitle style={{ textAlign: "center", color: "#898989" }}>
            {!loading && " Sorry! No result found."}
          </CardTitle>
        )}
      </div>
    </div>
  )
}

