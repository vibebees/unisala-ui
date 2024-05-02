import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { IonSearchbar } from "@ionic/react";
import { SearchBarResultList } from "./searchResultList";
import "./index.css";
import { searchUniFromBar } from "../../../datasource/store/action/userActivity";
import { useDebouncedEffect } from "../../../hooks/useDebouncedEffect";
import { trashBin } from "ionicons/icons";

export const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [dropDownOptions, setDropDownOptions] = useState(false);
  const history = useHistory();
  const [options, setOptions] = useState([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    <>
      <IonSearchbar
        type="text"
        placeholder="Search universities, people..."
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            setDropDownOptions(false);
            history.push(searchValue ? `/search?q=${searchValue}` : "#");
          }
        }}
        value={searchValue}
        onIonInput={(e: any) => {
          setSearchValue(e.detail.value);
          setDropDownOptions(true);
        }}
        style={{
          marginTop: "-5px",
          padding: "0px",
          borderRadius: "10px",
        }}
        animated={true}
        clearIcon={trashBin}
        class="custom  "
      />
      {dropDownOptions && Array.isArray(options) && options.length > 0 && (
        <div
          className="recommend-search"
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
    </>
  );
};
