import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import DashboardHeader from "../../components/dashboards.components/DashboardHeader";

const ArticlesManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  
  return (
    <div className="flex">
      <Sidebar active="admin/articles" />
      <div className="w-full grid grid-cols-1">
        <DashboardHeader page="Available Articles" />
        <div className=" rounded-lg shadow p-6 w-full">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold text-gray-500">
              Available Articles
            </h1>

            <div className="flex gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="px-5 py-1 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* <select
                    className="px-3 py-1 border text-xs border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={accountFilter}
                    onChange={(e) => setAccountFilter(e.target.value)}
                  >
                    {accountTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select> */}
              {/*     
                  <select
                    className="px-3 py-1 border text-xs border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select> */}
            </div>
          </div>
          {loading ? (
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              </div>
            </div>
          ) : (
            <>
              <div className="overflow-auto w-full">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-5 py-2 text-left text-xs font-normal text-gray-600 uppercase tracking-wider">
                        Article Title
                      </th>
                      <th className="px-5 py-2 text-left text-xs font-normal text-gray-600 uppercase tracking-wider">
                        Author
                      </th>
                      <th className="px-5 py-2 text-left text-xs font-normal text-gray-600 uppercase tracking-wider">
                        Created Date
                      </th>

                      <th className="px-5 py-2 text-left text-xs font-normal text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredArticles.length > 0 ? (
                      filteredArticles.map((article, index) => (
                        <tr
                          key={article.id}
                          className={
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }
                        >
                          <td className="px-5 py-1 whitespace-nowrap">
                            <div className="text-sm font-normal text-gray-600">
                              {article.title}
                            </div>
                          </td>
                          <td className="px-5 py-1 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {article.author.firstName}
                            </div>
                          </td>
                          <td className="px-5 py-1 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {article.created_at}
                            </div>
                          </td>

                          <td className="px-5 py-1 whitespace-nowrap text-xs space-x-2">
                            <button
                              className="text-red-600 hover:text-red-900 border-r pr-2"
                              onClick={() => DeleteArticle(article.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="7"
                          className="px-5 py-1 text-center text-sm text-gray-500"
                        >
                          No articles found matching your search criteria
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticlesManagement;
