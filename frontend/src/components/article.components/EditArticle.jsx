import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Label from "../Label";
import Input from "../Input";
import PrimaryButton from "../buttons/PrimaryButton";
import { toast } from "react-toastify";

export default function EditArticleModal({ article, onClose, onUpdated }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("draft");
  const [content, setContent] = useState("");
  const [cover, setCover] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const fileInputRef = useRef();

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setStatus(article.status);
      setContent(article.content);
      setTags(article.tags.flatMap((tag) => tag.tags.split(",")));
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
      formData.append("tags", tags.join(","));

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

      toast.success("Article updated successfully");
    } catch (error) {
      toast.error("Failed to update article");
      setError("Failed to update article", error);
    } finally {
      setSaving(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags((prevTags) => [...prevTags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (index) => {
    const newTags = tags.filter((_, idx) => idx !== index); 
    setTags(newTags);
  };

  return (
    <div className="w-full inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full p-6 shadow-lg">
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
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-[#4F46E5] h-[35px] px-3 text-sm rounded-lg mt-1 outline-none"
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
              className="w-full h-[35px] text-sm text-slate-500 rounded-lg cursor-pointer outline-none file:bg-[#EEF2FF] file:text-[#4F46E5] file:border-none border border-[#4F46E5] file:outline-none file:h-full file:cursor-pointer file:text-sm"
            />
          </div>

          <div>
            <Label label="Tags" htmlFor="tags" />
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="flex items-center gap-1 bg-[#EEF2FF] text-[#4F46E5] px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(index)} // Use the index to remove the tag
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              id="tags"
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a tag and press Enter"
              className="w-full h-[35px] border border-[#4F46E5] rounded-lg outline-none p-2"
            />
          </div>

          <div className="editor-container">
            <Label label="Content" />
            <div className="border border-[#4F46E5] rounded-lg overflow-scroll">
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
            <PrimaryButton
              type="submit"
              text={saving ? "Saving..." : "Save Changes"}
              disabled={saving}
              extraClasses="w-full"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
