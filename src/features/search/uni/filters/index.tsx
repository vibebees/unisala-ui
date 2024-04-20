/* eslint-disable complexity */
import React from "react";
import { IonButton, IonCol, IonIcon, IonLabel, IonRow } from "@ionic/react";
import "./index.css";
import {
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
  useContext,
} from "react";
import { useLazyQuery } from "@apollo/client";
import { UNIVERSITY_SERVICE_GQL } from "../../../../datasource/servers/types";
import { searchGetSuccess } from "../../../../datasource/store/action";
import { useDispatch } from "react-redux";
import { statesArray } from "../../../../utils/lib/states";
import axios from "axios";
import RadioButtons from "@features/search/atoms/RadioButtons";
import RangeSelect from "../../atoms/RangeSelect";
import MulitiSelect from "../../atoms/MulitiSelect";
import AsyncSelect from "react-select/async";
import { useHistory } from "react-router-dom";
import {
  ACT_SCORE,
  APPLICATION_FEES,
  COA,
  SAT_SCORES,
  TUITION,
} from "./constants";
import { universityServer } from "../../../../datasource/servers/endpoints";
import { URLgetter, URLupdate } from "../../../../utils/lib/URLupdate";
import { search } from "ionicons/icons";
import { ExploreFilterPopupContext } from "../ExploreUniFilterPopupContext";
import { ThreadSkeleton } from "../../../../components/packages/skeleton/threadSkeleton";
import { UniFilterResults } from "../../../../datasource/graphql/uni";

function index({ setIsLoading, filterPage }) {
  const [isFiltered, setIsFiltered] = useState(false);
  const [selectedMajor, setSelectedMajor] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const ref = useRef();
  const [getUniversityResults, { data, loading, fetchMore }] = useLazyQuery(
    UniFilterResults,
    {
      context: { server: UNIVERSITY_SERVICE_GQL },
      fetchPolicy: "network-only",
    }
  );

  useEffect(() => {
    if (filterPage > 1 && isFiltered) {
      fetchMore({
        variables: {
          page: filterPage,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            searchUniversity: [
              ...prev.searchUniversity,
              ...fetchMoreResult.searchUniversity,
            ],
          };
        },
      });
    }
  }, [filterPage]);

  // const {popUp, closePopup} = useContext(ExploreFilterPopupContext)
  const popUp = false,
    closePopup = () => {};

  const parseRange = (rangeStr) => {
    const [min, max] = rangeStr.split("-").map(Number);
    return { min, max };
  };

  const buildFeeObject = (feeRange, degreePrefix) => {
    const feeObj = parseRange(feeRange);
    return {
      [`${degreePrefix}ApplicationFee`]: feeObj,
    };
  };

  const buildTuitionObject = (tuitionRange, degreePrefix, tuitionType) => {
    const tuitionObj = parseRange(tuitionRange);
    return {
      [`${degreePrefix}${tuitionType}TuitionFee`]: tuitionObj,
    };
  };

  const getAllQueryParams = (page) => {
    const queryObject = {
      page,
      sat: URLgetter("sat") ? parseRange(URLgetter("sat")) : undefined,
      act: URLgetter("act") ? parseRange(URLgetter("act")) : undefined,
      state: URLgetter("state"),
      major: URLgetter("major"),
    };

    const degree = URLgetter("deg");
    const degreePrefix = degree === "u" ? "undergraduate" : "graduate";

    const tutionLevel = URLgetter("loc");
    const tuitionType = tutionLevel === "I" ? "InState" : "OutOfState";

    const accomodation = URLgetter("acc");
    const family = URLgetter("fam");
    const applicationFee = URLgetter("af");
    const tuitionFee = URLgetter("tf");
    const CostOfAttendance = URLgetter("coa");

    if (applicationFee) {
      Object.assign(queryObject, buildFeeObject(applicationFee, degreePrefix));
    }

    if (tuitionFee) {
      Object.assign(
        queryObject,
        buildTuitionObject(tuitionFee, degreePrefix, tuitionType)
      );
    }

    if (CostOfAttendance) {
      const costKey = `${degreePrefix}${
        accomodation === "o" ? "OnCampus" : "OffCampus"
      }${
        family === "W" ? "WithFamily" : "NotWithFamily"
      }${tuitionType}CostOfAttendance`;
      queryObject[costKey] = parseRange(CostOfAttendance);
    }

    return queryObject;
  };

  useEffect(() => {
    setIsFiltered(true);
    const queryObject = getAllQueryParams(1);
    getUniversityResults({
      variables: {
        ...queryObject,
      },
    });
  }, [history.location.search]);

  useEffect(() => {
    const d = data?.searchUniversity?.map((item) => ({
      overallRating: item.overallRating,
      totalPeopleVoted: item.totalPeopleVoted,
      ...item.elevatorInfo,
      ...item.studentCharges,
    }));
    dispatch(searchGetSuccess(d));
  }, [data]);

  useLayoutEffect(() => {
    const majordata = URLgetter("major");
    if (majordata) {
      setSelectedMajor(majordata);
    } else {
      setSelectedMajor("Search a Major");
    }
  }, [history.location.search]);

  const customStyles = {
    menuList: (styles) => ({
      ...styles,
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      background: isFocused ? "#eeeee" : isSelected ? "#90EE90" : undefined,
      zIndex: 1,
    }),
    menu: (base) => ({
      ...base,
      zIndex: 100,
    }),
  };

  const fetchMajor = async (majorQuery = "") => {
    try {
      const response = await axios.get(
        `${universityServer}/keyword/majors/${
          majorQuery === "" ? "new" : majorQuery
        }/5`
      );
      return response.data.map((i) => ({
        value: i.name,
        label: i.name.toUpperCase(),
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const loadOptions = (inputVal, callback) => {
    let options;

    setTimeout(async () => {
      try {
        options = await fetchMajor(inputVal);
        callback(options);
      } catch (error) {
        console.error("Error loading options:", error);
      }
    }, 1000);
  };

  return (
    <div className="filter-card-wrapper mx-1 ">
      <>
        <div className="grid grid-cols-1 gap-5">
          <RadioButtons
            Label1={"Undergraduate"}
            Label2={"Graduate"}
            value1={"undergraduate"}
            value2={"graduate"}
            urlKey={"deg"}
            header={"Level of study"}
          />
          <RadioButtons
            Label1={"In State"}
            Label2={"Out State"}
            value1={"InState"}
            value2={"OutOfState"}
            urlKey={"loc"}
            header={"Level of tuition"}
          />

          <RadioButtons
            Label1={"On Campus"}
            Label2={"Off Campus"}
            value1={"onCampus"}
            value2={"OffCampus"}
            urlKey={"acc"}
            header={"Are you planning to stay"}
          />

          {URLgetter("acc") === "O" && (
            <RadioButtons
              Label1={"With roommates"}
              Label2={"Without roommates"}
              value1={"WithFamily"}
              value2={"NotWithFamily"}
              urlKey={"fam"}
              header={"Staying"}
            />
          )}
        </div>

        <div>
          <div>
            {/* <h2 className="search-control__label">Test scores</h2>
              <IonRow>
                <RangeSelect
                  Label={"SAT:"}
                  placeholder="Sat"
                  options={SAT_SCORES}
                  urlKey={"sat"}
                  showDollarSign={false}
                />
                <RangeSelect
                  Label={"ACT:"}
                  placeholder={"act"}
                  options={ACT_SCORE}
                  urlKey={"act"}
                  showDollarSign={false}
                />
              </IonRow> */}
          </div>

          <div className="search-control">
            <h2 className="search-control__label">Fees</h2>

            <IonRow className="w-full ">
              <IonCol>
                <RangeSelect
                  Label={"Application Fee"}
                  placeholder={"Application fee"}
                  options={APPLICATION_FEES}
                  urlKey={"af"}
                  showDollarSign={true}
                />
              </IonCol>
              <IonCol>
                <RangeSelect
                  Label={"Tution Fees"}
                  placeholder={"Tution Fee"}
                  options={TUITION}
                  urlKey={"tf"}
                  showDollarSign={true}
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <RangeSelect
                Label={"Cos of Attendence"}
                options={COA}
                showDollarSign={true}
                urlKey={"coa"}
                placeholder="Cost of Attendence"
              />
            </IonRow>
          </div>

          <div className="search-control">
            <h2 className="search-control__label mb-2">Major</h2>

            <AsyncSelect
              cacheOptions
              loadOptions={loadOptions}
              defaultOptions
              ref={ref}
              styles={customStyles}
              menuPlacement="top"
              placeholder="Start typing to .... Major"
              value={{
                value: selectedMajor,
                label: selectedMajor,
              }}
              className="mt-2"
              onChange={(e) => {
                const data = URLupdate("major", e.value);
                history.push({ search: data });
              }}
            />
          </div>

          <MulitiSelect
            options={statesArray}
            Label="State"
            URLkey={"state"}
            key={"stateselect"}
          />
        </div>
        <IonButton
          className="w-full flex-nowrap"
          color="success"
          onClick={closePopup}
        >
          <IonLabel>Search</IonLabel>
          <IonIcon icon={search}></IonIcon>
        </IonButton>
      </>
    </div>
  );
}

export default index;
