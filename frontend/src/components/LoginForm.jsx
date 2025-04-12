import React, { useState } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import axios from "axios";
import Input from "./Input";
import Label from "./Label";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [email_error, setEmailError] = useState("");
  const [pass_error, setPassError] = useState("");

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
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });

      alert(response.data.message);
      sessionStorage.setItem("token", JSON.stringify(response.data.token));
    } catch (error) {
      alert("Login Failed", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-[400px] my-40">
      <h3 className="text-md font-semibold uppercase">Log in</h3>

      <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label label="Email" forInput="email"/>
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
          <Label label="Password" forInput="password"/>
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
