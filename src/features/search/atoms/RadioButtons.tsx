/* eslint-disable no-unneeded-ternary */
import React, { FC, useEffect } from "react";
import { Radio, RadioGroup, Row, Typography } from "@components/defaults";
import { useHistory } from "react-router";
import { URLupdate, URLgetter } from "../../../utils/lib/URLupdate";

const RadioButtons: FC<IRadioButtons> = ({
  label1,
  label2,
  value1,
  value2,
  urlKey,
  header = "",
}) => {
  const history = useHistory();
  const [selected, setSelected] = React.useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = URLupdate(urlKey, e.target.value[0]);
    history.push({ search: data.toString() });
    setSelected(e.target.value);
  };

  useEffect(() => {
    const data = URLgetter(urlKey);
    if (data) {
      if (data === value1[0]) {
        setSelected(value1);
      } else if (data === value2[0]) {
        setSelected(value2);
      } else {
        setSelected("");
      }
    } else {
      setSelected("");
    }
  }, [history.location.search]);

  return (
    <RadioGroup allowEmptySelection={false} value={selected}>
      <Typography className="search-control__label">{header}</Typography>
      <Row className="mt-3">
        <Typography className="mx-3">{label1}</Typography>

        <Radio
          className="text-sm"
          onIonFocus={handleChange}
          value={value1}
        ></Radio>
        <Typography className="mx-3">{label2}</Typography>
        <Radio onIonFocus={handleChange} value={value2}></Radio>
      </Row>
    </RadioGroup>
  );
};

export default RadioButtons;
