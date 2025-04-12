import React from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import AboutSection from "../components/AboutSection";

const Home = () => {
  return (
    <>
      <div className="hero-section grid grid-cols-2 h-[100vh]">
        <div></div>
        <div className="col-span-1 mt-40">
          <h1 className="text-[5rem] leading-[4rem] mb-10">
            take your business to the next level
          </h1>
          <div className="flex gap-5">
            <Link
              to="/login"
              className="border-2 border-[#D9E0A4] px-8 py-1 text-white capitalize transition hover:border-[#19485F] rounded-md"
            >
              login
            </Link>
            <Link
              to="/register"
              className="bg-[#19485F] border-2 border-[#19485F] px-8 py-1 text-white capitalize transition hover:bg-[#D9E0A4] hover:border-[#D9E0A4] hover:text-[#19485F] rounded-md"
            >
              register
            </Link>
          </div>
        </div>
      </div>

      <AboutSection />
    </>
  );
};

export default Home;
