import { useState, useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import Input from "./Input";
import Button from "./Button";
import Label from "./Label";
import { jwtDecode } from "jwt-decode";

export default function ArticleEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [cover, setCover] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/categories"
        );

        if (Array.isArray(response.data.categories)) {
          setCategories(response.data.categories);
          if (response.data.categories.length > 0) {
            setSelectedCategory(response.data.categories[0].id);
          }
        }
      } catch (err) {
        setError("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = sessionStorage.getItem("token");
      const decoded = jwtDecode(sessionStorage.getItem("token"));

      const formData = new FormData();
      formData.append("author_id", decoded["sub"]);
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category_id", selectedCategory);
      if (cover) formData.append("cover", cover);

      await axios.post("http://127.0.0.1:8000/api/articles", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess(true);
      // Reset form
      setTitle("");
      setContent("");
      setCover(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to save article",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="article-editor max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Article</h1>

      {error && (
        <div className="error-message mb-4 p-3 bg-red-100 text-red-700">
          {error}
        </div>
      )}
      {success && (
        <div className="success-message mb-4 p-3 bg-green-100 text-green-700">
          Article saved successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label label="Title" htmlFor="title" />
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <Label label="Category_id" htmlFor="category_id" />
          <select
            id="category_id"
            name="category_id"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 border"
            required
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label label="Cover Image" htmlFor="cover" />
          <input
            id="cover"
            name="cover"
            type="file"
            onChange={(e) => setCover(e.target.files[0])}
            ref={fileInputRef}
            className="w-full"
          />
        </div>

        <div className="editor-container">
          <Label label="Content" />
          <div className="border rounded">
            <CKEditor
              editor={ClassicEditor}
              data={content}
              onChange={(event, editor) => {
                setContent(editor.getData());
              }}
              config={{
                placeholder: "Write your article content here...",
              }}
            />
          </div>
        </div>

        <Button text="save article" type="submit" extraClasses="w-full">
          {loading ? "Saving..." : "Save Article"}
        </Button>
      </form>
    </div>
  );
}
