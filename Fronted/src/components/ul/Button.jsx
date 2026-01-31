import React from "react";
import svg from "../../constant/svg";

const Button = ({
  type = "button",
  isLoading = false,
  disabled = false,
  children,
  onClick,
  icon: Icon,
  loadingText = "Signing in...",
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`w-full flex items-center justify-center gap-2 py-2 bg-(--orange) hover:bg-(--blue) text-(--blue) hover:text-white rounded-lg disabled:opacity-50 cursor-pointer ${className}`}
    >
      {isLoading ? (
        <>
          {svg.spinner}
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          {children}
          {Icon && <Icon className="h-5 w-5" />}
        </>
      )}
    </button>
  );
};

export default Button;
