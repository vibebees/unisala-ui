import React from "react";

const MetatagFetchError = () => {
  return (
    <div className="mt-14">
      <h1 className="text-center text-red-600">Metatag Fetch Error</h1>
      <p className="px-14 text-center mt-1 text-neutral-700 text-sm">
        There was an error fetching the metatags for this post. Please try again
        later.
      </p>
    </div>
  );
};

export default MetatagFetchError;
