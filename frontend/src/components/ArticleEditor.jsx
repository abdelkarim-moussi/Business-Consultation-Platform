import { useState, useRef } from "react";
import Input from "./Input";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import Button from "./Button";
import Label from "./Label";

export default function ArticleEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [cover, setCover] = useState("");
  const [saving, setSaving] = useState("");

  const fileInputRef = useRef(null);

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    onChange(e); // propagate file input change
  };

  return (
    <div className="flex flex-col gap-5 w-full px-5">
      <div>
        <Label label="title" forInput="title" />
        <Input
          id="title"
          name="title"
          value={title}
          onChange={setTitle}
          type="text"
          inputClasses="rounded-none outline-none"
        />
      </div>

      <div>
        <Label label="cover image" forInput="cover" />
        <Input
          id="cover"
          name="cover"
          onChange={(e) => setCover(e.target.files[0])}
          type="file"
          inputClasses="rounded-none file:bg-transparent file:outline-none file:border-none "
        />
      </div>

      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        className="mb-10 h-[300px]"
      />

      <Button
        type="submit"
        text="save article"
        extraClasses="rounded-none mb-10"
      />
    </div>
  );
}
