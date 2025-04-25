import React from "react";

export default function Button({ type, text, extraClasses, onClick }) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`px-4 py-1.5 bg-[#D9E0A4] rounded-md text-black text-center transition hover:bg-[#19485F] hover:text-white ${extraClasses}`}
    >
      {text}
    </button>
  );
}
