import { useEffect, useState } from "react";
import axios from "axios";
import PageHead from "../../components/PageHead";
import HeadImage from "../../assets/images/head.png";
import InputButton from "../../components/buttons/InputButton";
import ConsultantsSection from "../../components/consultant.components/ConsultantsSection";
import Pagination from "../../components/Pagination";
import Footer from "../../components/Footer";
import NavBar from "../../components/Navbar";
import { AuthProvider } from "../../context/AuthContext";

const Consultants = () => {
  const [consultants, setConsultants] = useState([]);
  const [filteredConsultants, setFilteredConsultants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [consultantsPerPage, setConsultantsPerPage] = useState(12);
  const [industry, setIndustry] = useState("");
  const [experience, setExperience] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchConsultants = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://127.0.0.1:8000/api/consultants"
        );
        setConsultants(response.data.consultants || []);
        setFilteredConsultants(response.data.consultants || []);
        setLoading(false);
      } catch (error) {
        console.log("error fetching consultants", error);
        setLoading(false);
      }
    };

    fetchConsultants();
  }, []);

  useEffect(() => {
    const filteredConsultants = consultants.filter((consultant) => {
      var fullName = consultant.lastName + " " + consultant.firstName;
      const nameMatch = fullName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const industryMatch = industry
        ? consultant.domainExpertise === industry
        : true;
      const experienceMatch = experience
        ? consultant.experience == experience
        : true;

      return nameMatch && industryMatch && experienceMatch;
    });

    setFilteredConsultants(filteredConsultants);
    setCurrentPage(1);
  }, [consultants, industry, experience, searchTerm]);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleIndustryChange = (e) => {
    setIndustry(e.target.value);
  };

  const handleExperienceChange = (e) => {
    setExperience(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClick = () => {
    setSearchTerm(searchTerm);
  };

  return (
    <>
      <AuthProvider>
        <NavBar />
      </AuthProvider>
      <PageHead title="Find The Consultant you need" image={HeadImage} />
      <section className="flex flex-col md:flex-row gap-4 items-center justify-around my-10">
        <div className="flex flex-col md:flex-row gap-5 items-center">
          <h3>Filter By</h3>
          <select
            name="industry"
            id="industry"
            className="border-2 text-sm border-[#4F46E5] px-6 py-1 capitalize transition hover:border-[#4338CA] rounded-md cursor-pointer"
            value={industry}
            onChange={handleIndustryChange}
          >
            <option value="">Industry</option>
            <option value="tech">Tech</option>
            <option value="finance">Finance</option>
            <option value="sales">Sales</option>
            <option value="marketing">Marketing</option>
          </select>
          <select
            name="experience"
            id="experience"
            className="border-2 text-sm border-[#4338CA] px-6 py-1 capitalize transition hover:border-[#4338CA] rounded-md cursor-pointer"
            value={experience}
            onChange={handleExperienceChange}
          >
            <option value="">Experience</option>
            <option value="2">2 years</option>
            <option value="5">5 years</option>
            <option value="10">10 years</option>
            <option value="20">20 years</option>
          </select>
        </div>

        <InputButton
          type="text"
          placeholder="Search..."
          buttonType="button"
          buttonText="Search"
          onChange={handleSearch}
          onClick={handleClick}
        />
      </section>

      <ConsultantsSection
        data={filteredConsultants}
        loading={loading}
        currentPage={currentPage}
        consultantsPerPage={consultantsPerPage}
      />
      <Pagination
        currentPage={currentPage}
        dataPerPage={consultantsPerPage}
        totalData={filteredConsultants.length}
        handlePagination={handlePagination}
      />
      <Footer />
    </>
  );
};

export default Consultants;
