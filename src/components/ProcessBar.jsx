import React from "react";

const ProgressBar = ({ progressPercentage }) => {
  return (
    <div className="h-1 w-full bg-gray-300 rounded-full">
      <div
        style={{ width: `${progressPercentage}%` }}
        className={`h-full bg-gradient-to-r from-pink-400 to-blue-400 rounded-full`}
      ></div>
    </div>
  );
};

export default ProgressBar;
