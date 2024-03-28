import { IonCol, IonList, IonText } from "@ionic/react"
import { shieldOutline } from "ionicons/icons"
import { SeeMoreButton } from "../molecules/seeMoreButton"
import { Table } from "../molecules/table"
import { IconAtom } from "../atoms/iconAtom"
import SeeMoreModal from "../modal"
import { DetailItem } from "../molecules/detailItem"
import clsx from "clsx"

export const FolderScholarship = ({ item, allProps, customHeight }) => {
  const {
      level = "",
      act = { min: "", max: "" },
      awards = [],
      sat = { min: "", max: "" },
      icon = shieldOutline,
      iconSize = 9,
      routing,
      folderSize = `text-${iconSize}xl text-blue-400`
      // eslint-disable-next-line camelcase
      // eslint-disable-next-line camelcase
    } = item,
    name = item?.scholarship_name || item?.name,
    nonScoreElegibilityReq = item?.non_score_eligibility_requirements || "",
    scholarshipUrl = item?.scholarship_url || "",
    {
      showDetails = false,
      detailsObj = {
        title: "Requirements",
        data: [
          {
            label: "SAT Score",
            value:
              sat.min === 0 && sat.max === 0 ? "N/A" : `${sat.min} - ${sat.max}`
          },
          {
            label: "ACT Score",
            value:
              act.min === 0 && act.max === 0 ? "N/A" : `${act.min} - ${act.max}`
          },
          {
            label: "Level",
            value: level
          },
          {
            label: "Scholarship Amount",
            value: awards && awards[0]?.scholarship_amount?.amount
          }
        ]
      }
    } = allProps

  const ModalData = (
    <div>
      <IonList>
        <DetailItem label="Scholarship Name" value={name} />
        <DetailItem label="Level" value={level} />
        <DetailItem label="ACT Score" value={`${act.min} - ${act.max}`} />
        <Table awards={awards} />
        <DetailItem label="SAT Score" value={`${sat.min} - ${sat.max}`} />
        <DetailItem
          label="Non Score Eligibility Requirements"
          value={nonScoreElegibilityReq}
        />
        <DetailItem
          label="Scholarship URL"
          value={
            <a
              href={scholarshipUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              {scholarshipUrl}
            </a>
          }
        />
      </IonList>
    </div>
  )

  return (
    <>
      <IonCol
        className={clsx(
          "h-80 bg-neutral-50 px-0 shadow-md rounded-md flex justify-center flex-col items-center min-w-[250px] !shrink-0"
        )}
      >
        <IconAtom icon={icon} className={folderSize} />
        <div className="w-full">
          <h3 className="text-center px-2 leading-5 text-lg !font-semibold text-neutral-700">
            {name}
          </h3>
          <IonCol className="items-start flex w-full flex-col gap-1">
            {showDetails && (
              <IonText className="font-medium text-neutral-600">
                {detailsObj.title}
              </IonText>
            )}
            {showDetails &&
              detailsObj?.data?.map((item, index) => (
                <IonText
                  key={index}
                  className="text-center !text-xs capitalize"
                >
                  {item.label} :{" "}
                  <span className="font-medium text-neutral-700">
                    {item.value}
                  </span>
                </IonText>
              ))}
          </IonCol>
        </div>
        {!routing && (
          <div className="border-t cursor-pointer w-full group hover:bg-neutral-100 border-neutral-200">
            <SeeMoreModal
              ModalButton={<SeeMoreButton />}
              ModalData={ModalData}
              scholarshipName={name}
            />
          </div>
        )}
      </IonCol>
    </>
  )
}
