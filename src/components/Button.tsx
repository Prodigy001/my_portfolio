import React from "react";

interface ButtonProps {
  text: string;
  bgColor: "bg-yellow500-F0" | "bg-black400-33" | "bg-yellow100-FA";
  color: "text-black500-00A" | "text-black400-33" | "text-white";
  Icon?: () => React.ReactNode;
}

function Button({ text, bgColor, color, Icon }: ButtonProps) {
  return (
    <div>
      <button
        className={`p-4 h-12 flex items-center gap-2 rounded-lg hover:opacity-60 cursor-pointer ${bgColor}`}
      >
        {Icon && (
          <div className="size-5 tw-all-center">
            <Icon />
          </div>
        )}

        <p className={`font-medium text-label-md ${color}`}>{text}</p>
      </button>
    </div>
  );
}

export default Button;
