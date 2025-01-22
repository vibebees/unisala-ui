import clsx from "clsx";
import React from "react";
import { Toast } from "../ui/toast";

const StepIndicator = ({ step }: { step: number }) => {
  const TotalSteps = 5;
  const [width, setWidth] = React.useState(0);

  const calculateWidth = () => {
    const calculatedWidth = (step / TotalSteps) * 100;
    setWidth(calculatedWidth);
  };

  React.useEffect(() => {
    calculateWidth();
  }, [step]);

  return (
    <div>

    <Toast/>
      <div
        style={{ width: `${width}%` }}
        className={clsx("h-2 bg-blue-500 rounded-r-full")}
      />
    </div>
  );
};

export default StepIndicator;
