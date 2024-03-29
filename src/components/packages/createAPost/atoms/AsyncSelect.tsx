import axios from "axios"
import { useEffect, useRef } from "react"
import { useLocation } from "react-router"
import AsyncSelect from "react-select/async"
import { universityServer } from "../../../../datasource/servers/endpoints"
import { htmlForEditor } from "../utils/htmlForEditor"

const AsyncSelectAtom = ({ item, setPostData, postData }) => {
  const ref = useRef()
  const majorController = useRef()
  const uniController = useRef()

  const universityName = useLocation().pathname.split("university/")[1]
  const params = new URLSearchParams(window.location.href)
  const customStyles = {
    menuList: (styles) => ({
      ...styles
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      background: isFocused ? "#eeeee" : isSelected ? "#90EE90" : undefined,
      zIndex: 1
    }),
    menu: (base) => ({
      ...base,
      zIndex: 100
    })
  }

  useEffect(() => {
    if (params.get("unitId")) {
      const postText = htmlForEditor(
        postData?.postText,
        "University 🏫",
        universityName
      )
      setPostData((prev) => ({
        ...prev,
        postText
      }))
    }
  }, [])

  const fetchMajor = async (majorQuery = " ") => {
    if (majorController.current) {
      majorController.current.abort()
    }
    majorController.current = new AbortController()
    try {
      const response = await axios.get(
        `${universityServer}/keyword/majors/${majorQuery}/5`,
        {
          signal: majorController.current.signal
        }
      )
      return response.data.map((i) => ({
        value: i.name,
        label: i.name.toUpperCase()
      }))
    } catch (error) {
      console.error("Error fetching data:", error)
      return []
    }
  }

  const fetechUni = async (uni = " ") => {
    if (uniController.current) {
      uniController.current.abort()
    }
    uniController.current = new AbortController()
    try {
      const response = await axios.get(
        `${universityServer}/keyword/schoolName/${uni}/5`,
        {
          signal: uniController.current.signal
        }
      )
      return response.data.map((i) => ({
        value: i.name,
        label: i.name.toUpperCase(),
        unitId: i?.unitId
      }))
    } catch (error) {
      console.error("Error fetching data:", error)
      return []
    }
  }

  const loadOptions = (inputVal, callback) => {
    let options

    setTimeout(async () => {
      try {
        if (item.id === "major") {
          options = await fetchMajor(inputVal)
        } else {
          options = await fetechUni(inputVal)
        }
        callback(options)
      } catch (error) {
        console.error("Error loading options:", error)
      }
    }, 1000)
  }
  return (
    <AsyncSelect
      cacheOptions
      loadOptions={loadOptions}
      styles={customStyles}
      menuPlacement="bottom"
      placeholder={item.placeholder || ""}
      ref={ref}
      defaultInputValue={item.id !== "major" ? universityName || "" : ""}
      onChange={(e) => {
        setPostData((prev) => {
          let obj = {
            ...prev
          }

          if (e?.unitId) {
            obj.unitId = e.unitId
          }
          const postText = htmlForEditor(postData?.postText, item.name, e.value)
          obj[item.id] = e.value

          obj.postText = postText
          return obj
        })
      }}
      className="mt-2"
    />
  )
}

export default AsyncSelectAtom

