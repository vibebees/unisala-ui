import { IonAvatar, IonCard } from "@ionic/react"
import { Avatar, Typography } from "../../defaults"

export const InterviewExperienceCard = ({ data = {}, key = 0 }) => {
  return (
    <div key={key} className="interview">
      <IonCard
        style={{
          padding: "10px 20px 10px 20px"
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "20px",
            borderBottom: "1px solid #C4C4C4",
            fontSize: "20px",
            marginBottom: "15px"
          }}
        >
          {data.university && (
            <p>
              University: <b>{data?.university}</b>
            </p>
          )}
          {data?.major && (
            <p>
              Major: <b>{data?.major}</b>
            </p>
          )}
          {data?.attempt && (
            <p>
              Attemp: <b>{data?.attempt}</b>
            </p>
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            maxWidth: "600px"
          }}
        >
          {data?.conversation
            ?.split(/me\s*:|vo\s*:|me\s+:|vo\s+-/i)
            .map((item, key) => {
              if (!item || item.trim() === "") return null
              return (
                <div
                  key={key}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px"
                  }}
                >
                  <IonAvatar
                    className="shrink-0"
                    style={{
                      width: "30px",
                      height: "30px"
                    }}
                  >
                    <Avatar username={key % 2 === 0 ? "VO" : "ME"} />
                  </IonAvatar>
                  <Typography variant="p">{item}</Typography>
                </div>
              )
            })}
        </div>
      </IonCard>
    </div>
  )
}
