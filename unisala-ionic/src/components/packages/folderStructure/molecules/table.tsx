import React from "react"
import { Item, Label } from "../../../defaults/index"

export const Table = ({awards}) => {

  const obj = {
    title: "Awards",
    th1: "Name",
    th2: "Scholarship Amount",
    th3: "Scholarship Distribution"
  }
    return (

        <Item>
          <div className="flex flex-col py-2">
          <Label>{obj.title}</Label>
            <table className="mt-4">
              <thead className="border">
                <tr>
                  <th className="border !text-neutral-700 !text-sm font-semibold">
                  {obj.th1}
                  </th>
                  <th className="border !text-neutral-700 px-2 py-1 !text-sm font-semibold">
                  {obj.th2}
                  </th>
                  <th className="border !text-neutral-700 py-1 !text-sm font-semibold px-2">
                  {obj.th3}
                  </th>
                </tr>
              </thead>
              <tbody>
                {awards?.map((award, index) => (
                  <tr key={index}>
                    <td className="border text-center py-2 text-sm px-2">
                      {award.award_name}
                    </td>
                    <td className="border text-center py-2 text-sm px-2">
                      {award.scholarship_amount.amount}
                    </td>
                    <td className="border text-center py-2 text-sm px-2">
                      {award.scholarship_amount.disbursement_schedule}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Item>
      )

}
