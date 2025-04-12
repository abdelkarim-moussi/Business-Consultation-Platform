import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Input from "./Input";
import Button from "./Button";

const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [accountType, setAccountType] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        firstName,
        lastName,
        email,
        accountType,
        password,
        password_confirmation,
      });

      alert(response.data.message);
      sessionStorage.setItem("token", JSON.stringify(response.data.token));
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-[400px] mt-5">
      <h3 className="text-md font-semibold uppercase">Sign up</h3>
      <form className="w-full flex flex-col gap-4" onSubmit={handleRegister}>
        <Input
          label="Email"
          name="email"
          id="email"
          type="email"
          value={email}
          div_extra="flex-col"
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="flex gap-4">
        <Input
          label="first name"
          name="first-name"
          id="first-name"
          type="text"
          value={firstName}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="last name"
          name="last-name"
          id="last-name"
          type="text"
          value={lastName}
          onChange={(e) => setName(e.target.value)}
        />
        </div>

        <div className="flex gap-4">
          <Input
            label="Password"
            name="password"
            id="password"
            type="password"
            value={password}
            div_extra="flex-col"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            label="Password confirmation"
            name="password-confirmation"
            id="password-confirmation"
            type="password"
            value={password_confirmation}
            div_extra="flex-col"
            onChange={(e) => setPassword_confirmation(e.target.value)}
          />
        </div>

        <ReactPasswordChecklist
          className="text-sm"
          iconSize={10}
          rules={["minLength", "specialChar", "capital", "letter","match"]}
          minLength={8}
          value={password}
          valueAgain={password_confirmation}
        />

        <div>
          <label htmlFor="account-type">Account Type</label>
          <div className="flex gap-4 h-full">
            <Input
              label="consultant"
              name="account-type"
              id="consultant"
              type="radio"
              value="consultant"
              extra="w-3"
              div_extra="items-center"
              onChange={(e) => setRole(e.target.value)}
            />

            <Input
              label="entrepreneur"
              name="account-type"
              id="entrepreneur"
              type="radio"
              value="entrepreneur"
              extra="w-3"
              div_extra="items-center"
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
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
