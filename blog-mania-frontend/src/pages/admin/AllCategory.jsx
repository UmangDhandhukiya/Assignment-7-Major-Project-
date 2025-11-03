import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";

/**
 * Renders the component for displaying and managing all blog categories in a table format.
 * Parameters: None. It retrieves the global axios instance from useAppContext.
 * The component fetches the list of categories and provides functions for editing and deleting individual entries.
 */
const AllCategory = () => {
  const { axios } = useAppContext();
  const [categories, setCategories] = useState([]);

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/api/category/all");
      if (data.success) {
        setCategories(data.categories || []);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Delete category
  const deleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;
    try {
      const { data } = await axios.delete(`/api/category/delete/${id}`);
      if (data.success) {
        toast.success(data.message);
        fetchCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Edit category
  const editCategory = async (id) => {
    const newName = prompt("Enter new category name:");
    if (!newName?.trim()) return;

    try {
      const { data } = await axios.put(`/api/category/update/${id}`, {
        name: newName.trim(),
      });
      if (data.success) {
        toast.success("Category updated successfully!");
        fetchCategories();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex-1 p-4 md:p-10 bg-primary text-text min-h-screen">

      <div className="flex items-center gap-3 mb-6">
        <div className="w-2 h-6 bg-secondary rounded"></div>
        <p className="text-xl font-semibold text-text">All Categories</p>
      </div>

      {/* data show in table formte */}
      <div className="overflow-x-auto border border-gray-500 rounded-xl shadow-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-text/10 border-b border-gray-500">
              <th className="px-4 py-3 text-left text-text font-medium">#</th>
              <th className="px-4 py-3 text-left text-text font-medium">
                Category Name
              </th>
              <th className="px-4 py-3 text-left text-text font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((cat, index) => (
                <tr
                  key={cat._id}
                  className="border-t border-secondary/40 hover:bg-secondary/10 transition"
                >
                  <td className="px-4 py-3 text-left text-text">{index + 1}</td>
                  <td className="px-4 py-3 text-left text-text">{cat.name}</td>
                  <td className="px-4 py-3 text-left">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => editCategory(cat._id)}
                        className="border border-secondary/40 px-3 py-1 rounded text-text"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCategory(cat._id)}
                        className="border border-secondary/40 px-3 py-1 rounded text-text"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-400">
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllCategory;
