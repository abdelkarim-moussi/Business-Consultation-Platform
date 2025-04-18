import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Input from "./Input";
import Button from "./Button";
import ReactPasswordChecklist from "react-password-checklist";
import Label from "./Label";
import { useAuth } from "../context/AuthContext";

const RegisterForm = () => {
  const { register } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [accountType, setAccountType] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRegister = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email format";
    }
    if (!password) newErrors.password = "Password is required";
    if (!password_confirmation)
      newErrors.password_confirmation = "Password confirmation is required";
    if (password !== password_confirmation)
      newErrors.passwordMatch = "Passwords do not match";
    if (!accountType) newErrors.accountType = "Account type is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    register({
      firstName,
      lastName,
      email,
      accountType,
      password,
      password_confirmation,
    });
  };

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-[400px] my-40">
      <h3 className="text-md font-semibold uppercase">Sign up</h3>
      <form className="w-full flex flex-col gap-4" onSubmit={handleRegister}>
        <div className="flex flex-col gap-2">
          <Label label="email" forInput="email" />
          <Input
            name="email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-2">
            <Label label="first name" forInput="first-name" />
            <Input
              name="first-name"
              id="first-name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs">{errors.firstName}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label label="last name" forInput="last-name" />
            <Input
              name="last-name"
              id="last-name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-2">
            <Label label="password" forInput="password" />
            <Input
              name="password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label
              label="password confirmation"
              forInput="password-confirmation"
            />
            <Input
              name="password-confirmation"
              id="password-confirmation"
              type="password"
              value={password_confirmation}
              onChange={(e) => setPassword_confirmation(e.target.value)}
            />
            {errors.password_confirmation && (
              <p className="text-red-500 text-xs">
                {errors.password_confirmation}
              </p>
            )}
            {errors.passwordMatch && (
              <p className="text-red-500 text-xs">{errors.passwordMatch}</p>
            )}
          </div>
        </div>

        <ReactPasswordChecklist
          className="text-sm"
          iconSize={10}
          rules={["minLength", "specialChar", "capital", "letter", "match"]}
          minLength={8}
          value={password}
          valueAgain={password_confirmation}
        />

        <div>
          <label htmlFor="account-type">Account Type</label>
          <div className="flex gap-10 items-center">
            <div className="flex flex-row items-center gap-2">
              <Input
                name="account-type"
                id="consultant"
                type="radio"
                value="consultant"
                inputClasses="w-3"
                onChange={(e) => setAccountType(e.target.value)}
              />
              <Label label="consultant" forInput="consultant" />
            </div>

            <div className="flex flex-row items-center align-middle gap-2">
              <Input
                name="account-type"
                id="entrepreneur"
                type="radio"
                value="entrepreneur"
                inputClasses="w-3"
                onChange={(e) => setAccountType(e.target.value)}
              />
              <Label label="entrepreneur" forInput="entrepreneur" />
            </div>
          </div>
          {errors.accountType && (
            <p className="text-red-500 text-xs">{errors.accountType}</p>
          )}
        </div>

        <Button type="submit" text="sign up" />

        <p className="text-center">
          already have an account :
          <Link className="text-semibold" to="../login">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
