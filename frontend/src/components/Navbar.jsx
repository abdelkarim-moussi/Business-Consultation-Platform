import { Outlet, Link } from "react-router-dom";
import { useState } from "react";

export default function NavBar() {

  const [user, setUser] = useState(null);

  return (
    <>
      <nav className="flex justify-between bg-[#19485F] py-5 px-3 lg:px-10 rounded-lg shadow-lg w-[100vw] max-w-[1000px] mx-auto mt-2">
        <Link to="/" className="text-white font-bold tracking-wider text-lg uppercase">
          <span className="text-[#D9E0A4]">Bus</span>Consult
        </Link>
        <ul className="flex items-center text-white gap-x-10">
          <li className=" text-sm capitalize hover:">
            <Link className="transition hover:text-[#D9E0A4]" to="/">home</Link>
          </li>
          <li className=" text-sm capitalize hover:">
            <Link className="transition hover:text-[#D9E0A4]" to="/consultants">consultants</Link>
          </li>
          <li className=" text-sm capitalize hover:">
            <Link className="transition hover:text-[#D9E0A4]" to="/blog">blog</Link>
          </li>
          <li className="">
            <Link to="/login" className="px-3 py-0.5 bg-[#D9E0A4] rounded-md text-black text-center transition hover:bg-[#ABB17B] hover:text-white">login</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

