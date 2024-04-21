import React, { FC, useEffect } from "react";
import { IonSelect, IonSelectOption, useIonToast } from "@ionic/react";
import { URLgetter, URLupdate } from "../../../utils/lib/URLupdate";
import { useHistory } from "react-router";
import { Typography } from "@components/defaults";

const RangeSelect: FC<IRangeSelect> = ({
  options,
  Label,
  urlKey,
  placeholder = "",
  showDollarSign = false,
}) => {
  const [selected, setSelected] = React.useState({
    min: 0,
    max: 0,
  });
  const [present, dismiss] = useIonToast();
  const history = useHistory();
  const handleChanges = (e: any) => {
    const degree = URLgetter("deg");
    const levelOfStudy = URLgetter("loc");
    // const accomadation = URLgetter("acc");
    // const family = URLgetter("fam");
    if (urlKey === "af") {
      if (!degree) {
        return present({
          duration: 3000,
          message: "Please select a degree level first",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "danger",
          mode: "ios",
        });
      }
    }

    if (urlKey === "tf") {
      if (!levelOfStudy || !degree) {
        return present({
          duration: 3000,
          message: "Please select a level of tution  and a degree level",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "danger",
          mode: "ios",
        });
      }
    }

    if (urlKey === "coa") {
      if (!levelOfStudy || !degree) {
        return present({
          duration: 3000,
          message:
            "Please select a level of study , Level of tution, planning to say  and staying first ",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "danger",
          mode: "ios",
        });
      }
    }

    let min = e.target.value.min;
    let max = e.target.value.max;
    let urlformat = min + "-" + max;
    const data = URLupdate(urlKey, urlformat);
    history.push({ search: data.toString() });
  };

  useEffect(() => {
    const data = URLgetter(urlKey);

    if (data) {
      let newData = data.split("-");
      let min = parseInt(newData[0]);
      let max = parseInt(newData[1]);
      let obj = { min: min, max: max };

      setSelected(obj);
    } else {
      setSelected({ min: 0, max: 0 });
    }
  }, [history.location.search]);

  const dollarSign = (text: string, extra: string) => {
    if (showDollarSign) {
      return text + extra;
    } else {
      return text;
    }
  };

  const selectedText = () => {
    if (!selected) return placeholder;
    if (selected.min === 0 && selected.max === 0) {
      return "Free";
    } else if (
      selected.max === null ||
      typeof selected.max !== "number" ||
      selected.max.toString() === "NaN"
    ) {
      return dollarSign(selected.min.toString(), "$+");
    } else {
      const returnText = selected.min + "-" + selected.max;
      return dollarSign(returnText, "$");
    }
  };

  return (
    <div className="h-fit overflow-hidden  ">
      <Typography
        variant="h6"
        className=" search-control__label ion-no-margin ion-no-padding !leading-none"
      >
        {Label}
      </Typography>
      <IonSelect
        interface="popover"
        placeholder={placeholder}
        className="border-[1.6px] mt-[10px] border-neutral-300 px-3 rounded-[4px] w-full  min-h-7 text-xs font-medium  ion-no-margin ion-no-padding   "
        onIonChange={handleChanges}
        selectedText={selectedText()}
      >
        {options.map((val, i) => (
          <IonSelectOption key={i} value={val}>
            {val.max === 0
              ? "Free"
              : val.max === null
              ? dollarSign(val.min.toString(), "$+")
              : dollarSign(val.min + "-" + val.max, "$")}
          </IonSelectOption>
        ))}
      </IonSelect>
    </div>
  );
};

export default RangeSelect;
