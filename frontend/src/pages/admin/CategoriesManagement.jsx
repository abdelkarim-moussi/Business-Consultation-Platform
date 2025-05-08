import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import DashboardHeader from "../../components/dashboards.components/DashboardHeader";
import CategoriesList from "../../components/category.components/CategoriesList";
import CategoryModal from "../../components/category.components/CategoryModal";
import { toast } from "react-toastify";
const CategoriesManagement = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/categories");
      setCategories(response.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/categories",
        data
      );
      fetchCategories();
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        {/* <DashboardHeader /> */}
        <div className="p-5">
          <CategoryModal onSubmit={handleSubmit} />

          <CategoriesList categories={categories}/>
        </div>
      </div>
    </div>
  );
};

export default CategoriesManagement;
