import * as React from "react"
export const PeopleIcon = ({ width = 25, height = 25, fill = "#747372" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill={fill}
    viewBox="0 0 24 24"
  >
    <circle cx={15} cy={6} r={3} fill={fill} opacity={0.4} />
    <ellipse cx={16} cy={17} fill={fill} opacity={0.4} rx={5} ry={3} />
    <circle cx={9.001} cy={6} r={4} fill={fill} />
    <ellipse cx={9.001} cy={17.001} fill={fill} rx={7} ry={4} />
  </svg>
)
