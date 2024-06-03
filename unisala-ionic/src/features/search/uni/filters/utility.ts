import { URLgetter } from "../../../../utils/lib/URLupdate"

export const getAllQueryParams = (page) => {
    let queryObject = {}
    const degree = URLgetter("deg")
    const tutionLevel = URLgetter("loc")
    const accomodation = URLgetter("acc")
    const family = URLgetter("fam")
    const sat = URLgetter("sat")
    const act = URLgetter("act")
    const applicationFee = URLgetter("af")
    const CostOfAttendance = URLgetter("coa")
    const tuitionFee = URLgetter("tf")
    const state = URLgetter("state")
    const major = URLgetter("major")

    queryObject.page = page

    if (sat) {
      let newSat = sat.split("-")
      let newSatObj = {
        min: parseInt(newSat[0]),
        max: parseInt(newSat[1])
      }
      queryObject.sat = newSatObj
    }

    if (act) {
      let newAct = act.split("-")
      let newActObj = {
        min: parseInt(newAct[0]),
        max: parseFloat(newAct[1])
      }
      queryObject.act = newActObj
    }

    if (applicationFee) {
      let newApplicationFee = applicationFee.split("-")
      let newApplicationFeeObj = {
        min: parseInt(newApplicationFee[0]),
        max: parseInt(newApplicationFee[1])
      }
      if (degree === "u") {
        queryObject.undergraduateApplicationFee = newApplicationFeeObj
      } else if (degree === "g") {
        queryObject.graduateApplicationFee = newApplicationFeeObj
      }
    }

    if (tuitionFee) {
      let newTutionFee = tuitionFee.split("-")
      let newTutionFeeObj = {
        min: parseInt(newTutionFee[0]),
        max: parseInt(newTutionFee[1])
      }
      if (degree === "u") {
        if (tutionLevel === "I") {
          queryObject.undergraduateInStateTuitionFee = newTutionFeeObj
        } else if (tutionLevel === "O") {
          queryObject.undergraduateOutOfStateTuitionFee = newTutionFeeObj
        }
      } else if (degree === "g") {
        if (tutionLevel === "I") {
          queryObject.graduateInStateTuitionFee = newTutionFeeObj
        } else if (tutionLevel === "O") {
          queryObject.graduateOutOfStateTuitionFee = newTutionFeeObj
        }
      }
    }

    if (CostOfAttendance) {
      let newCostOfAttendence = CostOfAttendance.split("-")
      let newCostOfAttendenceObj = {
        min: parseInt(newCostOfAttendence[0]),
        max: parseInt(newCostOfAttendence[1])
      }
      if (degree === "u") {
        // oncampus
        if (accomodation === "o") {
          if (tutionLevel === "I") {
            queryObject.undergraduateOnCampusInStateCostOfAttendance =
              newCostOfAttendenceObj
          } else if (tutionLevel === "O") {
            queryObject.undergraduateOnCampusOutOfStateCostOfAttendance =
              newCostOfAttendenceObj
          }
          // offcampus
        } else if (accomodation === "O") {
          if (family === "W") {
            if (tutionLevel === "I") {
              queryObject.undergraduateOffCampusWithFamilyInStateCostOfAttendance =
                newCostOfAttendenceObj
            } else if (tutionLevel === "O") {
              queryObject.undergraduateOffCampusWithFamilyOutOfStateCostOfAttendance =
                newCostOfAttendenceObj
            }
          } else if (family === "N") {
            if (tutionLevel === "I") {
              queryObject.undergraduateOffCampusNotWithFamilyInStateCostOfAttendance =
                newCostOfAttendenceObj
            } else if (tutionLevel === "O") {
              queryObject.undergraduateOffCampusNotWithFamilyOutOfStateCostOfAttendance =
                newCostOfAttendenceObj
            }
          }
        }
      }
    }

    if (state) {
      queryObject.state = state
    }

    if (major) {
      queryObject.major = major
    }

    return queryObject
  }