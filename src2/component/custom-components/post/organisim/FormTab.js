import LeftArrow from "Icons/LeftArrow"
import { Button, Typography } from "component/defaults"

const FormTab = ({ metaData, selectedTab, setSelectedTab }) => {
  return (
    <div className="relative  flex">
      <Button
        fill="clear"
        className=" h-fit ion-no-margin ion-no-padding"
        onClick={() => {
          //   setPostData(null)
          setSelectedTab(null)
          //   params.delete("type")
          //   history.push({ search: params.toString() })
        }}
      >
        <LeftArrow />
      </Button>

      <div className=" flex items-center justify-center w-full  ion-no-margin ion-no-padding">
        <Typography
          variant="h3"
          className="text-center   ion-no-margin ion-no-padding"
        >
          {metaData[selectedTab]?.name}
        </Typography>
      </div>

      {/* <IonText>
    <h1 className="text-center mt-2 text-xl"></h1>
  </IonText> */}
    </div>
  )
}

export default FormTab
