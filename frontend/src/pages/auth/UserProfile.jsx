import { useEffect, useState } from "react";
import Input from "../../components/Input";
import Label from "../../components/Label";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import Button from "../../components/buttons/PrimaryButton";
import ArrowBack from "../../assets/images/arrow-back.png";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function UserProfile() {
  const { user } = useAuth();
  const [authUser, setAuthUser] = useState({});
  const [picture, setPicture] = useState("");
  const navigate = useNavigate();
  const decoded = jwtDecode(sessionStorage.getItem("token"));

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
    setAuthUser(response.data.user);

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

      toast.success(response.data.message);
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

      toast.success(response.data.message);

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

  const handleUpdatePhoto = async (e) => {
    e.preventDefault();

    try {
      const token = sessionStorage.getItem("token");
      const form = new FormData();

      form.append("photo", picture);
      form.append("method", "PUT");

      const response = await axios.post(
        "http://127.0.0.1:8000/api/updatephoto",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(response.data.message);
    } catch (error) {
      console.log("photo update was failed", error);
      toast.error("photo update failed");
    }
  };

  console.log(authUser.avgrating);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-white hover:text-indigo-200 transition duration-200"
            >
              <img src={ArrowBack} className="w-4" alt="Back" />
              <span>Back</span>
            </button>
            <h1 className="ml-8 text-xl font-medium">Your Profile</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="md:grid md:grid-cols-3 md:gap-8">
          <div className="md:col-span-1">
            <div className="bg-white shadow rounded-xl overflow-hidden">
              <div className="h-24 bg-gradient-to-r from-indigo-500 to-indigo-600"></div>

              <div className="relative px-6 pb-6">
                <div className="absolute -top-24 w-full left-0 flex justify-center">
                  {authUser.photo ? (
                    <div className="w-24 h-24 ring-4 ring-white rounded-full bg-indigo-100 overflow-hidden">
                      <img
                        src={authUser.photo}
                        alt="img"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  ) : (
                    <div className="ring-4 ring-white rounded-full">
                      <div className="h-24 w-24 rounded-full bg-indigo-100 flex items-center justify-center border-4 border-white shadow-md">
                        <span className="text-indigo-600 text-2xl font-bold">
                          {form.firstName && form.firstName[0]}
                          {form.lastName && form.lastName[0]}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-16 text-center">
                  <form className="space-y-4" onSubmit={handleUpdatePhoto}>
                    <div className="flex justify-center gap-3">
                      <label
                        htmlFor="photo"
                        className="border border-indigo-200 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors duration-200 text-sm cursor-pointer"
                      >
                        Update picture +
                      </label>
                      <input
                        id="photo"
                        name="photo"
                        type="file"
                        className="hidden"
                        onChange={(e) => setPicture(e.target.files[0])}
                      />
                      <Button text="Save" type="submit" />
                    </div>
                  </form>
                </div>
              </div>

              <div className="border-t border-gray-100 px-6 py-6">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-900">
                    {form.firstName} {form.lastName}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Member since{" "}
                    {authUser.created_at
                      ? new Date(authUser.created_at).toLocaleDateString()
                      : "N/A"}
                  </p>

                  <div className="mt-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                      {authUser.accountType}
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  {authUser.accountType === "consultant" && (
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-500">Average Rating</span>
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-indigo-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-1 font-medium">
                          {parseFloat(authUser.avgrating) || 0}/5
                        </span>
                      </div>
                    </div>
                  )}

                  {decoded.accountType === "consultant" &&
                    form.domainExpertise && (
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="text-gray-500">Expertise</span>
                        <span className="font-medium text-gray-800">
                          {form.domainExpertise}
                        </span>
                      </div>
                    )}

                  {decoded.accountType === "entrepreneur" &&
                    form.sectorActivity && (
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="text-gray-500">Sector</span>
                        <span className="font-medium text-gray-800">
                          {form.sectorActivity}
                        </span>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 md:mt-0 md:col-span-2 space-y-8">
            <div className="bg-white shadow rounded-xl overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100">
                <h3 className="text-lg font-medium text-gray-900">
                  Personal Information
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Update your profile information
                </p>
              </div>

              <div className="px-6 py-6">
                <form
                  className="grid grid-cols-6 gap-6"
                  onSubmit={handleSubmit}
                >
                  <div className="col-span-6 sm:col-span-3">
                    <Label label="First Name" />
                    <Input
                      id="first-name"
                      name="first-name"
                      type="text"
                      value={form.firstName}
                      inputClasses="rounded-lg border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                      inputClasses="rounded-lg border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      onChange={(e) =>
                        setForm({ ...form, lastName: e.target.value })
                      }
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <Label label="Email" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      inputClasses="rounded-lg border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                    />
                  </div>

                  {decoded.accountType === "entrepreneur" && (
                    <div className="col-span-6 sm:col-span-4">
                      <Label label="Sector of Activity" />
                      <Input
                        id="sector"
                        name="sector"
                        type="text"
                        value={form.sectorActivity}
                        inputClasses="rounded-lg border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        onChange={(e) =>
                          setForm({ ...form, sectorActivity: e.target.value })
                        }
                      />
                    </div>
                  )}

                  {decoded.accountType === "consultant" && (
                    <>
                      <div className="col-span-6 sm:col-span-4">
                        <Label label="Domain of Expertise" />
                        <Input
                          id="domain"
                          name="domain"
                          type="text"
                          value={form.domainExpertise}
                          inputClasses="rounded-lg border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          onChange={(e) =>
                            setForm({
                              ...form,
                              domainExpertise: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-2">
                        <Label label="Years of Experience" />
                        <Input
                          id="experience"
                          name="experience"
                          type="number"
                          value={form.experience}
                          inputClasses="rounded-lg border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          onChange={(e) =>
                            setForm({ ...form, experience: e.target.value })
                          }
                        />
                      </div>
                    </>
                  )}

                  <div className="col-span-6 pt-3">
                    <Button type="submit" text="Save Changes" />
                  </div>
                </form>
              </div>
            </div>

            <div className="bg-white shadow rounded-xl overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100">
                <h3 className="text-lg font-medium text-gray-900">Security</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Update your password
                </p>
              </div>

              <div className="px-6 py-6">
                <form onSubmit={handlePasswordReset}>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-2">
                      <Label label="Current Password" />
                      <Input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        inputClasses="rounded-lg border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        value={form.currentPassword}
                        onChange={(e) =>
                          setForm({ ...form, currentPassword: e.target.value })
                        }
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                      <Label label="New Password" />
                      <Input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        inputClasses="rounded-lg border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        value={form.newPassword}
                        onChange={(e) =>
                          setForm({ ...form, newPassword: e.target.value })
                        }
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                      <Label label="Confirm Password" />
                      <Input
                        type="password"
                        id="newPassword_confirmation"
                        name="newPassword_confirmation"
                        inputClasses="rounded-lg border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        value={form.newPassword_confirmation}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            newPassword_confirmation: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="col-span-6 pt-3">
                      <Button type="submit" text="Update Password" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
