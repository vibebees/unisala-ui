// eslint-disable-next-line no-use-before-define
import React from "react"
import { IonCol, IonGrid, IonRow, IonText } from "@ionic/react"

export const BadgesTab = ({ activeTab, setActiveTab }) => {
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
                    margin: "auto",
                    justifyContent: "center"
                }}
                className=""
            >
                {[
                    {
                        name: "Up for Grabs"
                    },

                    {
                        name: "Owned"
                    }
                ].map((tab, index) => {
                    return (
                        <IonCol
                            style={{
                                textAlign: "center",
                                borderBottom: "2px solid",
                                borderColor:
                                    activeTab === index ? "#3880ff" : "#c4c4c4",
                                padding: "5px 3%",
                                cursor: "pointer",
                                transition: "all 0.3s ease-in-out"
                            }}
                            key={index}
                            onClick={() => {
                                setActiveTab(index)
                            }}
                        >
                            <IonText
                                color={activeTab === index ? "primary" : "dark"}
                            >
                                <p
                                    style={{
                                        transition: "all 0.3s ease-in-out"
                                    }}
                                >
                                    {tab.name}
                                </p>
                            </IonText>
                        </IonCol>
                    )
                })}
            </IonRow>
        </IonGrid>
    )
}
export default BadgesTab
