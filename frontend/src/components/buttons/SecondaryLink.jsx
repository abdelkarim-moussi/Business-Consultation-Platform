import { Link } from "react-router-dom";

export default function SecondaryLink({ text, link ,extraClasses}) {
  return (
    <Link
      to={link}
      className={`px-4 py-1.5 border-2 border-[#4338CA] rounded-md text-center transition hover:bg-[#4338CA] text-white  ${extraClasses}`}
    >
      {text}
    </Link>
  );
}
