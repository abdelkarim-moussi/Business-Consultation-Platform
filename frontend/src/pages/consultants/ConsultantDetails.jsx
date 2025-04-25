import Navbar from "../../components/Navbar";
import { AuthProvider } from "../../context/AuthContext";
import User from "../../assets/images/user.png";
import Button from "../../components/buttons/Button";
import SecondaryButton from "../../components/buttons/SecondaryButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReservationModal from "../../components/ReservationModal";

export default function ConsultantDetails() {
  const [consultant, setConsultant] = useState({});
  const id = useParams();
  const [modalOpen, setModalOpen] = useState(false);

  const handleRequestCall = async (data) => {
    try {
      const token = sessionStorage.getItem("token");

      const response = await axios.post(
        "http://127.0.0.1:8000/api/consultations",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      alert(response.data.message);

    } catch (error) {
      console.log("error submiting the request call", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/consultants/${id.id}`
      );
      setConsultant(response.data.consultant[0]);
    };
    fetchUser();
  }, []);

  return (
    <>
      <AuthProvider>
        <Navbar />
      </AuthProvider>

      <div className="grid grid-cols-3 px-10 py-5 w-full pt-20">
        <div className="col-span-2 p-5 flex gap-5">
          <img src={User} alt="" className="w-40 h-40 object-fit" />
          <div className="p-5">
            <h3 className="font-medium capitalize text-lg">
              {consultant.firstName + " " + consultant.lastName}
            </h3>
            <h3 className="capitalize text-lg">{consultant.domainExpertise}</h3>
            <h3 className="capitalize text-md font-light">
              <span className="font-bold">{consultant.experience}</span> years
              of experience
            </h3>
            <p className="text-md capitalize font-light tracking-widest">
              location
            </p>
            <p className="text-md font-normal mt-3">
              "overview" Expert in PR/Public Relations and Growth Hacking.
              Founder of several multi-million dollar Internet 1000 retailers,
              including CanvasPop.com. Helped launch MyFax.com (which sold for
              over 220M) and launched a top 1% iOS app. I’m also a global mentor
              for 500 Startups. I can show you how to get massive
            </p>
          </div>
        </div>

        <div className="col-span-1 p-5 space-y-5">
          <div className="px-5 py-10 flex flex-col gap-5 justify-center border-[1px] rounded-lg">
            <Button text="Request a Call" onClick={() => setModalOpen(true)} />
            <SecondaryButton
              text="Send a Message"
              extraClasses="text-black text-center"
            />
            <SecondaryButton
              text="Save To favorite"
              extraClasses="text-black text-center"
            />
          </div>
          <div className="px-5 py-10 border-[1px] rounded-lg">
            <div className="flex gap-5 justify-around">
              <div className="text-center">
                <p className="font-semibold text-lg">200</p>
                <p className="font-light">consultations</p>
              </div>
              <div className="h-10 w-[1px] bg-gray-200"></div>
              <div className="text-center">
                <p className="font-semibold text-lg">400</p>
                <p className="font-light">reviews</p>
              </div>
            </div>
            <div className="h-[1px] w-full bg-gray-200 mx-auto my-5"></div>
            <p className="font-light text-center text-sm">
              Member since May 2024
            </p>
          </div>
        </div>
      </div>

      <AuthProvider>
        <ReservationModal
          isOpen={modalOpen}
          consultant_id={id.id}
          onClose={() => setModalOpen(false)}
          onSubmit={handleRequestCall}
        />
      </AuthProvider>
    </>
  );
}
