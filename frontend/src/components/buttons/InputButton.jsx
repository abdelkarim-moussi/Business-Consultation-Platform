import React from "react";

const InputButton = ({type,placeholder,buttonType,buttonText,onChange,onClick}) => {
  return (
    <div className="w-full max-w-[400px] bg-white rounded-lg border-2 border-[#4F46E5] grid grid-cols-3">
      <input
        className="col-span-2 h-full bg-transparent pl-4 outline-none border-none"
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
      <button
        className="col-span-1 border-2 bg-[#4F46E5] border-[#4F46E5] hover:bg-[#4338CA] hover:border-2 hover:border-[#4338CA] text-white my-1 py-1 px-5 rounded-md mr-4 text-sm"
        type={buttonType}
        onClick={onClick}
      >
        {buttonText}

      </button>
    </div>
  );
};

export default InputButton;
