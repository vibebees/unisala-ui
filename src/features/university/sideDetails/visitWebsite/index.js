// eslint-disable-next-line no-use-before-define
import React from "react"
import { IonButton, IonCard, IonText } from "@ionic/react"
import IonWebPop from "./IonWebPop"
import { useSelector } from "react-redux"
import { CardHeader } from "component/Reusable/cardHeader"
import { Typography, Button } from "component/defaults"

const VisitWebsite = () => {
  const [popup, setPopup] = React.useState(false)
  const { uniData, isSideBar } = useSelector((store) => store?.university)

  return (
    !isSideBar?.visitWebsiteEmpty && (
      <IonCard
        style={{
          margin: "15px 0px 0px 0px"
        }}
        className="ion-margin-top"
      >
        {/* {popup && <WebsitePop setPopup={setPopup} />} */}

        <CardHeader header={"Visit Website"} />
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            minHeight: "300px",
            width: "100%"
          }}
        >
          <div
            style={{
              margin: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column"
            }}
          >
            {/* <img
                        style={{
                            width: 200,
                            opacity: 0.8
                        }}
                        alt=""
                        src="https://cdn-icons.flaticon.com/png/512/954/premium/954574.png?token=exp=1651841888~hmac=257d862bf1dca15bbef3b9ac9a87ee64"
                    /> */}
            <Typography variant="h3" className="text-neutral-900">
              Load our website
            </Typography>

            <Typography variant="p" className="text-neutral-500">
              for easy apply
            </Typography>
            <Button
              onClick={() => setPopup(true)}
              style={{
                margin: "10px 0px 0px 0px"
              }}
              fill="outline"
            >
              Load now
            </Button>
            <IonWebPop
              setPopup={setPopup}
              urls={uniData?.elevatorInfo?.urls}
              popup={popup}
            />
          </div>
        </div>
      </IonCard>
    )
  )
}
export default VisitWebsite
