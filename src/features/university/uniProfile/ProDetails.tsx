// eslint-disable-next-line no-use-before-define
import React from "react"
import {
    IonCardContent,
    IonCardHeader, IonCol, IonGrid,
    IonIcon, IonRow
} from "@ionic/react"
import { heart, location } from "ionicons/icons"
import { useSelector } from "react-redux"
import useRating from "../../../hooks/useRating"

const ProDetails = () => {
    const [width, setWidth] = React.useState(window.innerWidth)
    const handleResize = () => {
        const { innerWidth } = window

        if (width !== innerWidth) {
            setWidth(innerWidth)
        }
    }
    React.useEffect(() => {
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    })
    const { uniData } = useSelector((store) => store?.university)
    return (
        <IonGrid className={width > 720 ? "ion-padding" : ""}>
            <IonRow>
                <IonCol>
                    <IonCardHeader className="UniProfile-Header">
                        <h1>{uniData?.elevatorInfo?.name}</h1>
                    </IonCardHeader>
                    <div className="inline-flex" >
                        <IonCardContent style={{ display: "flex", padding: "0 12px" }} >
                            <IonIcon
                                style={{
                                    fontSize: "20px",
                                    alignSelf: "center"
                                }}
                                className="ion-icon"
                                icon={location}
                            />
                            <p style={{ alignSelf: "center" }}>
                                {uniData?.elevatorInfo?.address?.city}
                            </p>
                        </IonCardContent>
                        <IonCardContent style={{ display: "flex", padding: "0 12px" }} >
                            <IonIcon
                                style={{
                                    fontSize: "20px",
                                    alignSelf: "center"
                                }}
                                color="danger"
                                className="ion-icon"
                                icon={heart}
                            />
                            <p style={{ alignSelf: "center" }}>
                                {useRating(uniData?.reviews || []) || "N/A"} Review
                            </p>
                        </IonCardContent>
                    </div>
                    {/* <IonCardContent>
                        <p
                            style={{
                                maxWidth: "500px",
                                minWidth: "250px"
                            }}
                        >
                            Southeastern Louisiana is a public university
                            located in Hammond, Louisiana. It is a mid-size
                            institution with an enrollment of 9,248
                            undergraduate students{" "}
                            <span
                                style={{
                                    fontWeight: 600,
                                    cursor: "pointer"
                                }}
                            >
                                ....Read More
                            </span>
                        </p>
                    </IonCardContent> */}
                </IonCol>
                {/* <IonCol
                    size="auto"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "auto"
                    }}
                    className="ion-padding"
                >
                    <section
                        style={{
                            width: "250px",
                            margin: "auto"
                        }}
                    >
                        <section style={{ display: "flex" }}>
                            <IonCol>
                                <IonButton
                                    color="light"
                                    style={{ width: "100%" }}
                                >
                                    <IonIcon
                                        color="dark"
                                        className="padding-lg"
                                        icon={share}
                                    />
                                    {"  "}
                                    <IonLabel className="ion-padding-start">
                                        Share
                                    </IonLabel>
                                </IonButton>
                            </IonCol>
                            <IonCol>
                                <IonButton
                                    color="light"
                                    style={{ width: "100%" }}
                                >
                                    <IonIcon icon={heart} />
                                    {"  "}

                                    <IonLabel className="ion-padding-start">
                                        Save
                                    </IonLabel>
                                </IonButton>
                            </IonCol>
                        </section>
                        <IonButton style={{ width: "100%" }}>
                            <p>Easy Apply</p>
                        </IonButton>
                    </section>
                </IonCol> */}
            </IonRow>
        </IonGrid>
    )
}
export default ProDetails
