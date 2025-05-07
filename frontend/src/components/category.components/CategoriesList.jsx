import { X } from "lucide-react";
import React, { useState } from "react";
import Label from "../Label";
import Input from "../Input";
import axios from "axios";
import { toast } from "react-toastify";

const CategoriesList = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleEdit = (id, name, description) => {
    return () => {
      setEditingCategory(id);
      setName(name || "");
      setDescription(description || "");
      setIsOpen(true);
    };
  };

  const closeModal = () => {
    setIsOpen(false);
    setEditingCategory(null);
    setName("");
    setDescription("");
  };

  const handleSubmit = async () => {
    const data = {
      name,
      description,
    };

    const response = await axios.put(
      `http://127.0.0.1:8000/api/categories/${editingCategory}`,
      data
    );

    toast.success(response.data.message);
    closeModal();
  };

  const handleDelete = () => {};

  return (
    <>
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
            {categories && categories.length > 0 ? (
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
                  <td className="px-5 py-1 whitespace-nowrap text-xs space-x-1 flex">
                    <button
                      className="text-orange-600 hover:text-indigo-900 bg-orange-50 rounded-full px-2 py-1 text-center mr-1"
                      onClick={handleEdit(
                        category.id,
                        category.name,
                        category.description
                      )}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900 bg-red-50 rounded-full px-2 py-1"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3" // Fixed: was "7"
                  className="px-5 py-1 text-center text-sm text-gray-500"
                >
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div
        className={`fixed inset-0 bg-black bg-opacity-25 items-center justify-center p-4 z-50 ${
          isOpen ? "flex" : "hidden"
        }`}
      >
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {editingCategory ? "Edit Category" : "Add Category"}
            </h3>
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <Label label="Category name" forInput="name" />
              <Input
                type="text"
                id="name"
                placeholder="Enter category name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <Label label="Category description" forInput="description" />
              <textarea
                id="description"
                name="description"
                rows={3}
                placeholder="Enter category description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 px-3 py-2 text-sm rounded-lg outline-none transition-all duration-200"
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                type="button"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors duration-200"
              >
                {editingCategory ? "Update Category" : "Save Category"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesList;
