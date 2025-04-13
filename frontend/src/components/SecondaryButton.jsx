import { Link } from "react-router-dom";

const SecondaryButton = ({text,link}) => {
  return (
    <Link
      to={link}
      className="border-2 border-[#D9E0A4] px-8 py-1 text-white capitalize transition hover:border-[#19485F] rounded-md"
    >
      {text}
    </Link>
  );
};

export default SecondaryButton;
