import React from "react";

const Input = ({
  type = "text",
  id,
  name,
  value,
  onChange,
  error,
  placeholder,
  className,
  checked,
  accept,
}) => {
  if (type === "checkbox") {
    return (
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
      />
    );
  }

  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      accept={accept}
      onChange={onChange}
      required={true}
      className={`block text-sm md:text-base w-full pl-10 pr-10 py-1.5 md:py-3 border ${
        error ? "border-red-500" : "border-gray-300"
      } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${className}`}
      placeholder={placeholder}
    />
  );
};

export default Input;
