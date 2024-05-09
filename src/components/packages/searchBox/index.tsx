import React, { useState, useRef, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { IonSearchbar } from "@ionic/react";
import { SearchBarResultList } from "./searchResultList";
import "./index.css";
import { searchUniFromBar } from "@datasource/store/action/userActivity";
import { useDebouncedEffect } from "@hooks/useDebouncedEffect";
import { trashBin } from "ionicons/icons";
import { URLgetter, URLupdate } from "@utils/lib/URLupdate";
import FilterIcon from "../icons/FilterIcon";
import { MenuToggle } from "@components/defaults";
import clsx from "clsx";

export const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [dropDownOptions, setDropDownOptions] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const [options, setOptions] = useState([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchTab = URLgetter("tab");

  useDebouncedEffect(
    searchUniFromBar(searchValue, 5, setOptions),
    [searchValue],
    300
  );

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropDownOptions(false);
    }
  };

  useEffect(() => {
    if (dropDownOptions) {
      window.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropDownOptions]);

  return (
<div className="flex border-2 rounded-md focus-within transition duration-100 overflow-hidden">
      <IonSearchbar
        style={{
          border: "none",
        }}
        onClick={(e) => {
          console.log("log", e);
        }}
        type="text"
        placeholder="Search universities, people..."
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            setDropDownOptions(false);
            const updatedURl = URLupdate("q", searchValue);
            history.push({ pathname: "/search", search: updatedURl });
          }
        }}
        value={searchValue}
        onIonInput={(e: any) => {
          setSearchValue(e.detail.value);
          setDropDownOptions(true);
        }}
        animated={true}
        clearIcon={trashBin}
        class="custom ion-no-margin ion-no-padding"
      />

      <button
        className={clsx(
          "border place-content-center hidden px-1 pr-3",
          location.pathname === "/search" && searchTab === "uni"
            ? "max-md:grid"
            : "hidden"
        )}
      >
        <MenuToggle>
          <FilterIcon className="" />
        </MenuToggle>
      </button>

      {dropDownOptions && Array.isArray(options) && options.length > 0 && (
        <div
          className="recommend-search BorderCard"
          ref={dropdownRef}
          style={{
            zIndex: 1000,
          }}
        >
          {Array.isArray(options) &&
            options.map((item, i) => (
              <SearchBarResultList
                item={item}
                key={i}
                setDropDownOptions={setDropDownOptions}
              />
            ))}
        </div>
      )}
    </div>
  );
};
