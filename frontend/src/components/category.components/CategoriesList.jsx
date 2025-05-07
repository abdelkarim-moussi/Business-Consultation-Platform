import React from "react";

const CategoriesList = ({ categories }) => {
  return (
    <div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-5 py-2 text-left text-xs font-normal text-gray-600 uppercase tracking-wider">
              category name
            </th>
            <th className="px-5 py-2 text-left text-xs font-normal text-gray-600 uppercase tracking-wider">
              description
            </th>

            <th className="px-5 py-2 text-left text-xs font-normal text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <tr
                key={category.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-5 py-1 whitespace-nowrap">
                  <div className="text-sm font-normal text-gray-600">
                    {category.name}
                  </div>
                </td>
                <td className="px-5 py-1 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {category.description}
                  </div>
                </td>

                <td className="px-5 py-1 whitespace-nowrap text-xs space-x-1 ">
                  <button
                    className="text-orange-600 hover:text-indigo-900 bg-orange-50 rounded-full px-1 text-center"
                    // onClick={() =>}
                  >
                    Edit
                  </button>

                  <button
                    className="text-red-600 hover:text-red-90  bg-red-50 rounded-full px-1"
                    // onClick={() => }
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
                No categories found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesList;
