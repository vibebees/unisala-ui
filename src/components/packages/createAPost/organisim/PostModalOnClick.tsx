import React from "react";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useHistory, useLocation } from "react-router-dom";
import "../index.css";
import Form from "../molecules/Form";
import FormAvatar from "../molecules/FormAvatar";
import FormTab from "./FormTab";
import NotLogggedModal from "./NotLogggedModal";
import SelectionTab from "./SelectionTab";

export const PostModalOnClick = ({ metaData, tags }) => {

  console.log(" ---> tags", tags);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [selectedTab, setSelectedTab] = useState(null);
  const [allowPost, setAllowPost] = useState(true);
  const [ postData, setPostData ] = useState({
    tags,
    id: selectedTab,
  });

  useEffect(() => {
    setPostData((prevPostData) => {
      return {
        ...postData,
        ...prevPostData,
        id: selectedTab,
        unitId: parseFloat(params.get("unitId")) ?? '',
        // tags: allProps.tags && tags,
      };
    });
  }, [selectedTab]);

  const handleTabSelection = (item) => {
    setSelectedTab(item);
    setPostData((prevPostData) => ({...prevPostData, id: item}));
    // params.append("type", item)
    // history.push({ search: params.toString() })
    // ButtonTrack(`${item} button clicked while creating a post`)
  };

  return (
    <>
      {allowPost && (
        <div className="overflow-y-scroll threadScroll px-1 h-full ">
          {!selectedTab ? (
            <SelectionTab
              metaData={metaData}
              onClick={(item) => handleTabSelection(item)}
            />
          ) : (
            <>
              <FormTab
                metaData={metaData}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
              />
              <br />
              <FormAvatar />

              {metaData && (
                <Form
                  metaData={metaData[selectedTab]}
                  postData={postData}
                  setPostData={setPostData}
                />
              )}
            </>
          )}
        </div>
      )}

      {!allowPost && <NotLogggedModal setAllowPost={setAllowPost} />}
    </>
  );
};
