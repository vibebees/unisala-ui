 import { feedUrlChips, getQueryParams } from '@utils/lib/URLupdate';
import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';


export const Chips = () => {
  const location = useLocation();
  const history = useHistory();
  const queryParams = getQueryParams(location.search);
  const filterParams = queryParams.getAll('f'); // Get all 'f' parameters as an array



  const toggleChip = (chipKey) => {
    const updatedParams = new URLSearchParams(location.search);
    if (filterParams.includes(chipKey)) {
      // If chip is already selected, remove it
      updatedParams.delete('f', chipKey);
    } else {
      // If chip is not selected, add it
      updatedParams.append('f', chipKey);
    }
    history.push({ search: updatedParams.toString() });
  };

  return (
    <div className="flex gap-2">
      {feedUrlChips.map((chip, index) => {
        const isSelected = filterParams.includes(chip.key);
        return (
          <div key={index}
               onClick={() => toggleChip(chip.key)}
               className={`cursor-pointer relative grid select-none items-center whitespace-nowrap rounded-lg border border-${chip.color}-500 py-1.5 px-3 font-sans text-xs font-bold uppercase
                          ${isSelected ? `bg-${chip.color}-500 text-white` : `text-${chip.color}-700`}`}
          >
            {chip.text}
          </div>
        );
      })}
    </div>
  );
};
