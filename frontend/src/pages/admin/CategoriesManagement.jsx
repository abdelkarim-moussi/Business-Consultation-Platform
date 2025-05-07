import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateCategoryForm from "../../components/category.components/CreateCategoryForm";
import Sidebar from "../../components/Sidebar";
import DashboardHeader from "../../components/dashboards.components/DashboardHeader";
const CategoriesManagement = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({});

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/categories");
      setCategories(response.data.categories);
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
        <DashboardHeader />
        <div className="p-5">
          <CreateCategoryForm />
        </div>
      </div>
    </div>
  );
};

export default CategoriesManagement;
