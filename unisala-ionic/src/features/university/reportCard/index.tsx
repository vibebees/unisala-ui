import {ReportTemplate} from "./reportTemplate"
import {getAllProps} from "./props"

export const ReportCard = ({dataSource, parentProps}) => {
    const allProps = getAllProps({dataSource, parentProps})
    return <ReportTemplate allProps={allProps} />
}
