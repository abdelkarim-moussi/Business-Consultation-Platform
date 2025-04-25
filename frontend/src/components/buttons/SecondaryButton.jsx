import { Link } from "react-router-dom";

export default function SecondaryButton({ text, link ,extraClasses}) {
  return (
    <Link
      to={link}
      className={`border-2 border-[#D9E0A4] px-8 py-1 capitalize transition hover:border-[#19485F] hover:text-[#19485F] rounded-md ${extraClasses}`}
    >
      {text}
    </Link>
  );
}
