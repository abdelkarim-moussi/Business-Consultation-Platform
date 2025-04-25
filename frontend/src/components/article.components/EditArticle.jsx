import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Label from "../Label";
import Button from "../buttons/Button";

export default function EditArticleModal({ article, onClose, onUpdated }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("draft");
  const [content, setContent] = useState("");
  const [cover, setCover] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setStatus(article.status);
      setContent(article.content);
    }
  }, [article]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("_method", "PUT");

      formData.append("title", title);
      formData.append("content", content);
      formData.append("status", status);

      if (cover) formData.append("cover", cover);

      await axios.post(
        `http://127.0.0.1:8000/api/articles/${article.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            Accept: "application/json",
            "content-Type": "multipart/form-data",
          },
        }
      );
      onUpdated();
      onClose();
    } catch (error) {
      setError("Failed to update article", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white  w-full p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Edit Article</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-2xl"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Title</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
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
            <div className="border rounded overflow-scroll">
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

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end">
            <Button
              type="submit"
              text={saving ? "Saving..." : "Save Changes"}
              disabled={saving}
            ></Button>
          </div>
        </form>
      </div>
    </div>
  );
}
