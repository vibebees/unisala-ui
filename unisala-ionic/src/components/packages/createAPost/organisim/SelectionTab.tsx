import React from "react"
import { Button } from "../../../defaults"
import { userInfo } from "../../../../utils/cache"
import { useSelector } from "react-redux"
import { trackEvent } from "@components/analytics"


const SelectionTab = ({ metaData, onClick }) => {
  const { user } =  useSelector(state => state.userProfile)
  return (
    <div className="grid place-items-center gap-y-8 mt-5">
      {metaData &&
        Object.keys(metaData).map((item, i) => {
          let postTypeSelectionIsValid = metaData[ item ]?.name
          if (!postTypeSelectionIsValid) {
            return ''
          }
          return ( <div key={i}>
            <Button
              className={`mt-0 hover:scale-95 transition-all ease-in`}
              onClick={() => {
                onClick(item)
                trackEvent({
                  action: 'AddPost_' + metaData[item]?.id + '_Selected',
                  category: 'AddPost',
                  label: metaData[item]?.name,
                  value: 1
                })
              }}
              color={metaData[item]?.color}
            >
              {metaData[item]?.name}
            </Button>
          </div>)
        })}
    </div>
  )
}

export default SelectionTab
