import React from "react";

export default function PrimaryButton({ type, text, extraClasses, onClick }) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`px-4 py-1.5 bg-[#4F46E5] rounded-md text-white text-center transition hover:bg-[#4338CA] hover:text-white capitalize ${extraClasses}`}
    >
      {text}
    </button>
  );
}
