import {lazy, useState} from "react"
import ReactQuill from "react-quill"
const UniversityList = lazy(() => import("../../custom-components/thread/UniversityList"))

const RichTextInput = ({
  value,
  onChange,
  showUniversityListOnAt,
  id = "rich-text-input",
  handleUniversitySelect,
  searchText
}) => {
  const [popoverOpen, setPopoverOpen] = useState(false)
  return (
    <div>
      <div className="h-full text-black relative">
        <ReactQuill
          theme="snow"
          id={id}
          value={value}
          onChange={(e) => {
            onChange(e)
          }}
          onKeyDown={(e) => {
            if (e.key === "@") {
              if (showUniversityListOnAt) {
                setPopoverOpen(true)
              }
            }
          }}
        />
      </div>
      <UniversityList
        setPopoverOpen={setPopoverOpen}
        popoverOpen={popoverOpen}
        searchText={searchText}
        handleUniversitySelect={(e) => handleUniversitySelect(e)}
      />
    </div>
  )
}

export default RichTextInput
