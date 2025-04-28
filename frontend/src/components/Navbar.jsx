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
      <nav className="flex justify-between items-center bg-[#4F46E5] py-5 px-3 lg:px-10 rounded-2xl shadow-lg w-[90vw] max-w-[1000px] ml-[50%] translate-x-[-50%] mt-2 fixed z-20">
        <Link
          to="/"
          className="text-white font-bold tracking-wider text-lg capitalize"
        >
          <span className="text-[#EEF2FF]">Buz</span>Consult
        </Link>
        <ul className="flex items-center text-white gap-x-10">
          <li className=" text-sm capitalize">
            <Link to="/" className="transition hover:text-[#EEF2FF]">
              home
            </Link>
          </li>
          <li className=" text-sm capitalize">
            <Link to="/consultants" className="transition hover:text-[#EEF2FF]">
              consultants
            </Link>
          </li>
          <li className=" text-sm capitalize">
            <Link to="/blog" className="transition hover:text-[#EEF2FF]">
              blog
            </Link>
          </li>
        </ul>
        <ul className="flex items-center">
          {!user ? (
            <Link
              to="/login"
              className="px-[25px] py-[5px] text-sm text-white border border-[EEF2FF] rounded-md text-center transition hover:bg-[#EEF2FF] hover:text-[#4338CA]"
            >
              Login
            </Link>
          ) : (
            <button onClick={handlelogout} className="hover:inderline">
              <img src={Logout} className="w-5" />
            </button>
          )}
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
