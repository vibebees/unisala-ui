import { IonAvatar, IonItem } from "@ionic/react"
import GalleryIcon from "Icons/GalleryIcon"
import { Col } from "component/ui"
import { useSelector } from "react-redux"
import { Avatar } from "../../Avatar"

export const PostCardForClick = () => {
  const { user } = useSelector((store) => store?.userProfile)

  return (
    <div
      style={{
        padding: "2px",
        cursor: "pointer"
      }}
    >
      <IonItem lines="none">
        <IonAvatar
          slot="start"
          style={{
            alignSelf: "center"
          }}
        >
          <Avatar username={user?.username} profilePic={user?.picture} />
        </IonAvatar>
        <input
          type="text"
          placeholder={"suggest univeristy"}
          className="searchInput bg-transparent border-none outline-none"
        />

        <Col size="auto">
          <IonItem lines="none">
            <GalleryIcon />
          </IonItem>
        </Col>
      </IonItem>
    </div>
  )
}
