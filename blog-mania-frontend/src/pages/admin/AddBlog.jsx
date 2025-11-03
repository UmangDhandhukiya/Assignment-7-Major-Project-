import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";

/**
 * Renders the form component for adding a new blog post.
 * Parameters: None. It retrieves global state (axios instance) from useAppContext.
 * The component manages all form inputs, the Quill editor instance, handles image preview, fetches categories, and submits the blog data to the backend.
 */
const AddBlog = () => {
  const { axios } = useAppContext();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [publishDate, setPublishDate] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  // Fetch Categories from Backend
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/api/category/all");
      if (data.success && Array.isArray(data.categories)) {
        setCategories(data.categories);
        if (data.categories.length > 0) setCategory(data.categories[0].name);
      } else {
        toast.error("Failed to load categories");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // quill use for richText editor
  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write your blog content here...",
      });
    }
  }, []);

  // Auto-generate slug from title
  useEffect(() => {
    const generateSlug = title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
    setSlug(generateSlug);
  }, [title]);

  // image preview Preview
  useEffect(() => {
    if (thumbnail) {
      const url = URL.createObjectURL(thumbnail);
      setThumbnailPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [thumbnail]);

  // Save Blog 
  const handleSave = async (e) => {
    e.preventDefault();
    if (!title || !publishDate || !category)
      return toast.error("Please fill all required fields");

    const description = quillRef.current.root.innerHTML;
    if (!description || description === "<p><br></p>")
      return toast.error("Please write a description");

    try {
      setIsSaving(true);

      const blogData = {
        title,
        slug,
        category,
        publishDate,
        description,
      };

      const formData = new FormData();
      formData.append("blog", JSON.stringify(blogData));
      if (thumbnail) formData.append("image", thumbnail);

      const { data } = await axios.post("/api/blog/add", formData);

      if (data.success) {
        toast.success("Blog added successfully!");
        setTitle("");
        setSlug("");
        setCategory(categories.length > 0 ? categories[0].name : "");
        setPublishDate("");
        setThumbnail(null);
        setThumbnailPreview(null);
        quillRef.current.root.innerHTML = "";
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex-1 p-4 md:p-10 bg-primary text-text">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-2 h-6 bg-secondary rounded"></div>
        <p className="text-xl font-semibold text-text">Add New Blog</p>
      </div>

      <div className="flex justify-center items-start text-text">
        <form
          onSubmit={handleSave}
          className="w-full max-w-4xl border border-gray-500 rounded-xl p-6 shadow-lg flex flex-col gap-6 overflow-y-auto max-h-[90vh]"
        >
          {/* Title & Slug */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-medium">Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter blog title"
                className="w-full mt-2 p-2 border border-gray-500 rounded bg-transparent text-text outline-none"
                required
              />
            </div>

            <div>
              <label className="font-medium">Slug (auto-generated)</label>
              <input
                type="text"
                value={slug}
                readOnly
                className="w-full mt-2 p-2 border border-gray-500 rounded bg-transparent text-gray-400 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Category & Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-medium">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full mt-2 p-2 border border-gray-500 rounded text-text outline-none"
              >
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <option
                      key={cat._id}
                      value={cat.name}
                      className="text-text bg-primary"
                    >
                      {cat.name}
                    </option>
                  ))
                ) : (
                  <option disabled>No categories found</option>
                )}
              </select>
            </div>

            <div>
              <label className="font-medium">Publish Date *</label>
              <input
                type="date"
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
                required
                className="w-full mt-2 p-2 border border-gray-500 rounded bg-transparent text-text outline-none"
              />
            </div>
          </div>

          {/* image Upload */}
          <div>
            <p className="font-medium mb-2">Thumbnail Image *</p>
            {thumbnailPreview && (
              <img
                src={thumbnailPreview}
                alt="Thumbnail Preview"
                className="w-full h-48 object-cover rounded border border-gray-500 mb-3"
              />
            )}
            <button
              type="button"
              onClick={() => document.getElementById("thumbnail").click()}
              className="w-full py-2 rounded bg-secondary text-primary font-medium hover:opacity-90 transition"
            >
              Choose Thumbnail
            </button>
            <input
              type="file"
              id="thumbnail"
              hidden
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files[0])}
            />
          </div>

          {/* Description */}
          <div>
            <p className="font-medium">Description *</p>
            <div
              ref={editorRef}
              className="h-56 mt-2 bg-transparent border border-gray-500 rounded text-text overflow-y-auto"
            ></div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-5 py-2 rounded border border-gray-500 hover:bg-secondary/10 transition text-text"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2 rounded bg-secondary hover:opacity-90 text-primary font-medium transition"
            >
              {isSaving ? "Saving..." : "Save Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
