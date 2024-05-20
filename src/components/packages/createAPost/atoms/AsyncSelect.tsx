import axios from "axios";
import React, { Dispatch, FC, useEffect, useRef } from "react";
import { useLocation } from "react-router";
import AsyncSelect from "react-select/async";
import { universityServer } from "@datasource/servers/endpoints";
import { htmlForEditor } from "../utils/htmlForEditor";
import { setCache } from "@utils/cache";

interface selectAtomProps {
  item: {
    id: string;
    placeholder: string;
    name: string;
  };
  setPostData: Dispatch<any>;
  postData: TPostDataType;
}

const AsyncSelectAtom: FC<selectAtomProps> = ({
  item,
  setPostData,
  postData,
}) => {
  const ref = useRef();
  const majorController = useRef<AbortController>();
  const uniController = useRef<AbortController>();

  const universityName = useLocation().pathname.split("university/")[1];
  const params = new URLSearchParams(window.location.href);
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
  };

  useEffect(() => {
    if (params.get("unitId")) {
      if (postData && postData.id === "event") return;
      const postText = htmlForEditor(
        postData?.postText,
        "University 🏫",
        universityName
      );
      setPostData((prev: any) => ({
        ...prev,
        postText,
      }));
    }
  }, []);

  const fetchMajor = async (majorQuery = " ") => {
    if (majorController.current) {
      majorController.current.abort();
    }
    majorController.current = new AbortController();
    try {
      const response = await axios.get(
        `${universityServer}/keyword/majors/${majorQuery}/5`,
        {
          signal: majorController.current.signal,
        }
      );
      return response.data.map((i: any) => ({
        value: i.name,
        label: i.name.toUpperCase(),
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const fetechUni = async (uni = " ") => {
    if (uniController.current) {
      uniController.current.abort();
    }
    uniController.current = new AbortController();
    try {
      const response = await axios.get(
        `${universityServer}/keyword/schoolName/${uni}/5`,
        {
          signal: uniController.current.signal,
        }
      );
      return response.data.map((i: any) => ({
        value: i.name,
        label: i.name.toUpperCase(),
        unitId: i?.unitId,
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
        if (item.id === "major") {
          options = await fetchMajor(inputVal);
        } else {
          options = await fetechUni(inputVal);
        }
        callback(options);
      } catch (error) {
        console.error("Error loading options:", error);
      }
    }, 1000);
  };
  return (
    <AsyncSelect
      cacheOptions
      loadOptions={loadOptions}
      styles={customStyles}
      menuPlacement="bottom"
      placeholder={item.placeholder || ""}
      ref={ref as any}
      defaultValue={
        postData && {
          value: postData[item.id as keyof typeof postData] || "",
          label:
            postData[item.id as keyof typeof postData] ||
            item.placeholder ||
            "",
        }
      }
      onChange={(e: any) => {
        setPostData((prev: any) => {
          let obj = {
            ...prev,
          };

          if (e?.unitId) {
            obj.unitId = e.unitId;
          }
          if (postData?.id === "event") return;
          const postText = htmlForEditor(
            postData?.postText!,
            item.name,
            e.value
          );
          obj[item.id] = e.value;
          obj.postText = postText;
          setCache("postData", JSON.stringify(obj));
          return obj;
        });
      }}
      className="mt-2"
    />
  );
};

export default AsyncSelectAtom;
