import React from "react"
import { IonCard } from "@ionic/react"
import SeeMoreModal from "../../../../components/packages/reusable/modal"
import StatCard from "../organism/StatCard"
import ModalData from "../molecules/ModalData"
import SeeMoreButton from "../../../../components/packages/reusable/buttons/SeeMoreButton"
import { CardHeader } from "../../../../components/packages/reusable/cardHeader"

const StatCardTemplate = ({ allProps }) => {
  const { data, bodyTitle = "" } = allProps

  const firstData = [
    {
      title: " Men",
      value: `${data?.admissions?.men}`,
      image:
        "https://png.pngtree.com/png-vector/20221124/ourmid/pngtree-profile-boy-background-internet-vector-png-image_34761262.png"
    },
    {
      title: " Women",
      value: `${data?.admissions?.women}`,
      image:
        "https://png.pngtree.com/png-vector/20220326/ourmid/pngtree-woman-avatar-in-green-and-blue-colors-logo-and-flat-icon-vector-png-image_24086894.png"
    },
    {
      title: "Total Students",
      value: `${data?.admissions?.total}`,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNV112vuR-JpvBOkqCOz2wAyGUAFoWrZqRgw&usqp=CAU"
    }
  ]
  const SecondData = [
    {
      title: " Men",
      value: `${data?.admissions?.men}`,
      image:
        "https://png.pngtree.com/png-vector/20221124/ourmid/pngtree-profile-boy-background-internet-vector-png-image_34761262.png"
    },
    {
      title: " Women",
      value: `${data?.admissions?.women}`,
      image:
        "https://png.pngtree.com/png-vector/20220326/ourmid/pngtree-woman-avatar-in-green-and-blue-colors-logo-and-flat-icon-vector-png-image_24086894.png"
    },
    {
      title: "Total Students",
      value: `${data?.admissions?.total}`,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNV112vuR-JpvBOkqCOz2wAyGUAFoWrZqRgw&usqp=CAU"
    }
  ]

  return (
    <IonCard
      style={{
        margin: "10px 0px 0px 0px"
      }}
      className="flex flex-col"
    >
      <CardHeader
        header={bodyTitle}
        child={
          <SeeMoreModal
            ModalData={<ModalData />}
            ModalButton={<SeeMoreButton />}
          />
        }
      />

      <section className="grid grid-cols-2 gap-4">
        <StatCard
          allProps={{
            data: firstData,
            label: "Admissions"
          }}
        />
        <StatCard
          allProps={{
            data: SecondData,
            label: "Applicants"
          }}
        />
      </section>
    </IonCard>
  )
}

export default StatCardTemplate
