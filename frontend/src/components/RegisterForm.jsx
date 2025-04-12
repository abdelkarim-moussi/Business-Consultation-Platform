import { useState } from "react";
import { Link } from "react-router-dom";

const RegisterForm = () => {

  const {user,setUser} = useState({
    'first-name' : '',
    'last-name' : '',
    'email' : '',
    'account-type': '',
    'password' : '',
    'pasword_confirmation' : ''
  });



  return (
    <div className="flex flex-col justify-center items-center w-full max-w-[400px] m-5">
      <h3 className="text-md font-semibold uppercase">Sign up</h3>
      <div className="w-full flex flex-col gap-4">
        <div>
          <label className="text-sm" htmlFor="email">
            Email adress
          </label>
          <input
            className="w-full border border-black h-[35px] rounded-lg"
            id="email"
            name="email"
            type="text"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-sm" htmlFor="first-name">
              First Name
            </label>
            <input
              className="w-full border border-black h-[35px] rounded-lg"
              id="first-name"
              name="first-name"
              type="text"
            />
          </div>
          <div className="flex-1">
            <label className="text-sm" htmlFor="last-name">
              Last Name
            </label>
            <input
              className="w-full border border-black h-[35px] rounded-lg"
              id="last-name"
              name="last-name"
              type="text"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-sm" htmlFor="password">
              Password
            </label>
            <input
              className="w-full border border-black h-[35px] rounded-lg"
              id="password"
              name="password"
              type="password"
            />
          </div>
          <div className="flex-1">
            <label className="text-sm" htmlFor="password-confirmation">
              Confirm Password
            </label>
            <input
              className="w-full border border-black h-[35px] rounded-lg"
              id="password-confirmation"
              name="password-confirmation"
              type="password"
            />
          </div>
        </div>

        <div>
          <label htmlFor="account-type">Account Type</label>
          <div className="flex justify-items-center gap-4 h-full">
            <div className="flex items-center gap-2">
              <label>recruiter</label>
              <input type="radio" name="account-type" value="recruiter" className="align-middle" />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="">candidate</label>
              <input type="radio" name="account-type" value="candidate" />
            </div>
          </div>
        </div>

        <PrimaryButton text="sign up" extra="py-1.5 mt-2" />
        <p className="text-center">
          already have an account : <Link className="text-semibold" to="../login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
