import React, { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

/**
 * Renders a single row in the blog management table and handles edit/delete functionality.
 * Parameters: blog (Object containing blog data), fetchBlogs (Function to refresh the blog list), index (Number for row numbering).
 * The component manages the editing state, fetches available categories, handles blog deletion, and submits updates via a modal form.
 */
const BlogTable = ({ blog, fetchBlogs, index }) => {
  const { axios } = useAppContext();
  const { title, slug, description, category, createdAt, _id } = blog;
  const blogDate = new Date(createdAt);

  const [isEditing, setIsEditing] = useState(false);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title,
    slug,
    description,
    category,
  });

  //Fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/api/category/all");
        if (data.success) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, [axios]);

  // Auto-generate slug
  function handleTitleChange(e) {
    const newTitle = e.target.value;
    const generatedSlug = newTitle.toLowerCase().trim().replace(/\s+/g, "-");
    setForm({ ...form, title: newTitle, slug: generatedSlug });
  }

  // Delete Blog
  async function deleteBlog() {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      const { data } = await axios.delete(`/api/blog/delete/${_id}`);
      toast.success(data.message || "Blog deleted successfully");
      fetchBlogs();
    } catch (error) {
      toast.error(error.message);
    }
  }

  // Update Blog
  async function handleEdit(e) {
    e.preventDefault();
    if (
      !form.title.trim() ||
      !form.slug.trim() ||
      !form.description.trim() ||
      !form.category.trim()
    ) {
      return toast.error("All fields are required.");
    }

    try {
      const { data } = await axios.put(`/api/blog/update/${_id}`, form);
      if (data.success) {
        toast.success("Blog updated successfully!");
        setIsEditing(false);
        fetchBlogs();
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      {/* Blog Row */}
      <tr className="border-t border-secondary/40 hover:bg-secondary/10 transition-colors">
        <td className="px-4 py-3 text-left">{index}</td>
        <td className="px-4 py-3 text-left">{title}</td>
        <td className="px-4 py-3 text-left max-sm:hidden">{category || "—"}</td>
        <td className="px-4 py-3 text-left max-sm:hidden">
          {blogDate.toLocaleDateString()}
        </td>
        <td className="px-4 py-3 text-left">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsEditing(true)}
              className="border border-secondary/40 px-3 py-1 rounded hover:bg-secondary/10 transition"
            >
              Edit
            </button>
            <button
              onClick={deleteBlog}
              className="border border-secondary/40 px-3 py-1 rounded hover:bg-secondary/10 transition"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>

      {/* Edit form */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="border border-secondary/20 shadow-xl rounded-2xl p-8 w-[90%] max-w-md bg-primary text-center relative">
            <h2 className="text-2xl font-semibold mb-6">Edit Blog</h2>

            <form
              onSubmit={handleEdit}
              className="flex flex-col gap-4 text-left"
            >
              <div>
                <label className="text-sm text-gray-400">Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={handleTitleChange}
                  placeholder="Enter blog title"
                  className="w-full px-4 py-2 bg-transparent border-b border-secondary/20 outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Slug (auto)</label>
                <input
                  type="text"
                  value={form.slug}
                  readOnly
                  className="w-full px-4 py-2 bg-gray-800/40 border-b border-secondary/20 text-gray-400 outline-none cursor-not-allowed"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Enter blog description"
                  className="w-full px-4 py-2 bg-transparent border border-secondary/20 rounded-md outline-none resize-none"
                ></textarea>
              </div>

              <div>
                <label className="text-sm text-gray-400">Category</label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-transparent border-b border-secondary/20 outline-none cursor-pointer"
                >
                  <option
                    value=""
                    className="bg-primary text-text hover:bg-secondary/20"
                  >
                    Select Category
                  </option>
                  {categories.map((cat) => (
                    <option
                      key={cat._id}
                      value={cat.name}
                      className="bg-primary text-text hover:bg-secondary/20"
                    >
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="submit"
                  className="flex-1 bg-secondary py-2 rounded-md hover:opacity-90 transition"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 border border-secondary/30 py-2 rounded-md hover:bg-secondary/10 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogTable;
