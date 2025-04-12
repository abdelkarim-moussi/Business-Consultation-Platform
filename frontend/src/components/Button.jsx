import React from "react";

export default function Button({ type, text , extraClasses }) {
  return (
    <button
      type={type}
      className={`px-4 py-1.5 mt-2 bg-[#D9E0A4] rounded-md text-black text-center transition hover:bg-[#19485F] hover:text-white ${extraClasses}`}
    >
      {text}
    </button>
  );
}
