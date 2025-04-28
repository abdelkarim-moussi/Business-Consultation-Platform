import { useEffect, useState } from "react";
import axios from "axios";
import PageHead from "../../components/PageHead";
import HeadImage from "../../assets/images/blogHead.png";
import InputButton from "../../components/buttons/InputButton";
import Pagination from "../../components/Pagination";
import Footer from "../../components/Footer";
import ArticleSection from "../../components/sections/ArticlesSection";
import NavBar from "../../components/Navbar";
import { AuthProvider } from "../../context/AuthContext";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage, setArticlesPerPage] = useState(12);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
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
      const categoryMatch = category ? article.category_id == category : true;

      return titleMatch, categoryMatch;
    });

    setFilteredArticles(filteredArticles);
    setCurrentPage(1);
    fetchCategories();
  }, [articles, category, searchTerm]);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/categories");
      setCategories(response.data.categories);
    } catch (error) {
      throw error;
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
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
      <PageHead title="Explore our Blogs" image={HeadImage} />
      <section className="flex flex-col md:flex-row gap-4 items-center justify-around my-10">
        <div className="flex flex-col md:flex-row gap-5 items-center">
          <h3>Filter By</h3>
          <select
            name="category"
            id="category"
            className="border-2 text-sm border-[#4338CA] px-6 py-1 capitalize transition hover:border-[#4338CA] rounded-md cursor-pointer"
            value={category}
            onChange={handleCategoryChange}
          >
            {categories.map((category) => {
              return (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              );
            })}
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

export default Articles;
