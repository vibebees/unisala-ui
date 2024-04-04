// eslint-disable-next-line no-use-before-define
import React from "react"
import { IonGrid, IonRow, IonItem, IonLabel, IonIcon } from "@ionic/react"
import {
    atCircleOutline,
    homeOutline,
    information,
    readerOutline
} from "ionicons/icons"

const Tabs = ({ activeTab, HandleTabClick }) => {
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
    return (
        <IonGrid
            style={{
                margin: "auto",
                width: "100%"
            }}
            className="w-full"
        >
            <IonRow
                size="auto"
                style={{
                    margin: "0px",
                    justifyContent: "center"
                }}
                className=""
            >
                {[
                    {
                        name: "Home",
                        icons: homeOutline
                    },
                    {
                        name: "Apply",
                        icons: readerOutline
                    },
                    {
                        name: "Aid",
                        icons: information
                    },
                    {
                        name: "admissions",
                        icons: atCircleOutline
                    }
                ].map((tab, index) => {
                    return (
                        <IonItem
                            lines="none"
                            size={width > 720 && "auto"}
                            style={{
                                textAlign: "center",
                                borderBottom: "2px solid",
                                borderColor:
                                    activeTab === index ? "#3880ff" : "#e0e0e0",
                                padding: "0px 2%",
                                cursor: "pointer",
                                transition: "all 0.3s ease-in-out"
                            }}
                            key={index}
                            onClick={() => {
                                HandleTabClick(index)
                            }}
                        >
                            <IonIcon
                                style={{
                                    color:
                                        activeTab === index
                                            ? "#3880ff"
                                            : "#e0e0e0",
                                    fontSize: "1.2rem"
                                }}
                                color={
                                    activeTab === index ? "primary" : "medium"
                                }
                                icon={tab.icons}
                            />
                            <IonLabel
                                color={activeTab === index ? "primary" : "dark"}
                            >
                                <p
                                    style={{
                                        fontSize: "1rem",
                                        margin: "0px",
                                        marginLeft: "10px"
                                    }}
                                >
                                    {tab.name}
                                </p>
                            </IonLabel>
                        </IonItem>
                    )
                })}
            </IonRow>
        </IonGrid>
    )
}
export default Tabs
