import { Link } from "react-router-dom";
import Facebook from "../assets/images/facebook.png";
import Whatssap from "../assets/images/whatsapp.png";
import Instagram from "../assets/images/instagram.png";

export default function Footer() {
  return (
    <section className="bg-[#19485F] flex flex-col justify-center">
      <div className="px-5 py-10 flex justify-around flex-wrap gap-10 text-white">
        <div className="flex flex-col">
          <Link
            to="/"
            className="text-white font-bold tracking-wider text-lg uppercase"
          >
            <span className="text-[#D9E0A4]">Bus</span>Consult
          </Link>
          <div className="flex gap-2 items-center mt-3">
            <a href="">
              <img src={Facebook} alt="facebook" className="w-[30px] hover:bg-white rounded-full" />
            </a>
            <a href="">
              <img src={Instagram} alt="instagram" className="w-[30px] hover:bg-white rounded-full" />
            </a>
            <a href="">
              <img src={Whatssap} alt="whatssap" className="w-[30px] hover:bg-white rounded-full" />
            </a>
          </div>
        </div>
        <div>
          <h2 className="text-md font-semibold">Quick Links</h2>
          <ul>
            <li>
              <Link className="text-sm text-gray-300 hover:text-[#D9E0A4]">
                consultants
              </Link>
            </li>
            <li>
              <Link className="text-sm text-gray-300 hover:text-[#D9E0A4]">
                blog
              </Link>
            </li>
            <li>
              <Link className="text-sm text-gray-300 hover:text-[#D9E0A4]">
                login
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-md font-semibold">NewsLetter</h2>
          <p className="text-gray-200 text-sm">
            get informed with our latest news and services
          </p>

          <div className="w-full max-w-[400px] rounded-lg border-2 border-[#D9E0A4] grid grid-cols-3 mt-5">
            <input
              className="col-span-2 h-full bg-transparent pl-4 outline-none border-none"
              type="email"
              placeholder="...Email"
            />
            <button
              className="col-span-1 border-2 bg-[#D9E0A4] border-[#D9E0A4] hover:bg-[#19485F] hover:border-2 hover:border-[#D9E0A4] hover:text-white text-black my-1 py-1 px-5 rounded-md mr-4 text-sm"
              type="button"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="w-[70%] h-[1px] bg-gray-300 mx-auto"></div>
      <p className="text-white text-xs text-center my-2">copyright reserved for BusConsult</p>
    </section>
  );
}
