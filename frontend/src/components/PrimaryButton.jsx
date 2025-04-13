import React from "react";
import { Link } from "react-router-dom";

export default function PrimaryButton({link,text,extraClasses}) {
  return (
    <Link
      to={link}
      className={`bg-[#19485F] border-2 border-[#19485F] px-8 py-1 text-white capitalize transition hover:bg-[#D9E0A4] hover:border-[#D9E0A4] hover:text-[#19485F] rounded-md ${extraClasses}`}
    >
      {text}
    </Link>
  );
}
