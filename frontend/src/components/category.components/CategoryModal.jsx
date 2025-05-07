import { useState } from "react";
import { Plus, X } from "lucide-react";
import Input from "../Input";
import Label from "../Label";

export default function CategoryModal({ onSubmit }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setName("");
    setDescription("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    onSubmit({ name, description });

    closeModal();
  };

  return (
    <>
      <button
        onClick={openModal}
        className="flex items-center text-sm space-x-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 rounded-lg transition-colors duration-200 float-end mb-5"
      >
        <Plus size={10} />
        <span>Add Category</span>
      </button>

      <div
        className={`fixed inset-0 bg-black bg-opacity-25 items-center justify-center p-4 z-50 ${
          isOpen ? "flex" : "hidden"
        }`}
      >
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Add Category
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
                Save Category
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
