import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaClock,
  FaShare,
  FaBookmark,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import NavBar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { AuthProvider } from "../../context/AuthContext";

export default function ArticleDetails() {
  const [article, setArticle] = useState({});
  const [author, setAuthor] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/articles/${id}`
        );
        setArticle(response.data.article);
        setAuthor(response.data.article.author || {});
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch article:", error);
        setError("Failed to load article. Please try again later.");
        setIsLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-indigo-600 font-medium">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 max-w-md mx-auto bg-white rounded-xl shadow-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link
            to="/articles"
            className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <AuthProvider>
        <NavBar />
      </AuthProvider>

      <div className="min-h-screen flex flex-col bg-gray-50">
        <div className="bg-gradient-to-r  py-16 px-4 relative mt-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-4 flex items-center justify-center space-x-2">
              {article.category && (
                <span className="bg-white/20 text-indigo-500 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                  {article.category}
                </span>
              )}
              <span className="bg-gray-100 text-indigo-500 px-3 py-1 rounded-full text-sm backdrop-blur-sm flex items-center">
                <FaClock className="mr-1" /> {article.readTime || "5 min read"}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-indigo-700 mb-4">
              {article.title}
            </h1>

            <div className="flex items-center justify-center text-sm">
              <div className="flex items-center">
                <img
                  src={
                    author.photo ||
                    "https://randomuser.me/api/portraits/women/44.jpg"
                  }
                  className="w-10 h-10 rounded-full border-2 border-indigo-700"
                  alt={`${author.firstName[0] || ""} ${
                    author.lastName[0] || ""
                  }`}
                />
                <span className="ml-2 font-medium">
                  {author.firstName} {author.lastName}
                </span>
              </div>
              <span className="mx-3">•</span>
              <div className="flex items-center">
                <FaCalendarAlt className="mr-1" />
                <span>{formatDate(article.created_at)}</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gray-50 clip-path-wave"></div>
        </div>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 max-w-6xl mx-auto -mt-6 relative z-10">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <img
                src={article.cover || "/api/placeholder/800/400"}
                alt={article.title}
                className="w-full h-64 md:h-80 object-cover"
              />

              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <button className="p-2 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors">
                      <FaFacebookF />
                    </button>
                    <button className="p-2 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors">
                      <FaTwitter />
                    </button>
                    <button className="p-2 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors">
                      <FaLinkedinIn />
                    </button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-1 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors">
                      <FaShare size={14} />
                      <span className="text-sm">Share</span>
                    </button>
                    <button className="flex items-center space-x-1 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors">
                      <FaBookmark size={14} />
                      <span className="text-sm">Save</span>
                    </button>
                  </div>
                </div>

                <article
                  className="prose max-w-none prose-lg prose-headings:text-indigo-900 prose-a:text-indigo-600 prose-img:rounded-xl"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                ></article>

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <h4 className="text-sm font-medium text-gray-500 mb-3">
                      TAGS
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag) =>
                        tag.tags.split(",").map((tg, idx) => {
                          return (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-indigo-50 text-gray-700 hover:text-indigo-600 rounded-full text-sm transition-colors"
                            >
                              {tg}
                            </span>
                          );
                        })
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Author Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-lg mb-4 text-gray-800 pb-2 border-b border-gray-100">
                About the Author
              </h3>
              <div className="flex items-start space-x-4">
                <img
                  src={
                    author.photo ||
                    "https://randomuser.me/api/portraits/women/44.jpg"
                  }
                  className="w-16 h-16 rounded-full object-cover"
                  alt={`${author.firstName || ""} ${author.lastName || ""}`}
                />
                <div>
                  <p className="font-bold text-gray-800">
                    {author.firstName} {author.lastName}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    {author.title || "Business Consultant"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {author.bio ||
                      "Expert in business strategy with over 10 years of experience helping startups grow."}
                  </p>

                  <div className="mt-3">
                    <Link
                      to={`/consultants/${author.id}`}
                      className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                    >
                      View Profile →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Articles */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-lg mb-4 text-gray-800 pb-2 border-b border-gray-100">
                Related Articles
              </h3>
              <ul className="space-y-4">
                {(
                  article.relatedArticles || [
                    {
                      id: 1,
                      title: "How to Build a Business Plan",
                      image: "/api/placeholder/100/60",
                    },
                    {
                      id: 2,
                      title: "Top 5 Marketing Tools for Startups",
                      image: "/api/placeholder/100/60",
                    },
                    {
                      id: 3,
                      title: "Funding Tips from Experts",
                      image: "/api/placeholder/100/60",
                    },
                  ]
                ).map((relatedArticle, index) => (
                  <li key={index}>
                    <Link
                      to={`/articles/${relatedArticle.id}`}
                      className="flex group items-start"
                    >
                      <img
                        src={relatedArticle.image}
                        alt={relatedArticle.title}
                        className="w-16 h-12 rounded object-cover mr-3"
                      />
                      <p className="text-gray-700 group-hover:text-indigo-600 transition-colors">
                        {relatedArticle.title}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 p-6 rounded-xl shadow-sm text-white">
              <h3 className="font-semibold text-lg mb-2">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-indigo-100 text-sm mb-4">
                Get the latest articles and business tips straight to your
                inbox.
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="submit"
                  className="w-full bg-white text-indigo-600 font-medium px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </aside>
        </main>
      </div>

      <style jsx>{`
        .clip-path-wave {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        }
      `}</style>

      <Footer />
    </>
  );
}
