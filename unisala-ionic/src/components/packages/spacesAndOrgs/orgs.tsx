import { Card, Typography } from "@components/defaults"
import { IonSpinner } from "@ionic/react"
import { Suspense, lazy } from "react"
const TopOrgs = lazy(() => import("@components/packages/TopOrg/TopOrg"));

export const Orgs = () => {
    return (
        <Card className="overflow-y-auto ion-no-margin ion-no-padding my-3 max-h-[348px] BorderCard">
        <Typography
          variant="h6"
          color="dark"
          className="text-center w-full my-2 font-semibold sticky top-0 bg-white z-10"
        >
           Organizations
        </Typography>
        <Suspense fallback={<IonSpinner></IonSpinner>}>
          <TopOrgs />
        </Suspense>
      </Card>
    )
}