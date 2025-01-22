import { IonButton } from "@ionic/react"

const ApplyButton = () => {
  return (
    <div className="flex justify-center">
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSeSLalRwctWvHBgbSQzPiFMZxXqCuu7wYkZm9CRV_QcikbqFw/viewform"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full"
      >
        <IonButton
          className="w-full"
          color="primary"
          expand="block"
          shape="round"
          size="default"
        >
          Apply Now
        </IonButton>
      </a>
    </div>
  )
}

export default ApplyButton

