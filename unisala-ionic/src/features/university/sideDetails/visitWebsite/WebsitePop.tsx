// eslint-disable-next-line no-use-before-define
import React from "react"
import { IonIcon } from "@ionic/react"
import { closeCircle } from "ionicons/icons"

import Tabs from "./Tab"
import "./VisitWebsite.css"

const WebsitePop = ({ setPopup }) => {
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

    const [activeTab, setActiveTab] = React.useState(0)
    const HandleTabClick = (index) => {
        setActiveTab(index)
    }
    return (
        <div className="web-pop">
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <div
                    onClick={() => {
                        setPopup(false)
                    }}
                    id="web-pop-cancel"
                ></div>
                <div id="web-pop-content">
                    <div
                        onClick={() => {
                            setPopup(false)
                        }}
                        id="web-pop-close"
                    >
                        <IonIcon
                            style={{
                                fontSize: "30px"
                            }}
                            icon={closeCircle}
                        />
                    </div>
                    <div>
                        <Tabs
                            activeTab={activeTab}
                            HandleTabClick={HandleTabClick}
                        />
                    </div>

                    <iframe
                        src={
                            activeTab === 0
                                ? "https://www.southeastern.edu/"
                                : activeTab === 1
                                ? "https://www.southeastern.edu/apply/"
                                : activeTab === 2
                                ? "https://www.southeastern.edu/about/"
                                : activeTab === 3
                                ? "https://www.southeastern.edu/contact/"
                                : "https://www.southeastern.edu/"
                        }
                        title="W3Schools Free Online Web Tutorials"
                        style={{
                            width: "100%",
                            flex: 1,
                            border: "none"
                        }}
                    ></iframe>
                </div>
            </div>
        </div>
    )
}
export default WebsitePop
