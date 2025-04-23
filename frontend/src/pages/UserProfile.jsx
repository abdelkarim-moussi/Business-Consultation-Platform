import { useEffect, useState } from "react";
import Input from "../components/Input";
import Label from "../components/Label";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import ArrowBack from "../assets/images/arrow-back.png";

export default function UserProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    domainExpertise: "",
    experience: 0,
    sectorActivity: "",
    tags: "",
    currentPassword: "",
    newPassword: "",
    newPassword_confirmation: "",
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const token = sessionStorage.getItem("token");

    const response = await axios.get("http://127.0.0.1:8000/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const fetchedUser = response.data.user;

    setForm((prev) => ({
      ...prev,
      firstName: fetchedUser.firstName,
      lastName: fetchedUser.lastName,
      email: fetchedUser.email,
      experience: fetchedUser.experience || "",
      sectorActivity: fetchedUser.sectorActivity || "",
      tags: fetchedUser.tags || "",
      domainExpertise: fetchedUser.domainExpertise,
      currentPassword: "",
      newPassword: "",
      newPassword_confirmation: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = sessionStorage.getItem("token");

      const response = await axios.put(
        `http://127.0.0.1:8000/api/profile/${user.id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      alert(response.data.message);
    } catch (error) {
      console.log("error updating the user", error);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    try {
      const token = sessionStorage.getItem("token");

      const response = await axios.put(
        "http://127.0.0.1:8000/api/resetpassword",

        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      alert(response.data.message);

      setForm({
        ...prev,
        currentPassword: "",
        newPassword: "",
        newPassword_confirmation: "",
      });

      
    } catch (error) {
      throw ("password reset failed", error);
    }
  };

  return (
    <>
      <div className="h-20 w-full bg-[#19485F] flex items-center justify-center sticky top-0">
        <button
          onClick={() => navigate(-1)}
          className="text-white px-8 py-1 border-y rounded-lg hover:border-[#D9E0A4] hover:text-[#D9E0A4] flex items-center justify-center"
        >
          <img src={ArrowBack} className="w-5"></img>
          back to dashboard{" "}
        </button>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <img
                className="h-32 w-32 rounded-full mx-auto border border-[#D9E0A4] text-sm"
                alt="Photo"
              />
              <form className="mt-4 space-y-4 space-x-3">
                <label
                  htmlFor="photo"
                  className="border border-black text-gray-700 px-4 py-2 rounded-lg hover:border-[#D9E0A4] transition text-sm cursor-pointer"
                >
                  Update picture +
                </label>
                <input id="photo" name="photo" type="file" className="hidden" />
                <Button text="save" type="submit" />
              </form>
              <div className="mt-6 border-t border-gray-200 pt-6 text-center">
                <h3 className="text-lg font-normal text-gray-900">
                  {form.firstName + " " + form.lastName}
                </h3>
                <p className="text-sm text-gray-500">Membre since</p>
                <p className="text-sm text-gray-600 mt-2 bg-slate-100"></p>

                <div className="mt-6 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">average rate</span>
                    <span className="text-gray-900 font-medium">
                      <i className="fas fa-star text-[#19485F] mr-1"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 md:mt-0 md:col-span-2 space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-light text-gray-900 mb-6">
                Personnal Informations
              </h3>
              <form className="grid grid-cols-6 gap-6" onSubmit={handleSubmit}>
                <div className="col-span-6 sm:col-span-3">
                  <Label label="First Name" />
                  <Input
                    id="first-name"
                    name="first-name"
                    type="text"
                    value={form.firstName}
                    inputClasses="rounded-lg outline-none"
                    onChange={(e) =>
                      setForm({ ...form, firstName: e.target.value })
                    }
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <Label label="Last Name" />
                  <Input
                    id="last-name"
                    name="last-name"
                    type="text"
                    value={form.lastName}
                    inputClasses="rounded-lg outline-none"
                    onChange={(e) =>
                      setForm({ ...form, lastName: e.target.value })
                    }
                  />
                </div>

                <div className="col-span-3 w-full">
                  <Label label="Email" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    inputClasses="rounded-lg outline-none"
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </div>
                {/* <div className="col-span-3">
                <Label label="Phone Number" />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputClasses="rounded-lg outline-none"
                />
              </div> */}

                <div className="col-span-3">
                  <Label label="Sector Of Activity" />
                  <Input
                    id="sector"
                    name="sector"
                    type="text"
                    value={form.sectorActivity}
                    inputClasses="rounded-lg outline-none"
                    onChange={(e) =>
                      setForm({ ...form, sectorActivity: e.target.value })
                    }
                  />
                </div>

                <div className="col-span-3">
                  <Label label="Domain of Expertise" />
                  <Input
                    id="domain"
                    name="domain"
                    type="text"
                    value={form.domainExpertise}
                    inputClasses="rounded-lg outline-none"
                    onChange={(e) =>
                      setForm({ ...form, domainExpertise: e.target.value })
                    }
                  />
                </div>

                <div className="col-span-6">
                  <Label label="Years of Experience" />
                  <Input
                    id="experience"
                    name="experience"
                    type="number"
                    value={form.experience}
                    inputClasses="rounded-lg outline-none"
                    onChange={(e) =>
                      setForm({ ...form, experience: e.target.value })
                    }
                  />
                </div>
                <div className="col-span-6">
                  <Button type="submit" text="save changes" />
                </div>
              </form>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-light text-gray-900 mb-6">
                Sécurité
              </h3>
              <form className="space-y-4" onSubmit={handlePasswordReset}>
                <div className="grid grid-cols-3 gap-4 items-center">
                  <div>
                    <Label label="current password" />
                    <Input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      inputClasses="rounded-lg outline-none"
                      value={form.currentPassword}
                      onChange={(e) =>
                        setForm({ ...form, currentPassword: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label label="new password" />
                    <Input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      inputClasses="rounded-lg outline-none"
                      value={form.newPassword}
                      onChange={(e) =>
                        setForm({ ...form, newPassword: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label label="password confirmation" />
                    <Input
                      type="password"
                      id="newPassword_confirmation"
                      name="newPassword_confirmation"
                      inputClasses="rounded-lg outline-none"
                      value={form.newPassword_confirmation}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          newPassword_confirmation: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <Button type="submit" text="update password" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
