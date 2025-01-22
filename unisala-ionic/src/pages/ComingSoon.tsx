import React from "react";
import { useHistory } from "react-router";

const ComingSoon = () => {
  const history = useHistory();
  return (
    <div className="min-h-screen grid bg-white place-content-center">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl animate-bounce text-black text-center">
          Coming Soon...
        </h1>
        <p className="text-center text-neutral-700 mt-4 text-sm">
          We are working hard to bring you the best experience. Stay tuned! 🚀
        </p>
        <button
          className="text-blue-700 underline opacity-50 hover:opacity-85 duration-200 text-center mt-4"
          onClick={() => history.goBack()}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ComingSoon;
