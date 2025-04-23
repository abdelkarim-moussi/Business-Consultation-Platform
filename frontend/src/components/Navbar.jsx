import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logout from "../assets/images/logout-white.png";

export default function NavBar() {
  const { user } = useAuth();
  const { logout } = useAuth();

  const handlelogout = () => {
    try {
      logout();
    } catch (error) {
      console.log("logout failed", error);
    }
  };

  return (
    <>
      <nav className="flex justify-between bg-[#19485F] py-5 px-3 lg:px-10 rounded-2xl shadow-lg w-[90vw] max-w-[1000px] ml-[50%] translate-x-[-50%] mt-2 fixed">
        <Link
          to="/"
          className="text-white font-bold tracking-wider text-lg uppercase"
        >
          <span className="text-[#D9E0A4]">Bus</span>Consult
        </Link>
        <ul className="flex items-center text-white gap-x-10">
          <li className=" text-sm capitalize">
            <Link to="/" className="transition hover:text-[#D9E0A4]">
              home
            </Link>
          </li>
          <li className=" text-sm capitalize">
            <Link to="/consultants" className="transition hover:text-[#D9E0A4]">
              consultants
            </Link>
          </li>
          <li className=" text-sm capitalize">
            <Link to="/blog" className="transition hover:text-[#D9E0A4]">
              blog
            </Link>
          </li>
         
          {!user ? (
            <Link
              to="/login"
              className="px-[25px] py-[5px] text-sm bg-[#D9E0A4] rounded-md text-black text-center transition hover:bg-[#ABB17B] hover:text-white"
            >
              Login
            </Link>
          ) : (
            <button onClick={handlelogout} className="hover:inderline">
              <img src={Logout} className="w-5"/>
            </button>
          )}
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
