import React from "react";

function WarningSign({ error ="Something went wrong" ,className ="" }) {
  return <div className={`text-sm font-bold text-red-500 shadow-lg p-1 px-2 rounded-lg shadow-red-600 drop-shadow-xl ${className}`}>{error}</div>;
}

export default WarningSign;
