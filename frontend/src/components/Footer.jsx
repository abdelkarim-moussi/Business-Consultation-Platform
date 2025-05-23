import { Link } from "react-router-dom";
import Facebook from "../assets/images/icon-facebook.svg";
import Whatssap from "../assets/images/icon-whatsapp.svg";
import Instagram from "../assets/images/icon-instagram.svg";

export default function Footer() {
  return (
    <section className="bg-[#4F46E5] flex flex-col justify-center">
      <div className="px-5 py-10 flex justify-around flex-wrap gap-10 text-white">
        <div className="flex flex-col">
          <Link
            to="/"
            className="text-white font-bold tracking-wider text-2xl capitalize"
          >
            <span className="text-[#EEF2FF]">Buz</span>Consult
          </Link>
          <div className="flex gap-2 items-center mt-3">
            <a href="">
              <img src={Facebook} alt="facebook" className="w-[30px] hover:bg-[#4338CA] rounded-full" />
            </a>
            <a href="">
              <img src={Instagram} alt="instagram" className="w-[30px] hover:bg-[#4338CA] rounded-full" />
            </a>
            <a href="">
              <img src={Whatssap} alt="whatssap" className="w-[30px] hover:bg-[#4338CA] rounded-full" />
            </a>
          </div>
        </div>
        <div>
          <h2 className="text-md font-semibold">Quick Links</h2>
          <ul>
            <li>
              <Link className="text-sm text-gray-300 hover:text-[#EEF2FF]">
                consultants
              </Link>
            </li>
            <li>
              <Link className="text-sm text-gray-300 hover:text-[#EEF2FF]">
                blog
              </Link>
            </li>
            <li>
              <Link className="text-sm text-gray-300 hover:text-[#EEF2FF]">
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

          <div className="w-full max-w-[400px] rounded-lg border-[1.5px] border-white grid grid-cols-3 mt-5">
            <input
              className="col-span-2 h-full bg-transparent pl-3 outline-none border-none text-sm"
              type="email"
              placeholder="...email"
            />
            <button
              className="col-span-1 border-[1.5px] border-[#EEF2FF] bg-transparent hover:bg-[#EEF2FF] text-white hover:text-[#4338CA] my-1 py-1 px-5 rounded-md mr-4 text-sm"
              type="button"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="w-[70%] h-[1px] bg-gray-300 mx-auto"></div>
      <p className="text-gray-300 text-xs text-center my-2">copyright reserved for BusConsult</p>
    </section>
  );
}
