 import { trackEvent } from '@components/analytics';
import { useAuth } from '@context/AuthContext';
import { feedUrlChips, getQueryParams } from '@utils/lib/URLupdate';
import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';


export const Chips = () => {
  const location = useLocation();
  const history = useHistory();
  const queryParams = getQueryParams(location.search);
  const filterParams = queryParams.getAll('f'); // Get all 'f' parameters as an array
  const {user} = useAuth();

  // only show chips in url includes /feed
  if (!location.pathname.includes('/feed')) {
    return null;
  }

  const toggleChip = (chipKey) => {
    const updatedParams = new URLSearchParams(location.search);
    if (filterParams.includes(chipKey)) {
      // If chip is already selected, remove it
      updatedParams.delete('f', chipKey);
      trackEvent({
        action: "Feed_filter"+ chipKey +"_unselected_"+ user?.id,
        category: "feedFilter",
        label: updatedParams.toString(),
      })
    } else {
      // If chip is not selected, add it
      updatedParams.append('f', chipKey);
      trackEvent({
        action: "Feed_filter"+ chipKey +"_selected_"+ user?.id,
        category: "feedFilter",
        label: updatedParams.toString(),
      })
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
