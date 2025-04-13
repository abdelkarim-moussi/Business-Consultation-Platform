import { useEffect, useState } from "react";
import axios from "axios";
import PageHead from "../components/PageHead";
import HeadImage from "../assets/images/head.png";
import ConsultantsSection from "../components/ConsultantsSection";
import Pagination from "../components/Pagination";
import InputButton from "../components/InputButton";

const Consultants = () => {
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [consultantsPerPage, setConsultantsPerPage] = useState(1);

  useEffect(() => {
    const fetchConsultants = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://127.0.0.1:8000/api/consultants"
        );
        setConsultants(response.data.consultants || []);
        setLoading(false);
      } catch (error) {
        console.log("error fetching consultants", error);
        setLoading(false);
      }
    };

    fetchConsultants();
  }, []);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <PageHead title="Find The Consultant you need" image={HeadImage} />
      <div className="flex flex-col mt-10 md:mt-0">
        <section className="flex flex-wrap gap-5 items-center justify-around my-10">
          <div className="flex flex-col md:flex-row gap-5 items-center">
            <h3>Filter By</h3>
            <select
              name="industry"
              id="industry"
              className="border-2 text-sm border-[#D9E0A4] px-6 py-1 capitalize transition hover:border-[#19485F] rounded-md cursor-pointer"
            >
              <option disabled>industry</option>
              <option value="tech">tech</option>
              <option value="finance">finance</option>
              <option value="sells">sells</option>
              <option value="marketing">marketing</option>
            </select>
            <select
              name="experience"
              id="experience"
              className="border-2 text-sm border-[#D9E0A4] px-6 py-1 capitalize transition hover:border-[#19485F] rounded-md cursor-pointer"
            >
              <option disabled>experience</option>
              <option value="2">2 years</option>
              <option value="5">5 years</option>
              <option value="10">10 years</option>
              <option value="20">20 years</option>
            </select>
          </div>

          <InputButton
            type="search"
            placeholder="...Search"
            buttonType="button"
            buttonText="Search"
          />
        </section>

        <section>
          <ConsultantsSection
            data={consultants}
            loading={loading}
            currentPage={currentPage}
            consultantsPerPage={consultantsPerPage}
          />
          <Pagination
            currentPage={currentPage}
            dataPerPage={consultantsPerPage}
            totalData={consultants.length}
            handlePagination={handlePagination}
          />
        </section>
      </div>
    </>
  );
};

export default Consultants;
