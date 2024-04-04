import React from "react"
import { useHistory } from "react-router"
import {Button} from "../../../../components/defaults"

const Tabs = () => {
  const params = new URLSearchParams(window.location.search)
  const history = useHistory()
  const q = params.get("tab")
  const setParams = (q) => {
    params.set("tab", q)
    history.push({
      search: params.toString()
    })
  }
  return (
    <div className="flex w-1/2 mx-auto">
      <Button
        className="flex-1 border-r-0"
        fill={q === "g" ? "solid" : "outline"}
        onClick={() => setParams("g")}
      >
        General
      </Button>
      <Button
        className="flex-1 "
        onClick={() => setParams("r")}
        fill={q === "r" ? "solid" : "outline"}
      >
        Reviews
      </Button>
    </div>
  )
}

export default Tabs
