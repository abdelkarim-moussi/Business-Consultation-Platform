import React, { useState } from "react";
import Button from "./buttons/PrimaryButton";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "./Input";
import Label from "./Label";
import { useAuth } from "../context/AuthContext";

export default function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [email_error, setEmailError] = useState("");
  const [pass_error, setPassError] = useState("");
  const navigate = useNavigate();
  const validateEmail = (value) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(value);
  };

  const handleChange = (e) => {
    const value = e.target.value;

    if (!validateEmail(value)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
      setEmail(value);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({ email, password });
      if (userData.accountType === "consultant") {
        navigate("/consultantDash");
      } else if (userData.accountType === "entrepreneur") {
        navigate("/entrepreneurDash");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-[400px] my-40">
      <h3 className="text-md font-semibold uppercase">Log in</h3>

      <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label label="Email" forInput="email" />
          <Input
            name="email"
            id="email"
            type="email"
            value={email}
            onChange={handleChange}
          />
        </div>

        {email_error && (
          <p className="text-sm text-red-500 mt-[-10px]">{email_error}</p>
        )}
        <div className="flex flex-col gap-2">
          <Label label="Password" forInput="password" />
          <Input
            name="password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {pass_error && (
          <p className="text-sm text-red-500 mt-[-10px]">{pass_error}</p>
        )}

        <Button type="submit" text="login" />

        <p className="text-center">
          don't have an account :
          <Link className="text-semibold" to="../register">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
