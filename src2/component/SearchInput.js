// eslint-disable-next-line no-use-before-define
import React from "react"
import { IonIcon, IonInput } from "@ionic/react"
import { search } from "ionicons/icons"

export const SearchInput = () => {
    return (
        <div
            style={{
                width: "100%",
                position: "relative",
                overflow: "hidden"
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "0px",
                    height: "100%",
                    transform: "translate(0%, -50%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 9,
                    padding: "0px 10px",
                    cursor: "pointer"
                }}
            >
                <IonIcon
                    color="medium"
                    style={{
                        fontSize: "25px"
                    }}
                    icon={search}
                />
            </div>
            <input
                type="text"
                placeholder="Search"
                style={{
                    paddingLeft: "50px",
                    height: "40px"
                }}
                className="searchInput"
            />
        </div>
    )
}
export default SearchInput
