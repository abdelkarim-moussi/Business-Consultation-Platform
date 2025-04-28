import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import PrimaryButton from "../buttons/PrimaryLink";
import { format } from "date-fns";
import EditArticleModal from "../article.components/EditArticle";

export default function ConsultantArticles() {
  const { user } = useAuth();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingArticle, setEditingArticle] = useState(null);

  const fetchArticles = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/consultants/${user.id}/articles`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      setArticles(response.data.data);
    
    } catch (err) {
      setError("Failed to load articles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchArticles();
    }
  }, [user?.id]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?"))
      return;
    try {
      await axios.delete(`/api/articles/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      setArticles((prev) => prev.filter((article) => article.id !== id));
    } catch (err) {
      alert("Failed to delete the article");
    }
  };

  const handleEdit = async (article_id, title, content) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/articles/${article_id}`,
        {
          header: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      setArticles((prev) => prev.filter((article) => article.id !== id));
    } catch (error) {
      alert("Failed to edit this article");
    }
  };

  if (loading)
    return <div className="text-center py-8">Loading articles...</div>;
  if (error)
    return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <>
      <div className="p-5">
        <div className="bg-white shadow p-5 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">My Articles</h2>
            <PrimaryButton text="+ New Article" link="/createArticle" />
          </div>

          {articles.length === 0 ? (
            <p className="text-gray-500 text-sm">
              You haven't published any articles yet.
            </p>
          ) : (
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs text-gray-500 uppercase border-b">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Created</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <a href="">{article.title}</a>
                    </td>
                    <td className="px-4 py-3 capitalize">{article.status}</td>
                    <td className="px-4 py-3">
                      {format(Date(article.created_at), "d-m-y H:mm")}
                    </td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <button
                        onClick={() => setEditingArticle(article)}
                        className="bg-yellow-50 px-2 rounded-xl text-orange-400 hover:bg-orange-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="text-red-500 bg-red-50 px-2 rounded-xl hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {editingArticle && (
        <EditArticleModal
          article={editingArticle}
          onClose={() => setEditingArticle(null)}
          onUpdated={fetchArticles}
        />
      )}
    </>
  );
}
