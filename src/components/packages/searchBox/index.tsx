import React, { useState, useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import { IonInput } from "@ionic/react"
import { useLazyQuery } from "@apollo/client"
import { UniSearchDataList } from "../../../datasource/graphql/uni"

import { SearchBarResultList } from "./searchResultList"
import "./index.css"
import { searchUniFromBar } from "../../../datasource/store/action/userActivity"
import { UNIVERSITY_SERVICE_GQL, USER_SERVICE_GQL } from "../../../datasource/servers/types"
import { userSearch } from "../../../datasource/graphql/user"
import { useDebouncedEffect } from "../../../hooks/useDebouncedEffect"
import { SearchIcon } from "../icons"
import { getCache } from "../../../utils/cache"

export const SearchBar = () => {
  const [ searchValue, setSearchValue ] = useState("")
  const [ dropDownOptions, setDropDownOptions ] = useState(false)
  const history = useHistory()
  const [ options, setOptions ] = useState([])
  const [ GetUni, unidata ] = useLazyQuery(UniSearchDataList, {
    context: { server: UNIVERSITY_SERVICE_GQL },
    skip: true
  })
  const [ GetUser, searchUser ] = useLazyQuery(userSearch(), {
    context: { server: USER_SERVICE_GQL },
    skip: true
  })
  const dropdownRef = useRef(null)
  const token = getCache('accessToken')

  const handleSearch = () => {
    if (searchValue) {
      GetUni({ variables: { searchValue } })
      // GetUser({ variables: { searchValue } })
    }
  }

  useDebouncedEffect(
    searchUniFromBar(searchValue, 5, setOptions, token),
    [ searchValue ],
    300
  )

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropDownOptions(false)
    }
  }

  useState(() => {
    window.addEventListener("mousedown", handleClickOutside)
    return () => {
      window.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <>
      <div className="search-box" style={{backgroundColor:"#000"}}>
        <IonInput
          type="text"
          placeholder="   Search universities, people..."
          className="search-input-box !pr-10 "
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              setDropDownOptions(false)
              history.push(searchValue ? `/search?q=${searchValue}` : "#")
              handleSearch(searchValue)
            }
          }}
          value={searchValue}
          onIonChange={(e) => {
            setSearchValue(e.detail.value)
            setDropDownOptions(true)
          }}
          onKeyDown={(e) => {
            if (searchValue && e.keyCode === 27) {
              setDropDownOptions(false)
            }
          }}
        />
        <Link
          to={searchValue ? `/search?q=${searchValue}` : "#"}
          className="search-box__search-icon flex justify-center items-center "
        >
          <SearchIcon onClick={() => setDropDownOptions(false)} />
        </Link>
      </div>
      {dropDownOptions && Array.isArray(options) && options.length > 0 && (
        <div
          className="recommend-search"
          ref={dropdownRef}
          style={{
            zIndex: 1000 // ensure it's above other content
          }}
        >
          {Array.isArray(options) &&
            options.map((item, i) => (
              <SearchBarResultList
                item={item}
                key={i}
                setDropDownOptions={setDropDownOptions}
              />
            ))}
        </div>
      )}
    </>
  )
}
