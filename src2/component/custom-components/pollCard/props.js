import {useState} from "react"
import useIsData from "hooks/useIsData"

export const getAllProps = ({dataSource, parentProps}) => {

    const {uniData, isSideBar} = parentProps
     const [polls, setPolls] = useState(dataSource)

    return {
        uniData,
        useIsData,
        isSideBar,
        polls,
        setPolls
    }

}
