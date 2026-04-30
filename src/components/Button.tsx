import React from "react";

interface ButtonProps {
  text: string;
  bgColor: "bg-yellow500-F0" | "bg-black400-33" | "bg-yellow100-FA";
  color: "text-black500-00A" | "text-white" | "text-black400-33";
  Icon?: React.ComponentType;
  onClick?: () => void;
  href?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  width?: "w-fit" | "w-36" | "w-40" | "w-48" | "w-56" | "w-64" | "w-full";
}

const Button: React.FC<ButtonProps> = ({
  text,
  bgColor,
  color,
  Icon,
  onClick,
  href,
  target = "_self",
  width = "w-fit",
}) => {
  const sharedClasses = `${width} p-4 h-12 tw-all-center text-center gap-2 rounded-lg hover:opacity-60 cursor-pointer ${bgColor}`;

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel="noopener noreferrer"
        className={sharedClasses}
      >
        {Icon && (
          <div className="size-5 tw-all-center">
            <Icon />
          </div>
        )}
        <p className={`font-medium text-label-lg ${color}`}>{text}</p>
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={sharedClasses}>
      {Icon && (
        <div className="size-5 tw-all-center">
          <Icon />
        </div>
      )}
      <p className={`font-medium text-label-lg ${color}`}>{text}</p>
    </button>
  );
};

export default Button;
