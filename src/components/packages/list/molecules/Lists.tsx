import React, { useState } from "react"
import SingleUniversityList from "../atoms/SingleUniversityList"
import { authInstance } from "../../../../datasource/api/axiosInstance"
import { userServer } from "../../../../datasource/servers/endpoints"
import { URLgetter } from "../../../../utils/lib/URLupdate"

const Lists = () => {
  const id = URLgetter("id")
  const [universitiesList, setUniversitiesList] = useState({
    data: [],
    id: ""
  })
  const getAllLists = async () => {
    const res = await authInstance.get(`${userServer}/get-list-details/${id}`)
    if (res.data.success) {
      setUniversitiesList({
        data: res.data.data.unitDetails,
        id: res.data.data._id
      })
    }
  }

  React.useEffect(() => {
    getAllLists()
  }, [])

  return (
    <div className="w-full">
      {universitiesList &&
        universitiesList.data.length > 0 &&
        universitiesList.data.map((list, index) => (
          <SingleUniversityList
            key={index}
            {...list}
            id={universitiesList.id}
            setUniversitiesList={setUniversitiesList}
          />
        ))}
      {universitiesList.length === 0 && (
        <div className="text-center text-lg">No universities found!</div>
      )}
    </div>
  )
}

export default Lists
