import {IonText} from "@ionic/react"
import React from "react"

export const NoDataDefaultCard = (props) => {

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "400px",
                maxWidth: "600px",
                padding: "50px",
                margin: "auto",
                marginTop: "50px"
            }}
        >
            <img
                style={{
                    filter: "grayscale(100%)"
                }}
                src="https://cdn.iconscout.com/icon/free/png-256/university-2147728-1805825.png"
                alt=""
            />
            <IonText color="dark">
                <h1
                    style={{
                        fontSize: "2.5rem",
                        marginTop: "20px"
                    }}
                >
                    Oops!
                </h1>
            </IonText>
            <br />
            <IonText color="medium">
                <h2>No University found.</h2>
            </IonText>
        </div>
    )
}
