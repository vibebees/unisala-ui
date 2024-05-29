import React from "react"
import useIsData from "../../../../hooks//useIsData"
import { IonText } from "@ionic/react"
import useCountConverter from "../../../../hooks/useCountConverter"

const SingleCircularCard = ({ title, value, image }) => {
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
    <div
      style={{
        width: width > 720 ? "143px" : "135px",
        height: width > 720 ? "143px" : "135px"
      }}
      className="rounded-circle"
    >
      <div
        style={{
          borderRadius: "50%",
          width: "90%",
          height: "90%",

          boxShadow:
            " rgba(67, 71, 85, 0.67) 0px 0px 0.25em, rgba(90, 125, 188, 0.15) 0px 0.25em 1em",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "5px"
        }}
      >
        <img
          src={image}
          style={{
            width: width < 720 ? "20px" : "30px"
          }}
          alt=""
        />
        <div
          style={{
            textAlign: "center"
          }}
        >
          <IonText color="dark">
            {width < 720 ? (
              <h2
                style={{
                  margin: 0,
                  padding: 0
                }}
              >
                {useIsData(value) !== "N/A"
                  ? useCountConverter(value)
                  : useIsData(value)}
              </h2>
            ) : (
              <h1
                style={{
                  margin: 0,
                  padding: 0
                }}
              >
                {useIsData(value) !== "N/A"
                  ? useCountConverter(value)
                  : useIsData(value)}
              </h1>
            )}
          </IonText>

          <p className="px-3 !text-xs">{title}</p>
        </div>
      </div>
    </div>
  )
}

export default SingleCircularCard
