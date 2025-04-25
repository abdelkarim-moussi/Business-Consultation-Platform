import React from "react";
import RegisterForm from "../../components/RegisterForm";
import Footer from "../../components/Footer";
import NavBar from "../../components/Navbar";
import { AuthProvider } from "../../context/AuthContext";

export default function Register() {
  return (
    <>
      <AuthProvider>
        <NavBar />
      </AuthProvider>
      
      <div className="flex justify-center">
        <RegisterForm />
      </div>
      <Footer />
    </>
  );
}
