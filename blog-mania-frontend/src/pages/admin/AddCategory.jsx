import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";

/**
 * Renders the form component for adding a new blog category.
 * Parameters: None. It retrieves the global axios instance from useAppContext.
 * The component handles user input for the category name, form submission, API communication, and manages the saving state.
 */
const AddCategory = () => {
  const { axios } = useAppContext();
  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter category name");
      return;
    }

    try {
      setIsSaving(true);
      const { data } = await axios.post("/api/category/add", { name });

      if (data.success) {
        toast.success("Category added successfully!");
        setName("");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setName("");
  };

  return (
    <div className="flex-1 p-4 md:p-10 bg-primary text-text min-h-screen">
      {/* Title Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-2 h-6 bg-secondary rounded"></div>
        <p className="text-xl font-semibold text-text">Add New Category</p>
      </div>

      {/* Form Container */}
      <div className="flex justify-center items-start text-text">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-4xl border border-gray-500 rounded-xl p-6 shadow-lg flex flex-col gap-6 overflow-y-auto max-h-[90vh]"
        >
          {/* Category Name Input */}
          <div>
            <label className="font-medium">Category Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter category name"
              className="w-full mt-2 p-2 border border-gray-500 rounded bg-transparent text-text outline-none"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="px-5 py-2 rounded border border-gray-500 text-text"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2 rounded bg-secondary text-primary font-medium"
            >
              {isSaving ? "Saving..." : "Save Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
