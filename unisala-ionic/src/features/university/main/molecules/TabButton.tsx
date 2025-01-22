import { CheckMark } from "@components/packages/icons";
import React from "react";

const TabButton = ({ label, active, onClick, showBadge, Icon }) => {
  return (
    <div className='relative flex-1'>
      <button
        className={`align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 w-full rounded-lg flex items-center justify-center ${
          active
            ? 'bg-green-500 text-white shadow-md hover:shadow-lg focus:opacity-[0.85] active:opacity-[0.85]'
            : 'bg-white text-blue-500 shadow-none hover:shadow-md focus:opacity-[0.85] active:opacity-[0.85]'
        }`}
        onClick={onClick}
        style={{ height: '48px'}} // Ensure uniform height
      >
        <div className="flex items-center">
        <span className="ml-2 mb-2">
            <Icon fill ={active? "#fff" : 'blue'} />
          </span>
          <span>{label}</span>

        </div>
        {showBadge && (
          <span
          className="absolute rounded-full py-1 px-1 text-xs font-medium content-[''] leading-none grid place-items-center top-[4%] right-[10%] translate-x-2/4 -translate-y-2/4 bg-red-500 text-white min-w-[24px] min-h-[24px] bg-gradient-to-tr from-green-400 to-green-600 border-2 border-white shadow-lg shadow-black/20">
          <CheckMark />
        </span>
        )}
      </button>
    </div>
  );
};

export default TabButton;
