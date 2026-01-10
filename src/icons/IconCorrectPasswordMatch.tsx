import React from "react";

const IconCorrectPasswordMatch = ({ width = "16", height = "16", rectFill = "#1DC660" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="16" height="16" rx="8" fill={rectFill} />
      <path
        d="M4.2666 8.5335L6.14736 10.0381C6.58859 10.3911 7.22855 10.3387 7.60655 9.91874L11.7333 5.3335"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default IconCorrectPasswordMatch;
