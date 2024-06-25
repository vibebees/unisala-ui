// eslint-disable-next-line no-use-before-define
import React from "react"
import { IonButton, IonCard, IonText } from "@ionic/react"
import IonWebPop from "./IonWebPop"
import { useSelector } from "react-redux"
 import { Button, CardHeader, Typography } from "../../../../components/defaults"
import { trackEvent } from "@components/analytics"

const VisitWebsite = () => {
  const [popup, setPopup] = React.useState(false)
  const { uniData, isSideBar } = useSelector((store) => store?.university)

  return (
    !isSideBar?.visitWebsiteEmpty && (
      <IonCard
        style={{
          margin: '15px 0px 0px 0px'
        }}
        className='ion-margin-top'
      >
        {/* {popup && <WebsitePop setPopup={setPopup} />} */}

        <div
          style={{
            justifyContent: 'center',
            display: 'flex',
            alignItems: 'center',
            minHeight: '300px',
            width: '100%'
          }}
        >
          <div
            style={{
              margin: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column'
            }}
          >
            <Button
              onClick={() => {
                setPopup(true)
                trackEvent({
                  category: 'engagement_uni_website',
                  action: 'visit_uni_website',
                  label: uniData?.elevatorInfo?.name
                })
              }}
              style={{
                margin: '10px 0px 0px 0px'
              }}
              fill='outline'
            >
             Website
            </Button>
            <img alt='' src='/assets/uniwebsite.webp' />

            <Button
              onClick={() => {
                setPopup(true)
                trackEvent({
                  category: 'engagement_uni_website',
                  action: 'visit_uni_website_load_now',
                  label: uniData?.elevatorInfo?.name
                })
              }}
              style={{
                margin: '10px 0px 0px 0px'
              }}
              fill='outline'
            >
              Load now
            </Button>
            <IonWebPop
              setPopup={setPopup}
              urls={uniData?.elevatorInfo?.urls}
              popup={popup}
              tab={true}
            />
          </div>
        </div>
      </IonCard>
    )
  );
}
export default VisitWebsite
