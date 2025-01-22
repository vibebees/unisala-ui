import React from "react";

const MetatagFetchError = () => {
  return (
    <div className="mt-14">
      <h1 className="text-center text-red-600">Oops! Something went wrong</h1>
      <p className="px-14 text-center mt-1 text-neutral-700 text-sm">
        There was an error creating a post. Please try again later.
      </p>
    </div>
  );
};

export default MetatagFetchError;
