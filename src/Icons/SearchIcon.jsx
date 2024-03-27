import * as React from "react"
const SearchIcon = ({ width = 25, height = 25, fill = "#747372", ...rest }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <circle cx="11.5" cy="11.5" r="9.5" stroke="#1C274C" strokeWidth="1.5" />
    <path
      d="M18.5 18.5L22 22"
      stroke="#1C274C"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)
export default SearchIcon
