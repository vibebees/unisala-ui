/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react"
import Inputbox from "../atom/Inputbox"
import { useDebouncedEffect } from "hooks/useDebouncedEffect"
import { universityServer } from "servers/endpoints"
import { authInstance } from "api/axiosInstance"
import SearchResults from "./SearchResults"
import { WelcomeData } from ".."

const InputOptions = ({ metaData }) => {
  const { setWelcomeFormdata, welcomeFormdata } = useContext(WelcomeData)
  const [searchTerm, setSearchTerm] = useState("")
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getMajors = async () => {
    setIsLoading(true)
    try {
      const res = await authInstance.get(
        `${universityServer}/keyword/majors/${searchTerm}/4`
      )
      setResults(res.data)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const getUniversitites = async () => {
    setIsLoading(true)
    try {
      const res = await authInstance.get(
        `${universityServer}/keyword/schoolname/${searchTerm.trim()}/5`
      )
      setResults(res.data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  function handleInput() {
    if (metaData.id === "interestedSubjects") {
      getMajors()
    }
    if (metaData.id === "interestedUni") {
      getUniversitites()
    }
  }

  useDebouncedEffect(handleInput, [searchTerm], 2000)

  const handleClick = (e) => {
    const value = e.target.value
    if (metaData.id === "interestedSubjects") {
      const data = welcomeFormdata[metaData?.id]?.find((item) => item === value)
      if (!data) {
        let newdata = [...welcomeFormdata.interestedSubjects, value]
        setWelcomeFormdata((prev) => {
          return { ...prev, interestedSubjects: newdata }
        })
      } else {
        //remove the existing data from the array
        let newdata = welcomeFormdata.interestedSubjects.filter(
          (item) => item !== value
        )
        setWelcomeFormdata((prev) => {
          return { ...prev, interestedSubjects: newdata }
        })
      }
    }

    if (metaData.id === "interestedUni") {
      const data = welcomeFormdata[metaData?.id]?.find((item) => item === value)
      if (!data) {
        let newdata = [...welcomeFormdata.interestedUni, value]
        setWelcomeFormdata((prev) => {
          return { ...prev, interestedUni: newdata }
        })
      } else {
        //remove the existing data from the array
        let newdata = welcomeFormdata.interestedUni.filter(
          (item) => item !== value
        )
        setWelcomeFormdata((prev) => {
          return { ...prev, interestedUni: newdata }
        })
      }
    }
  }

  return (
    <div className="  w-full">
      <Inputbox
        setTerm={setSearchTerm}
        placeholder={metaData?.placeholder}
        value={searchTerm}
      />
      <SearchResults
        isLoading={isLoading}
        results={results}
        handleClick={handleClick}
        selectedValue={welcomeFormdata[metaData?.id]}
      />
    </div>
  )
}

export default InputOptions
