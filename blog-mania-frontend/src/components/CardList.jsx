import React, { useMemo, useState } from "react";
import Card from "./Card";
import { useAppContext } from "../context/AppContext";

/**
 * Renders a list of blog cards with filtering capabilities based on search input and category selection.
 * Parameters: None. It retrieves global state (blogs and input) from useAppContext.
 * The component utilizes useMemo hooks for efficient filtering and category extraction to prevent unnecessary re-renders.
 */
const CardList = () => {
  const { blogs, input } = useAppContext();
  const [category, setCategory] = useState("All");

  // Dynamically extract unique categories from blogs
  const blogCategories = useMemo(() => {
    const categories = new Set(["All"]);
    blogs.forEach((blog) => {
      if (blog.category && blog.category.trim() !== "") {
        categories.add(blog.category);
      }
    });
    return Array.from(categories);
  }, [blogs]);

  // Filter blogs by search input
  const filterBlogs = useMemo(() => {
    if (!input.trim()) return blogs;
    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(input.toLowerCase()) ||
        blog.category.toLowerCase().includes(input.toLowerCase())
    );
  }, [blogs, input]);

  // Filter by category selection
  const displayedBlogs = useMemo(() => {
    return filterBlogs.filter((blog) =>
      category === "All" ? true : blog.category === category
    );
  }, [filterBlogs, category]);

  return (
    <div>
      {/* Category Buttons */}
      <div className="flex justify-center items-center gap-4 sm:gap-8 my-10 relative text-text flex-wrap">
        {blogCategories.map((item, index) => (
          <button
            key={index}
            onClick={() => setCategory(item)}
            className={`cursor-pointer px-3 py-1 transition-all ${
              category === item
                ? "bg-secondary text-primary rounded"
                : "hover:bg-secondary/20 rounded"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
        {displayedBlogs.length > 0 ? (
          displayedBlogs.map((blog, index) => (
            <Card key={index} blog={blog} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400 italic">
            No blogs found.
          </p>
        )}
      </div>
    </div>
  );
};

export default CardList;
