import React from "react";

const Input = React.forwardRef(
  ({ id, name, value, onChange, type, inputClasses }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full border border-[#4F46E5] h-[35px] px-3 text-sm rounded-lg mt-1 outline-none ${inputClasses}`}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
      />
    );
  }
);

export default Input;
