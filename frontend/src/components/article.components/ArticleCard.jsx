import { Link } from "react-router-dom";
import { FaCalendarAlt, FaTag } from "react-icons/fa";

const ArticleCard = ({ article }) => {
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  return (
    <div className="flex flex-col h-full transition-transform duration-300 hover:-translate-y-1">
      <div className="bg-white shadow-md rounded-xl overflow-hidden h-full flex flex-col">
        <div className="relative">
          <img
            src={article.cover || "/api/placeholder/400/170"}
            alt={article.title || "Article cover"}
            className="h-48 w-full object-cover"
          />
          {article.category && (
            <span className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-medium py-1 px-2 rounded-full">
              {article.category}
            </span>
          )}
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <Link to={`/articles/${article.id}`} className="group">
            <h2 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors mb-3">
              {truncateText(article.title, 60)}
            </h2>
          </Link>

          {article.description && (
            <p className="text-gray-600 text-sm mb-4">
              {truncateText(article.description, 100)}
            </p>
          )}

          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {article.tags.map((tag) =>
                tag.tags.split(",").map((tag, index) => {
                  return (
                    <span
                      key={index}
                      className="inline-flex items-center text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full"
                    >
                      <FaTag className="mr-1 text-xs" />
                      {tag}
                    </span>
                  );
                })
              )}
            </div>
          )}

          <div className="flex-grow"></div>

          <div className="border-t border-gray-100 my-3"></div>

          <div className="flex items-center">
            <img
              src={article.author?.photo || "https://via.placeholder.com/50"}
              alt={article.author?.name || "Author"}
              className="rounded-full w-10 h-10 object-cover border border-gray-200"
            />
            <div className="ml-3">
              <h3 className="font-medium text-gray-800">
                {article.author?.name || "Jean Damon"}
              </h3>
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <FaCalendarAlt className="mr-1" />
                <span>{formatDate(article.publishedAt || "2025-01-12")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
