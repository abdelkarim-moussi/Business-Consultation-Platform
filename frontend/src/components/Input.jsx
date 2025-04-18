import React from "react";

export default function Input({
  id,
  name,
  value,
  onChange,
  type,
  inputClasses,
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
