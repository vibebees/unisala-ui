 
import { gql } from "@apollo/client";

export const GetProfessor = gql`
    query GetProfessor(
      $unitId: Float!
      $page: Float!
      $major: String
      $overallRating: Float
    ) {
      getProfessors(
        unitId: $unitId
        page: $page
        major: $major
        overallRating: $overallRating
      ) {
        unitId
        overallRating
        ratings
        professorName
        subject
        levelOfDifficulty
        wouldTakeAgain
      }
    }
  `,
  getUpdatedSchoolInfo = (unitId: any, name: any) =>
    gql`
      query getUpdatedSchoolInfo($unitId: Float, $name: String) {
        getUpdatedSchoolInfo(unitId: $unitId, name: $name) {
          departmentRatings {
            unitId
            ratings_list
            subject
            overall_rating
            overall_rating
          }
          elevatorInfo {
            unitId
            name
            address {
              streetAddressOrPOBox
              city
              stateAbbreviation
              zipCode
            }
            calendar
            name
            alias
            urls {
              home
              financialAid
              admissions
              onlineApplication
              netPriceCalculator
            }
            highestLevelOfOffering
            undergraduateOffering
            graduateOffering
            grantsMedicalDegree
            hasHospital
            missionStatement
            bio
            briefAddress
            library {
              physicalBook
              physicalMedia
              digitalElectronicBook
              recordedYear
            }
            majors {
              title
              pollTotalGraduates
            }
            ownType
            pictures
            tags
          }
          studentCharges {
            id
            unitId
            undergraduate {
              inState {
                id
                tuition
                requiredFees
                perCreditHourCharge
              }
              outOfState {
                id
                tuition
                requiredFees
                perCreditHourCharge
              }
              inDistrict {
                id
                tuition
                requiredFees
                perCreditHourCharge
              }
              onCampus {
                id
                costOfAttendance {
                  inDistrict
                  inState
                  outOfState
                }
                roomAndBoard
                otherExpenses
              }
              offCampusWithFamily {
                id
                costOfAttendance {
                  inDistrict
                  inState
                  outOfState
                }
                roomAndBoard
                otherExpenses
              }
              offCampusNotWithFamily {
                id
                costOfAttendance {
                  inDistrict
                  inState
                  outOfState
                }
                roomAndBoard
                otherExpenses
              }
              booksAndSupplies
            }
            graduate {
              inState {
                id
                tuition
                requiredFees
                perCreditHourCharge
              }
              outOfState {
                id
                tuition
                requiredFees
                perCreditHourCharge
              }
              inDistrict {
                id
                tuition
                requiredFees
                perCreditHourCharge
              }
            }
            combinedChargeForRoomAndBoard
            undergraduateApplicationFee
            graduateApplicationFee
          }
          testScore {
            sat {
              submitted
              percentSubmitted
              readingWriting {
                percentile25
                percentile75
              }
              math {
                percentile25
                percentile75
              }
            }
            act {
              submitted
              percentSubmitted
              composite {
                percentile25
                percentile75
              }
              english {
                percentile25
                percentile75
              }
              math {
                percentile25
                percentile75
              }
            }
            year
            unitId
          }
          financialAid {
            unitId
            numberOfStudentInThatFall
            percentOfAllUndergraduatesInThatFall
            totalNumberOfUndergraduatesInThatFall
            inDistrict {
              numberOfStudents
              percentOfStudents
            }
            inState {
              numberOfStudents
              percentOfStudents
            }
            outOfState {
              numberOfStudents
              percentOfStudents
            }
            undergraudate {
              totalStudent
              studentLivingOnCampus
              studentLivingOffCampusWithFamily
              studentLivingOffCampusNotWithFamily
            }
            averageAmountAid
            year
          }
          studentsStats {
            unitId
            totalEnrollment
            undergraduateEnrollment
            graduateEnrollment
            firstTimeUndergraduates {
              inState
              outOfState
              foreignCountries
            }
            enrollmentByRace {
              grandTotal
              americanIndianOrAlaskaNative
              asian
              blackOrAfricanAmerican
              hispanic
              nativeHawaiianOrOtherPacificIslander
              white
              nonresidentAlien
            }
          }
          admissionInfo {
            unitId
            openAdmissionPolicy
            secondarySchoolGPA
            secondarySchoolRank
            schoolRecord
            collegePrepProgram
            recommendations
            competencies
            admissionTestScores
            toefl
            applicants {
              total
              men
              women
            }
            admissions {
              total
              men
              women
            }
            enrollees {
              total
              fullTime {
                total
                men
                women
              }
              partTime {
                total
                men
                women
              }
            }
            testScores {
              sat {
                submitted
                percentSubmitted
                readingWriting {
                  percentile25
                  percentile75
                }
                math {
                  percentile25
                  percentile75
                }
              }
              act {
                submitted
                percentSubmitted
                composite {
                  percentile25
                  percentile75
                }
                english {
                  percentile25
                  percentile75
                }
                math {
                  percentile25
                  percentile75
                }
              }
              year
              unitId
            }
            year
          }
          graduationRate {
            unitId
            totalCohort
            men
            women
            americanIndianOrAlaskaNative
            asian
            blackOrAfricanAmerican
            hispanic
            white
            twoOrMoreRaces
            raceEthnicityUnknown
            nonResidentAlien
          }
          scholarshipInfo {
            status {
              success
              message
            }
            scholarships {
              _id
              university_name
              unitId
              scholarship_name
              international_specific
              level
              scholarship_url
              transfer_specific
              gpa {
                min
                max
              }
              act {
                min
                max
              }
              sat {
                min
                max
              }
              awards {
                award_name
                scholarship_amount {
                  amount
                  disbursement_schedule
                }
              }
              non_score_eligibility_requirements
            }
          }
          similarSchools {
            unitId
            similarSchools {
              grade
              name
            }
            recommendedUniversity
          }
          userEvaluation {
            unitId
            rankings {
              rank
              title
              totalPlayers
            }
            report {
              academics
              average
              value
              diversity
              campus
              atheltics
              partyScene
              professors
              location
              dorms
              campusFood
              studentLife
              safety
            }
            reviews {
              rating
              type
              votes
            }
          }
          professors {
            _id
            unitId
            overallRating
            ratings
            professorName
            subject
            levelOfDifficulty
            wouldTakeAgain
          }
        }
      }
    `,
  UniSearchDataList = gql`
    query UniSearchDataList($name: String) {
      searchSchool(name: $name) {
        name
        unitId
        address {
          streetAddressOrPOBox
          city
          stateAbbreviation
        }
        alias
        ownType
        tags
        missionStatement
        graduateOffering
        undergraduateOffering
        pictures
      }
    }
  `,
  UniFilterResults = gql`
    query uniFilterResults(
      $pageSize: Int
      $page: Int
      $sat: RangeInput
      $act: RangeInput
      $major: String
      $graduateApplicationFee: RangeInput
      $undergraduateApplicationFee: RangeInput
      $graduateInStateTuitionFee: RangeInput
      $graduateOutOfStateTuitionFee: RangeInput
      $undergraduateInStateTuitionFee: RangeInput
      $undergraduateOutOfStateTuitionFee: RangeInput
      $undergraduateOnCampusInStateCostOfAttendance: RangeInput
      $undergraduateOnCampusOutOfStateCostOfAttendance: RangeInput
      $undergraduateOffCampusWithFamilyInStateCostOfAttendance: RangeInput
      $undergraduateOffCampusWithFamilyOutOfStateCostOfAttendance: RangeInput
      $undergraduateOffCampusNotWithFamilyInStateCostOfAttendance: RangeInput
      $undergraduateOffCampusNotWithFamilyOutOfStateCostOfAttendance: RangeInput
      $state: String
    ) {
      searchUniversity(
        pageSize: $pageSize
        page: $page
        sat: $sat
        act: $act
        major: $major
        graduateApplicationFee: $graduateApplicationFee
        undergraduateApplicationFee: $undergraduateApplicationFee
        graduateInStateTuitionFee: $graduateInStateTuitionFee
        graduateOutOfStateTuitionFee: $graduateOutOfStateTuitionFee
        undergraduateInStateTuitionFee: $undergraduateInStateTuitionFee
        undergraduateOutOfStateTuitionFee: $undergraduateOutOfStateTuitionFee
        undergraduateOnCampusInStateCostOfAttendance: $undergraduateOnCampusInStateCostOfAttendance
        undergraduateOnCampusOutOfStateCostOfAttendance: $undergraduateOnCampusOutOfStateCostOfAttendance
        undergraduateOffCampusWithFamilyInStateCostOfAttendance: $undergraduateOffCampusWithFamilyInStateCostOfAttendance
        undergraduateOffCampusWithFamilyOutOfStateCostOfAttendance: $undergraduateOffCampusWithFamilyOutOfStateCostOfAttendance
        undergraduateOffCampusNotWithFamilyInStateCostOfAttendance: $undergraduateOffCampusNotWithFamilyInStateCostOfAttendance
        undergraduateOffCampusNotWithFamilyOutOfStateCostOfAttendance: $undergraduateOffCampusNotWithFamilyOutOfStateCostOfAttendance
        state: $state
      ) {
        elevatorInfo {
          name
          unitId
          address {
            streetAddressOrPOBox
            city
            stateAbbreviation
          }
          alias
          ownType
          tags
          missionStatement
          graduateOffering
          undergraduateOffering
          pictures
        }

        studentCharges {
          undergraduateApplicationFee
          graduateApplicationFee
          undergraduate {
            inState {
              tuition
            }
            outOfState {
              tuition
            }
            offCampusWithFamily {
              costOfAttendance {
                inState
                outOfState
              }
              roomAndBoard
              otherExpenses
            }
            offCampusNotWithFamily {
              costOfAttendance {
                inState
                outOfState
              }
              roomAndBoard
              otherExpenses
            }
            onCampus {
              costOfAttendance {
                inState
                outOfState
              }
            }
          }
          graduate {
            inState {
              tuition
            }
            outOfState {
              tuition
            }
          }
        }
        overallRating
        totalPeopleVoted
      }
    }
  `,
  ScholarshipResults = gql`
    query ScholarshipResults(
      $pageSize: Int
      $page: Int
      $sat: RangeInput
      $act: RangeInput
      $gpa: RangeInput
    ) {
      searchScholarship(
        pageSize: $pageSize
        page: $page
        sat: $sat
        act: $act
        gpa: $gpa
      ) {
        status {
          success
          message
        }
        scholarships {
          _id
          university_name
          scholarship_name
          international_specific
          level
          transfer_specific
          scholarship_url
          gpa {
            max
            min
          }
          act {
            max
            min
          }
          sat {
            max
            min
          }
          awards {
            award_name
            scholarship_amount {
              amount
              disbursement_schedule
            }
          }
          non_score_eligibility_requirements
          unitId
          address {
            streetAddressOrPOBox
            city
            stateAbbreviation
          }
          calendar
          name
          alias
          urls {
            home
            financialAid
            admissions
            netPriceCalculator
            onlineApplication
          }

          highestLevelOfOffering
          undergraduateOffering
          graduateOffering
          grantsMedicalDegree
          grantsMedicalDegree
          hasHospital
          missionStatement
          bio
          briefAddress
          library {
            physicalBook
            physicalMedia
            digitalElectronicBook
            recordedYear
          }
          majors {
            title
            pollTotalGraduates
          }
          ownType
          pictures
          tags
        }
      }
    }
  `,
  searchDepartmentRatingForSchool = gql`
    query searchDepartmentRatingForSchool($subject: String, $unitId: Int) {
      searchDepartmentRatingForSchool(subject: $subject, unitId: $unitId) {
        unitId
        ratings_list
        subject
        overall_rating
        overall_rating
      }
    }
  `,
  ScholarshipV2 = gql`
    query searchScholarshipV2(
      $scholarshipType: ScholarshipTypeEnum
      $level: LevelTypeEnum
      $internationalSpecific: Boolean
      $transferSpecific: Boolean
      $forUndergraduate: Boolean
      $forGraduate: Boolean
      $gpa: RangeInput
      $act: RangeInput
      $sat: RangeInput
      $gre: RangeInput
      $gmat: RangeInput
      $page: Int
      $pageSize: Int
    ) {
      searchScholarshipV2(
        scholarshipType: $scholarshipType
        level: $level
        internationalSpecific: $internationalSpecific
        transferSpecific: $transferSpecific
        forUndergraduate: $forUndergraduate
        forGraduate: $forGraduate
        gpa: $gpa
        act: $act
        sat: $sat
        gre: $gre
        gmat: $gmat
        page: $page
        pageSize: $pageSize
      ) {
        unitId
        university_name
        scholarship_name
        scholarship_type
        international_specific
        level
        transfer_specific
        scholarship_url
        gpa {
          max
          min
        }
        act {
          max
          min
        }
        sat {
          max
          min
        }
        awards {
          award_name
          scholarship_amount {
            amount
            disbursement_schedule
          }
        }
        application_requirements
        application_deadline
        eligible_majors
        duration
        duration_description
        special_instructions
        non_score_eligibility_requirements
        stackable
        _id
      }
    }
  `;
