import React from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import AboutSection from "../components/AboutSection";
import { ServicesSection } from "../components/ServicesSection";
import { ExpertsSection } from "../components/ExpertsSection";
import { BenifitsSection } from "../components/BenifitsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <div className="hero-section grid grid-cols-2 h-[100vh]">
        <div></div>
        <div className="col-span-2 md:col-span-1 mt-40">
          <h4 className="text-md text-white text-center md:text-left">
            Welcome To BusConsult
          </h4>
          <h1 className="text-[4rem] font-semibold text-center md:text-left md:text-[5rem] leading-[4rem] mb-10">
            take your business to the next level
          </h1>
          <div className="flex gap-5 justify-center md:justify-start">
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
      <ServicesSection />
      <ExpertsSection />
      <BenifitsSection />
      <TestimonialsSection/>
      <Footer/>
    </>
  );
};

export default Home;
