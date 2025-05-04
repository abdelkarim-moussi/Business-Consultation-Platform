import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, replace } from "react-router-dom";
import {
  FaCalendarAlt,
  FaClock,
  FaShare,
  FaBookmark,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaArrowLeft,
} from "react-icons/fa";
import NavBar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { AuthProvider, useAuth } from "../../context/AuthContext";
import SecondaryButton from "../../components/buttons/SecondaryButton";
import { toast } from "react-toastify";
import { fetchAuthUser } from "../../services/userService";

export default function ArticleDetails() {
  const [article, setArticle] = useState({});
  const [author, setAuthor] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedArticles, setRalatedArticles] = useState([]);
  const { id } = useParams();

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [parentId, setParentId] = useState(null);
  const [count, setCount] = useState(3);
  const [authUser, setAuthUser] = useState({});
  const [replyModal, setReplyModal] = useState(null);

  const { user } = useAuth();

  const fetchAuth = async () => {
    const user = await fetchAuthUser();
    console.log(user);
    setAuthUser(user);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    try {
      if (comment.trim()) {
        const token = sessionStorage.getItem("token");
        const response = await axios.post(
          "http://127.0.0.1:8000/api/comments",
          {
            content: comment,
            article_id: article.id,
            parent_id: parentId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        await fetchArticle();
        toast.success(response.data.message);
        setComment("");
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const fetchRelatedArticles = async () => {
    const fetchedArt = await axios.get("http://127.0.0.1:8000/api/articles");
    setRalatedArticles(fetchedArt.data.articles.filter((ar) => ar.id != id));
  };

  const fetchArticle = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/articles/${id}`
      );
      setArticle(response.data.article);
      setAuthor(response.data.article.author || {});
      setComments(response.data.article.comments);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch article:", error);
      setError("Failed to load article. Please try again later.");
      setIsLoading(false);
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/comments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);
      fetchArticle();
    } catch (error) {
      console.log("there is an error", error);
      toast.error(response.data.error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchArticle();
      fetchRelatedArticles();
      fetchAuth();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <div className="text-center p-8 max-w-md mx-auto bg-white rounded-xl ">
          <div className="text-red-500 text-2xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link
            to="/blog"
            className="flex items-center justify-center gap-2 text-indigo-500 px-4 py-1 rounded-lg hover:text-indigo-700 transition-colors"
          >
            <FaArrowLeft /> Back to Articles
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

      <div className="min-h-screen flex flex-col">
        <div className="bg-gradient-to-r  py-16 px-4 relative mt-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-4 flex items-center justify-center space-x-2">
              {article.category && (
                <span className="bg-white/20 text-indigo-500 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                  {article.category.name}
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
                  src={author.photo}
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
        </div>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 max-w-6xl mx-auto -mt-6 relative z-10">
          <div className="lg:col-span-2 space-y-6">
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

            <div className="bg-white rounded-xl shadow-md p-6 mt-6">
              <h4 className="text-sm font-medium text-gray-500 border-b border-gray-100 pb-3">
                COMMENTS ({comments.length})
              </h4>
              {user && (
                <form onSubmit={handleSubmitComment} className="mt-4 mb-6">
                  <div className="flex items-start gap-3">
                    <img
                      src={authUser.photo}
                      alt="Your avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <textarea
                        rows="2"
                        placeholder="Write your comment here..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-100 rounded-lg resize-none p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      />
                      <div className="flex justify-end mt-2">
                        <SecondaryButton type="submit" text="Post Comment" />
                      </div>
                    </div>
                  </div>
                </form>
              )}

              <div className="space-y-5">
                {comments.slice(0, count).map(
                  (com) =>
                    !com.parent_id && (
                      <div
                        key={com.id}
                        className="border-b border-gray-100 pb-5"
                      >
                        <div className="flex items-start gap-3">
                          <img
                            src={com.user.photo}
                            alt={com.user.firstName[0]}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h5 className="text-sm capitalize font-semibold text-gray-800">
                                {com.user.firstName}
                              </h5>
                              <span className="text-xs text-gray-500">
                                {formatDate(com.created_at)}
                              </span>
                            </div>
                            <p className="text-gray-600 text-xs mt-1">
                              {com.content}
                            </p>
                            <div className="flex items-center gap-4 mt-2">
                              <button
                                className="text-xs text-gray-500 hover:text-indigo-600"
                                onClick={() => {
                                  setReplyModal(com.id);
                                  setParentId(com.id);
                                }}
                              >
                                Reply
                              </button>
                              {user && user.id == com.user_id && (
                                <button
                                  className="text-xs text-red-500 hover:text-red-600"
                                  onClick={() => handleDeleteComment(com.id)}
                                >
                                  delete
                                </button>
                              )}
                            </div>

                            {com.replies.map((rep, i) => {
                              return (
                                <div
                                  key={i}
                                  className="flex flex-col items-start justify-between gap-1 border-t py-1 mt-1"
                                >
                                  <div className="w-full flex items-center justify-between">
                                    <p className="text-gray-600 text-xs">
                                      {rep.content}
                                    </p>
                                    <span className="text-xs text-gray-500">
                                      {formatDate(rep.created_at)}
                                    </span>
                                  </div>

                                  {user && user.id == rep.user_id && (
                                    <button
                                      className="text-xs text-red-500 hover:text-red-600"
                                      onClick={() =>
                                        handleDeleteComment(com.id)
                                      }
                                    >
                                      delete
                                    </button>
                                  )}
                                </div>
                              );
                            })}

                            {replyModal === com.id && (
                              <div>
                                <button
                                  onClick={() => setReplyModal(null)}
                                  className="text-red-500"
                                >
                                  x
                                </button>
                                <form
                                  className="mt-2 mb-3"
                                  onSubmit={handleSubmitComment}
                                >
                                  <div className="flex items-start gap-3">
                                    <img
                                      src={authUser.photo}
                                      alt="Your avatar"
                                      className="w-5 h-5 rounded-full object-cover"
                                    />
                                    <div className="flex-1 flex items-center gap-2">
                                      <textarea
                                        rows="1"
                                        placeholder="Write your comment here..."
                                        value={comment}
                                        onChange={(e) =>
                                          setComment(e.target.value)
                                        }
                                        className="w-full bg-gray-50 border border-gray-100 rounded-lg resize-none p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                      />

                                      <SecondaryButton
                                        type="submit"
                                        text="Post"
                                      />
                                    </div>
                                  </div>
                                </form>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                )}
              </div>

              {comments.length > 3 && (
                <div className="mt-6 text-center flex gap-4 items-center justify-center">
                  <button
                    onClick={() => setCount(count + 3)}
                    className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                  >
                    Load more comments
                  </button>
                  {count > 3 && (
                    <button
                      onClick={() => setCount(count - 3)}
                      className="text-indigo-600 border-l pl-4 hover:text-indigo-700 text-sm font-medium"
                    >
                      Load less comments
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-4 text-gray-800 pb-2 border-b border-gray-100">
                About the Author
              </h3>
              <div className="flex items-start space-x-4 border-b pb-3">
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
                      to={`/consultants/${article.author_id}`}
                      className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                    >
                      View Profile →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="font-semibold text-lg mb-4 text-gray-800 pb-2 border-b border-gray-100">
                Related Articles
              </h3>
              <ul className="space-y-4">
                {relatedArticles.map(
                  (relatedArticle, index) =>
                    relatedArticle.category.name.toLowerCase ==
                      article.category.name.toLowerCase &&
                    index < 5 && (
                      <li key={index} className="border-b pb-2">
                        <Link
                          to={`/articles/${relatedArticle.id}`}
                          className="flex group items-start"
                        >
                          <img
                            src={relatedArticle.cover}
                            alt={relatedArticle.title[2]}
                            className="w-16 h-12 rounded object-cover mr-3"
                          />
                          <p className="text-gray-700 group-hover:text-indigo-600 transition-colors">
                            {relatedArticle.title}
                          </p>
                        </Link>
                      </li>
                    )
                )}
              </ul>
            </div>
          </aside>
        </main>
      </div>

      <Footer />
    </>
  );
}
