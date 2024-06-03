import React, { useEffect, useState, useContext } from "react"
import SingleList from "../atoms/SingleList"
import { authInstance } from "../../../../datasource/api/axiosInstance"
import { userServer } from "../../../../datasource/servers/endpoints"
import { ListContext } from ".."

const ListContainer = () => {
  const { setLists, lists, userId = "", isMyProfile } = useContext(ListContext)
  const getAllLists = async () => {
    const res = await authInstance.get(`${userServer}/get-all-list/${userId}`)
    if (res.data.success) {
      setLists(res.data.data)
    }
  }
  useEffect(() => {
    getAllLists()
  }, [])

  return (
    <div>
      {lists &&
        lists.length > 0 &&
        lists.map((list, index) => (
          <SingleList key={index} {...list} isMyProfile={isMyProfile} />
        ))}
    </div>
  )
}

export default ListContainer
