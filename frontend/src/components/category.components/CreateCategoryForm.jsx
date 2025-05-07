import React from "react";
import Label from "../Label";
import Input from "../Input";
import PrimaryButton from "../buttons/PrimaryButton";

const CreateCategoryForm = () => {
  return (
    <form>
      <Label label="category name" forInput="name" />
      <Input type="text" id="name" />
      <Label label="category description" forInput="description" />
      <textarea
        name="description"
        rows={3}
        className="w-full border border-[#4F46E5] px-3 py-2 text-xs rounded-lg mt-1 outline-none"
      ></textarea>
      <PrimaryButton type="submit" text="save"/>
    </form>
  );
};

export default CreateCategoryForm;
