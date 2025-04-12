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
    <div className={`flex gap-2 ${divClasses}`}>
      <label className="text-sm lowercase" htmlFor={name}>
        {label}
      </label>

      <input
        className={`w-full border border-black h-[35px] rounded-lg px-3 text-sm ${inputClasses}`}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
      />
    </div>
  );
}
