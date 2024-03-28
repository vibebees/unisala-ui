import {IonCardSubtitle, IonRow} from "@ionic/react"

export const LikeATag = ({colorTitle = "blue", colorValue = "yellow", title, value, skipBg = false}) => {
    const titleColorClass = `text-${colorTitle}-500 font-bold`
    const valueColorClass = `bg-${colorValue}-400 text-white rounded-full px-2 py-1`

    return (
      <IonRow style={{marginTop: "20px"}}>
        <IonCardSubtitle className={titleColorClass}>
          <span className="mr-2">{title}</span>
          <span className={skipBg ? "" : valueColorClass}>
            {value}
          </span>
        </IonCardSubtitle>
      </IonRow>
    )

  }
