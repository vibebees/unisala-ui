/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable complexity */
import React from "react";
import { IonIcon, IonLabel } from "@ionic/react";
import "./index.css";
import { useEffect, useLayoutEffect, useState } from "react";
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
import { APPLICATION_FEES, COA, TUITION } from "./constants";
import { universityServer } from "../../../../datasource/servers/endpoints";
import { URLgetter, URLupdate } from "../../../../utils/lib/URLupdate";
import { search } from "ionicons/icons";
import { ThreadSkeleton } from "../../../../components/packages/skeleton/threadSkeleton";
import { UniFilterResults } from "../../../../datasource/graphql/uni";
import { Button } from "@components/defaults";
import { motion } from "framer-motion";

function index({
  setIsLoading,
  filterPage,
}: {
  setIsLoading: any;
  filterPage: number;
}) {
  const [isFiltered, setIsFiltered] = useState(false);
  const [selectedMajor, setSelectedMajor] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const [getUniversityResults, { data, fetchMore }] = useLazyQuery(
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

  const closePopup = () => {};

  const parseRange = (rangeStr: string) => {
    const [min, max] = rangeStr.split("-").map(Number);
    return { min, max };
  };

  const buildFeeObject = (feeRange: string, degreePrefix: string) => {
    const feeObj = parseRange(feeRange);
    return {
      [`${degreePrefix}ApplicationFee`]: feeObj,
    };
  };

  const buildTuitionObject = (
    tuitionRange: string,
    degreePrefix: string,
    tuitionType: string
  ) => {
    const tuitionObj = parseRange(tuitionRange);
    return {
      [`${degreePrefix}${tuitionType}TuitionFee`]: tuitionObj,
    };
  };

  const getAllQueryParams = (page: number) => {
    const satLocal = URLgetter("sat");
    const actLocal = URLgetter("act");
    const queryObject = {
      page,
      sat: satLocal ? parseRange(satLocal) : undefined,
      act: actLocal ? parseRange(actLocal) : undefined,
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
      }${tuitionType}CostOfAttendance` as keyof typeof queryObject;

      queryObject[costKey] = parseRange(CostOfAttendance) as never;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.location.search]);

  useEffect(() => {
    const d = data?.searchUniversity?.map((item) => ({
      overallRating: item.overallRating,
      totalPeopleVoted: item.totalPeopleVoted,
      ...item.elevatorInfo,
      ...item.studentCharges,
    }));
    dispatch(searchGetSuccess(d));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    menuList: (styles: any) => ({
      ...styles,
    }),
    option: (styles: any, { isFocused, isSelected }: any) => ({
      ...styles,
      background: isFocused ? "#eeeee" : isSelected ? "#90EE90" : undefined,
      zIndex: 1,
    }),
    menu: (base: any) => ({
      ...base,
      zIndex: 100,
    }),
    input: (styles: any) => ({
      ...styles,
      height: "28px",
      fontSize: "13px",
      fontWeight: "medium",
      color: "black",
      opacity: 1,
      fontFamily: "Manrope, sans-serif ",
    }),
    control: (styles: any) => ({
      ...styles,
      height: "30px",
      minHeight: "30px",
      fontSize: "13px",
      color: "black",
      width: "100%",
      border: "1.6px solid #d4d4d4",
      backgroundColor: "transparent",
      fontFamily: "Manrope, sans-serif ",
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

  const loadOptions = (inputVal: string, callback: any) => {
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className=" w-full max-w-[300px] min-w-[270px] mt-1 border border-neutral-200  py-3 px-3  bg-neutral-50 rounded-md sticky top-0 "
    >
      <div className="grid grid-cols-1 gap-5 mx-auto w-fit">
        <RadioButtons
          label1={"Undergraduate"}
          label2={"Graduate"}
          value1={"undergraduate"}
          value2={"graduate"}
          urlKey={"deg"}
          header={"Level of study"}
        />
        <RadioButtons
          label1={"In State"}
          label2={"Out State"}
          value1={"InState"}
          value2={"OutOfState"}
          urlKey={"loc"}
          header={"Level of tuition"}
        />

        <RadioButtons
          label1={"On Campus"}
          label2={"Off Campus"}
          value1={"onCampus"}
          value2={"OffCampus"}
          urlKey={"acc"}
          header={"Are you planning to stay"}
        />

        {URLgetter("acc") === "O" && (
          <RadioButtons
            label1={"With roommates"}
            label2={"Without roommates"}
            value1={"WithFamily"}
            value2={"NotWithFamily"}
            urlKey={"fam"}
            header={"Staying"}
          />
        )}
        <RangeSelect
          Label={"Application Fee"}
          placeholder={"Application fee"}
          options={APPLICATION_FEES}
          urlKey={"af"}
          showDollarSign={true}
        />

        <RangeSelect
          Label={"Tution Fees"}
          placeholder={"Tution Fee"}
          options={TUITION}
          urlKey={"tf"}
          showDollarSign={true}
        />
        <RangeSelect
          Label={"Cost of Attendence"}
          options={COA}
          showDollarSign={true}
          urlKey={"coa"}
          placeholder="Cost of Attendence"
        />

        <div className="search-control">
          <h2 className="search-control__label mb-2">Major</h2>

          <AsyncSelect
            cacheOptions
            loadOptions={loadOptions}
            defaultOptions
            styles={customStyles}
            menuPlacement="top"
            classNamePrefix={"react-select"}
            placeholder="Start typing to .... Major"
            value={{
              value: selectedMajor,
              label: selectedMajor,
            }}
            className="mt-2"
            onChange={(e) => {
              const data = URLupdate("major", e?.value);
              history.push({ search: data });
            }}
          />
        </div>
        <MulitiSelect
          options={statesArray}
          Label="State"
          URLkey={"state"}
          key={"stateselect"}
          customStyles={customStyles}
        />

        <Button
          className="w-full flex-nowrap"
          color="success"
          onClick={closePopup}
        >
          <IonLabel>Search</IonLabel>
          <IonIcon icon={search}></IonIcon>
        </Button>
      </div>

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
    </motion.div>
  );
}

export default index;
