import React from "react";
import RegisterForm from "../components/RegisterForm";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";

export default function Register() {
  return (
    <>
      <NavBar />
      <div className="flex justify-center">
        <RegisterForm />
      </div>
      <Footer />
    </>
  );
}
