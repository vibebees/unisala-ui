import { callSocket } from "../servers/endpoints"

const moment = require("moment")
export const
 generateHourValues = () => {
    const today = moment().startOf("day")
    const isEvenDay = today.date() % 2 === 0
    const hours = []

    for (let i = 0; i < 24; i++) {
      if ((isEvenDay && i % 2 === 0) || (!isEvenDay && i % 2 !== 0)) {
        hours.push(i?.toString()?.padStart(2, "0"))
      }
    }

    return hours
  },
  mintueOptions = "0",
  hourOptions = "10 12 14 16 18 20 22"
