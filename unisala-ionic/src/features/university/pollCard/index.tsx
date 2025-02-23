import { Template } from "./template"
import { getAllProps } from "./props"

export const PollCard = ({ dataSource, parentProps }) => {
  const allProps = getAllProps({ dataSource, parentProps })

  return <Template allProps={allProps} />
}
