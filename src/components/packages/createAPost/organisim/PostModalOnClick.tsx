import React from "react";
import { useEffect, useLayoutEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import "../index.css";
import Form from "../molecules/Form";
import FormAvatar from "../molecules/FormAvatar";
import FormTab from "./FormTab";
import NotLogggedModal from "./NotLogggedModal";
import SelectionTab from "./SelectionTab";

export const PostModalOnClick = ({ metaData }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [selectedTab, setSelectedTab] = useState(null);
  const [allowPost, setAllowPost] = useState(true);
  const [postData, setPostData] = useState({
    id: selectedTab,
  });

  useEffect(() => {
    setPostData((prevPostData) => {
      return {
        ...prevPostData,
        id: selectedTab,
        unitId: parseFloat(params.get("unitId")) || null,
        // tags: allProps.tags && tags,
      };
    });
  }, [selectedTab]);

  const handleTabSelection = (item) => {
    setSelectedTab(item);
    setPostData({ id: item });
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
                  allProps={allProps}
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
