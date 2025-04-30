import React from "react";
import Button from "../components/buttons/PrimaryButton";
import { Link } from "react-router-dom";
import AboutSection from "../components/sections/AboutSection";
import { ServicesSection } from "../components/sections/ServicesSection";
import { ExpertsSection } from "../components/sections/ExpertsSection";
import { BenifitsSection } from "../components/sections/BenifitsSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import { AuthProvider } from "../context/AuthContext";
import PrimaryLink from "../components/buttons/PrimaryLink";
import SecondaryLink from "../components/buttons/SecondaryLink";

const Home = () => {
  return (
    <>
      <AuthProvider>
        <NavBar />
      </AuthProvider>

      <div className="hero-section grid grid-cols-2 h-[100vh]">
        <div></div>
        <div className="col-span-2 md:col-span-1 mt-40">
          <h4 className="text-md text-white text-center md:text-left">
            Welcome To BusConsult
          </h4>
          <h1 className="text-[4rem] text-[#4F46E5] font-semibold text-center md:text-left md:text-[5rem] leading-[4rem] mb-10">
            take your business to the next level
          </h1>
          <div className="flex gap-5 justify-center md:justify-start items-center">
            
            <PrimaryLink text="Log In" link="/login" extraClasses="px-8"/>
            <SecondaryLink text="Sign Up" link="/register" extraClasses="px-8"/>
           
          </div>
        </div>
      </div>

      <AboutSection />
      <ServicesSection />
      <ExpertsSection />
      <BenifitsSection />
      <TestimonialsSection />

      <Footer />
    </>
  );
};

export default Home;
