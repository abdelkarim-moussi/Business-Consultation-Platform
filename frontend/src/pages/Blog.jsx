import { useEffect, useState } from "react";
import axios from "axios";
import PageHead from "../components/PageHead";
import HeadImage from "../assets/images/blogHead.png";
import InputButton from "../components/InputButton";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import ArticleSection from "../components/ArticlesSection";
import NavBar from "../components/Navbar";

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage, setArticlesPerPage] = useState(12);
  const [category, setCategory] = useState("");
  const [industry, setIndustry] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://127.0.0.1:8000/api/articles");
        setArticles(response.data.articles || []);
        setFilteredArticles(response.data.articles || []);
        setLoading(false);
      } catch (error) {
        console.log("error fetching articles", error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    const filteredArticles = articles.filter((article) => {
      const titleMatch = article.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const industryMatch = industry ? article.industry === industry : true;
      const categoryMatch = category ? article.category === category : true;
      return titleMatch && industryMatch && category;
    });

    setFilteredArticles(filteredArticles);
    setCurrentPage(1);
  }, [articles, category, industry, searchTerm]);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleIndustryChange = (e) => {
    setIndustry(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClick = () => {
    setSearchTerm(searchTerm);
  };

  return (
    <>
      <NavBar />
      <PageHead title="Explore our Blogs" image={HeadImage} />
      <section className="flex flex-col md:flex-row gap-4 items-center justify-around my-10">
        <div className="flex flex-col md:flex-row gap-5 items-center">
          <h3>Filter By</h3>
          <select
            name="category"
            id="category"
            className="border-2 text-sm border-[#D9E0A4] px-6 py-1 capitalize transition hover:border-[#19485F] rounded-md cursor-pointer"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="">category</option>
            <option value="management">project management</option>
            <option value="sales">Sales</option>
            <option value="marketing">Marketing</option>
          </select>
          <select
            name="industry"
            id="industry"
            className="border-2 text-sm border-[#D9E0A4] px-6 py-1 capitalize transition hover:border-[#19485F] rounded-md cursor-pointer"
            value={industry}
            onChange={handleIndustryChange}
          >
            <option value="">Industry</option>
            <option value="it">It</option>
            <option value="finance">Finance</option>
            <option value="agency">Agency</option>
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

      <ArticleSection
        data={filteredArticles}
        loading={loading}
        currentPage={currentPage}
        articlesPerPage={articlesPerPage}
      />
      <Pagination
        currentPage={currentPage}
        dataPerPage={articlesPerPage}
        totalData={filteredArticles.length}
        handlePagination={handlePagination}
      />

      <Footer />
    </>
  );
};

export default Blog;
