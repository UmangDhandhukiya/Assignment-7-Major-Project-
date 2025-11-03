import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import BlogTable from "../../components/admin/BlogTable";

/**
 * Renders the administrative Dashboard component, displaying a table of all blog posts.
 * Parameters: None. It retrieves the global axios instance from useAppContext.
 * The component manages the state of the blog list and includes the function to fetch and refresh blog data from the API.
 */
const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const { axios } = useAppContext();

  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/blog/all");
      if (response.status === 200 && Array.isArray(response.data.blogs)) {
        setBlogs(response.data.blogs);
      } else {
        toast.error(response.data.message || "Invalid blog data");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 p-4 md:p-10 bg-primary text-text min-h-screen">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-2 h-6 bg-secondary rounded"></div>
        <p className="text-xl font-semibold text-text">All Blogs</p>
      </div>

      <div className="relative max-w-5xl overflow-x-auto border border-gray-500 rounded-xl shadow-lg">
        <table className="w-full border-collapse text-sm text-text">
          <thead className="bg-text/10 border-b border-gray-500">
            <tr>
              <th className="px-4 py-3 text-left font-medium">#</th>
              <th className="px-4 py-3 text-left font-medium">Title</th>
              <th className="px-4 py-3 text-left font-medium max-sm:hidden">
                Category
              </th>
              <th className="px-4 py-3 text-left font-medium max-sm:hidden">
                Date
              </th>
              <th className="px-4 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length > 0 ? (
              blogs.map((blog, index) => (
                <BlogTable
                  key={blog._id}
                  blog={blog}
                  fetchBlogs={fetchBlogs}
                  index={index + 1}
                />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400 italic">
                  No blogs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
