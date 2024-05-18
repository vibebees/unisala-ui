import React from "react";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import "../index.css";
import Form from "../molecules/Form";
import FormAvatar from "../molecules/FormAvatar";
import SelectionTab from "./SelectionTab";
import { createPortal } from "react-dom";
import { Buttons } from "@components/defaults";
import { LeftArrow } from "@components/packages/icons";
import { getCache } from "@utils/cache";

export const PostModalOnClick = ({ metaData }: { metaData: any }) => {
  const [selectedTab, setSelectedTab] = useState<EPostType | null>(
    (localStorage.getItem("st") as EPostType) || null
  );
  const [domLoaded, setDomLoaded] = useState(false);
  const [postData, setPostData] = useState<TPostDataType>(
    (getCache("postData") as any) || {
      id: "",
      title: "",
      description: "",
      tags: [],
      images: [],
      rating: 0,
      date: new Date(),
      location: "",
      isPublic: true,
    }
  );

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const handleTabSelection = (item: EPostType) => {
    setSelectedTab(item);
    setPostData((prevPostData) => ({ ...prevPostData, id: item as any }));
    localStorage.setItem("st", item);
  };

  return (
    <>
      <div className="overflow-y-scroll threadScroll px-1 h-full ">
        {!selectedTab && (
          <SelectionTab
            metaData={metaData}
            onClick={(item: EPostType) => handleTabSelection(item)}
          />
        )}

        {selectedTab && (
          <>
            <br />
            <FormAvatar />

            {metaData && (
              <Form
                metaData={metaData[selectedTab]}
                postData={postData}
                setPostData={setPostData}
              />
            )}

            {domLoaded &&
              selectedTab &&
              document.getElementById("modal-header") &&
              createPortal(
                <p>{metaData[selectedTab]?.name}</p>,
                document.getElementById("modal-header")!
              )}

            {domLoaded &&
              selectedTab &&
              document.getElementById("modal-start") &&
              createPortal(
                <Buttons
                  className="  cursor-pointer"
                  onClick={() => {
                    setSelectedTab(null);
                  }}
                >
                  <LeftArrow /> <span className="text-neutral-600">Back</span>
                </Buttons>,
                document.getElementById("modal-start")!
              )}
          </>
        )}
      </div>

      {/* {!allowPost && <NotLogggedModal setAllowPost={setAllowPost} />} */}
    </>
  );
};
