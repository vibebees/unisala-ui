import clsx from "clsx";
import React from "react";

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
      <div
        style={{ width: `${width}%` }}
        className={clsx("h-2 bg-blue-500 rounded-r-full")}
      />
    </div>
  );
};

export default StepIndicator;
