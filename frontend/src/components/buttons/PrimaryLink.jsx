import React from "react";
import { Link } from "react-router-dom";

export default function PrimaryLink({link,text,extraClasses}) {
  return (
    <Link
      to={link}
      className={`px-4 py-1.5 bg-[#4F46E5] rounded-md text-white text-center transition hover:bg-[#4338CA] hover:text-white ${extraClasses}`}
    >
      {text}
    </Link>
  );
}
