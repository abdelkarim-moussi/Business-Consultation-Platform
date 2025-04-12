import React from "react";

export default function Input({
  label,
  id,
  name,
  value,
  onChange,
  type,
  inputClasses,
  divClasses,
}) {
  return (
      <input
        className={`w-full border border-black h-[35px] rounded-lg px-3 text-sm ${inputClasses}`}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
      />
  );
}
