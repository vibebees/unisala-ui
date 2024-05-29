import {IonCol, IonGrid, IonRow} from "@ionic/react"

const events = [
    {
      id: 1,
      title: "Independence Sicilian Heritage Festival",
      image: "path_to_sicilian_festival_image.jpg",
      date: "Fri, Mar 8 - Mar 10",
      location: "307 E Railroad Ave, Independence, LA",
      interestCount: 697,
      goingCount: 58
    },
    {
      id: 2,
      title: "Puppy Love Dog Parade by Krewe du Pooch",
      image: "path_to_puppy_love_parade_image.jpg",
      date: "Sat, Feb 17 at 12 PM CST",
      location: "Mandeville Lakefront",
      interestCount: 2900,
      goingCount: 219
    },
    {
      id: 3,
      title: "Amite Oyster Festival",
      image: "path_to_amite_oyster_festival_image.jpg",
      date: "Fri, Mar 15 - Mar 17",
      location: "The Amite Oyster Festival",
      interestCount: 1800,
      goingCount: 157
    }
    // ... more events
  ]
export const Event = () => (
    <IonGrid>
      <IonRow>
        {events.map((event, index) => (
          <IonCol
            key={event.id}
            sizeXs="12"
            sizeSm="6"
            sizeMd="4"
            sizeLg="4"
            sizeXl="4">
            <EventCard
              title={event.title}
              image={event.image}
              date={event.date}
              location={event.location}
              interestCount={event.interestCount}
              goingCount={event.goingCount}
            />
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
  )

  export const EventCard = ({ title, image, date, location, interestCount, goingCount }) => (
    <div className="event-card">
      <img src={image} alt={title} />
      <div className="event-info">
        <h2>{title}</h2>
        <p>{date}</p>
        <p>{location}</p>
        <div className="event-stats">
          <span>{interestCount} interested</span>
          <span>{goingCount} going</span>
        </div>
      </div>
      <button className="interested-button">Interested</button>
    </div>
  )

