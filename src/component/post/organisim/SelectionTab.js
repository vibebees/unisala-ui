import { Button } from "component/ui"
import { useSelector } from "react-redux"

const SelectionTab = ({ metaData, onClick }) => {
  const { user } = useSelector((store) => store?.userProfile)
  return (
    <div className="grid place-items-center gap-y-8 mt-5">
      {metaData &&
        Object.keys(metaData).map((item, i) => (
          <div key={i}>
            <Button
              className={`mt-0 hover:scale-95 transition-all ease-in`}
              onClick={() => {
                onClick(item)
              }}
              color={metaData[item]?.color}
            >
              {metaData[item]?.name}
            </Button>
          </div>
        ))}
    </div>
  )
}

export default SelectionTab
