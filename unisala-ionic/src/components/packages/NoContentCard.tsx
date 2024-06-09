import React from 'react';
import logo from "@assets/emptyState.png";

export const NoContentCard = ({ defaultValue = "No content on this page" }) => (
  <>
  <div className="relative flex bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full max-w-[48rem] flex-row">
  <div
    className="relative w-2/5 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0">
    <img
      src={logo}
      alt="card-image" className="object-cover w-full h-full" />
  </div>
  <div className="p-6">

    <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
      No content on this page
    </h4>
    <p className="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
    {defaultValue}
    </p>

  </div>
</div>
  </>
  );
