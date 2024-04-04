import React from "react"
import { getAllProps } from "./getAllProps"
import { UniversityTemplate } from "./templates/university"
import { useParams } from "react-router"
import { useSelector } from "react-redux"
import { useQuery } from "@apollo/client"
import { getUpdatedSchoolInfo } from "../../../datasource/graphql/uni"
import { UNIVERSITY_SERVICE_GQL } from "../../../datasource/servers/types"

export const UniversityPage = () => {
  const { id } = useParams()

  const { loading, data } = useQuery(getUpdatedSchoolInfo({ name: id }), {
      variables: { name: id },
      context: { server: UNIVERSITY_SERVICE_GQL }
    }),
    { uniData, isSideBar } = useSelector((store) => store?.university),
    allProps = getAllProps({ id, loading, data, uniData, isSideBar })

  return <UniversityTemplate allProps={allProps} />
}
