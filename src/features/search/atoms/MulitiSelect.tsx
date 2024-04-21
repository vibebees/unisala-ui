import React, { useState, useLayoutEffect, FC } from "react";
import Select, { SingleValue } from "react-select";
import { URLgetter, URLupdate } from "../../../utils/lib/URLupdate";
import { useHistory } from "react-router";
import { Typography } from "@components/defaults";

const MulitiSelect: FC<MulitSelectProps> = ({
  options,
  Label = "",
  URLkey,
  customStyles,
}) => {
  const [selected, setSelected] = useState("");
  const history = useHistory();

  const handleChanges = (
    e: SingleValue<{
      label: string;
      value: string;
    }>
  ) => {
    const data = URLupdate(URLkey, e?.label);
    history.push({ search: data });
  };

  useLayoutEffect(() => {
    const data = URLgetter(URLkey);
    if (data) {
      setSelected(data);
    } else {
      setSelected("Select a state");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.location.search]);

  return (
    <div className="search-control z-40">
      <Typography variant="h6" className="mb-2 search-control__label ">
        {Label}
      </Typography>
      <Select
        options={options}
        isSearchable
        classNamePrefix={"react-select"}
        placeholder={"Select a state"}
        onChange={handleChanges}
        styles={customStyles}
        className="mt-2"
        menuPlacement="top"
        value={{
          label: selected,
          value: selected,
        }}
      />
    </div>
  );
};

export default MulitiSelect;
