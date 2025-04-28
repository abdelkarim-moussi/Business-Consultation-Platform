import React from "react";

export default function SecondaryButton({ type, text, extraClasses, onClick }) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`px-4 py-1.5 border border-[#4F46E5] rounded-m text-center transition hover:bg-[#4338CA] hover:text-white capitalize ${extraClasses}`}
    >
      {text}
    </button>
  );
}
