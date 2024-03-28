import {IonCard} from "@ionic/react"
import {CardHeader} from "component/Reusable/cardHeader"
import Typography from "component/defaults/Typography"
import {useSelector} from "react-redux"
import ApplicationCharge from "./template/ApplicationCharge"
import TableOne from "./template/TableOne"
import TableTwo from "./template/TableTwo"

const index = () => {
  const { uniData } = useSelector((store) => store?.university)

  const studentCharges = uniData?.studentCharges

  return (
    <>
      <IonCard
        style={{
          margin: "10px 0px 0px 0px "
        }}
        className="flex flex-col"
      >
        <CardHeader header="Student Charges" />
        <section className="w-full max-md:flex-col gap-3 flex px-5 py-4">
          <TableOne
            data={studentCharges?.undergraduate}
            level={"UndeGraduate"}
          />
          <TableOne data={studentCharges?.graduate} level={"Graduate"} />
        </section>
        <br />

        <section className="px-5 max-md:px-1 py-4 pb-7">
          <TableTwo
            data={studentCharges?.undergraduate}
            level={"UndeGraduate"}
          />

          <TableTwo data={studentCharges?.graduate} level={"Graduate"} />
        </section>
        <IonCard className="px-6 max-md:px-2 py-3 mb-10 bg-blue-400 text-white">
          <Typography variant="h3" className="font-semibold text-lg">
            Application Charges
          </Typography>

          <ApplicationCharge allProps={{ studentCharges: studentCharges }} />
        </IonCard>
      </IonCard>
    </>
  )
}

export default index

