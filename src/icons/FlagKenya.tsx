const FlagKenya = () => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_648_21569)">
        <g clipPath="url(#clip1_648_21569)">
          {/* base green */}
          <rect x="1" y="1" width="20" height="20" fill="#006600" />
          {/* top black stripe */}
          <rect x="1" y="1" width="20" height="6" fill="#000000" />
          {/* white borders around red stripe */}
          <rect x="1" y="7" width="20" height="2" fill="#FFFFFF" />
          <rect x="1" y="14" width="20" height="2" fill="#FFFFFF" />
          {/* middle red stripe */}
          <rect x="1" y="8" width="20" height="6" fill="#BB0000" />
          {/* spears */}
          <path
            d="M7 3L10 11L7 19"
            stroke="white"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M15 3L12 11L15 19"
            stroke="white"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          {/* shield */}
          <ellipse
            cx="11"
            cy="11"
            rx="3"
            ry="6"
            fill="#BB0000"
            stroke="white"
            strokeWidth="1.2"
          />
          <ellipse
            cx="11"
            cy="11"
            rx="1.6"
            ry="3.2"
            fill="#000000"
            stroke="white"
            strokeWidth="0.8"
          />
        </g>
      </g>
      <rect
        x="0.5"
        y="0.5"
        width="21"
        height="21"
        rx="10.5"
        stroke="white"
        strokeOpacity="0.48"
        strokeLinejoin="bevel"
      />
      <defs>
        <clipPath id="clip0_648_21569">
          <rect x="1" y="1" width="20" height="20" rx="10" fill="white" />
        </clipPath>
        <clipPath id="clip1_648_21569">
          <rect
            width="30.6667"
            height="23"
            fill="white"
            transform="translate(-4 -1)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default FlagKenya;
