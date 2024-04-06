import React from "react";

function Heading({ label, className = "" }) {
  return <h1 className={`text-3xl font-semibold  text-center p-2 ${className}`}>{label}</h1>;
}

export default Heading;
