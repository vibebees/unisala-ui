import React, { useState } from "react"
import { IonCard, IonRow, IonSearchbar } from "@ionic/react"
 import ProfessorCard from "../moecules/ProfessorCard"
import "./professors.css"
import { CardHeader } from "../../../../components/defaults"

const Professor = ({ allProps }) => {
  const [majorSearch, setMajorSearch] = useState("")
  const [newData, setNewData] = useState(allProps)

  const handleChange = (ev) => {
    const query = ev.target.value
    setMajorSearch(query)
    if (query.length === 0) {
      setNewData(allProps)
    } else {
      const newData = allProps.filter((item) =>
        item.professorName.toLowerCase().includes(query.toLowerCase())
      )
      setNewData(newData)
    }
  }

  if (allProps.length === 0) return null

  return (
    <>
      <IonCard
        className="ion-margin-top"
        style={{
          margin: "10px 0px 0px 0px"
        }}
      >
        <CardHeader header={"Professor"} />
        <div className="field-search-field">
          <IonSearchbar
            animated={true}
            debounce={1000}
            placeholder="Search Majors"
            onIonChange={(ev) => handleChange(ev)}
            value={majorSearch}
            style={{
              position: "relative",
              overflow: "inherit"
            }}
          ></IonSearchbar>
        </div>
        <IonRow>
          {newData?.map((item, index) => {
            return <ProfessorCard data={item} key={index} />
          })}
          {/* <div
            style={{
              borderTop: "1px solid #C4C4C4",
              width: "100%",
              display: "inline-flex",
              cursor: "pointer",
              padding: "8px 0"
            }}
          >
            <IonIcon
              style={{
                fontSize: "25px"
              }}
              icon={chevronBack}
            />
            <IonIcon
              style={{
                fontSize: "25px"
              }}
              icon={chevronForward}
            />
          </div> */}
        </IonRow>
        {!allProps?.length === 0 && (
          <IonRow>
            <h1 className="text-center pt-1 pb-1" style={{ width: "100%" }}>
              No data
            </h1>
          </IonRow>
        )}
      </IonCard>
    </>
  )
}

export default Professor
