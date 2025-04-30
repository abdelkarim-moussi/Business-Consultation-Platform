import React from "react";

export default function SecondaryButton({ type, text, extraClasses, onClick }) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`px-4 py-1 border border-[#4F46E5] text-[#4338CA] rounded-md text-center transition hover:bg-[#4338CA] hover:text-white capitalize ${extraClasses}`}
    >
      {text}
    </button>
  );
}
