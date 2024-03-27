const LeftArrow = ({ width = 30, height = 30, fill = "#747372", ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width={width}
    height={height}
    {...rest}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1}
      d="M4 12h10M4 12l4-4m-4 4 4 4"
    />
  </svg>
)
export default LeftArrow
