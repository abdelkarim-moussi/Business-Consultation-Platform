import React from "react";

const InputButton = ({type,placeholder,buttonType,buttonText,onChange,onClick}) => {
  return (
    <div className="w-full max-w-[400px] rounded-lg border-2 border-[#D9E0A4] grid grid-cols-3">
      <input
        className="col-span-2 h-full bg-transparent pl-4 outline-none border-none"
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
      <button
        className="col-span-1 border-2 bg-[#D9E0A4] border-[#D9E0A4] hover:bg-[#19485F] hover:border-2 hover:border-[#D9E0A4] hover:text-white text-black my-1 py-1 px-5 rounded-md mr-4 text-sm"
        type={buttonType}
        onClick={onClick}
      >
        {buttonText}

      </button>
    </div>
  );
};

export default InputButton;
