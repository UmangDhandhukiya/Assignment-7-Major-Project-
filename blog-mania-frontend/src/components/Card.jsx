import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * Renders a clickable card component to display a summary of a single blog post.
 * Parameters: blog (Object containing blog data including title, description, category, and image).
 * The component handles navigation to the full blog post when clicked.
 */
const Card = ({ blog }) => {
  const { title, description, category, image, _id } = blog;
  const navigate = useNavigate();

  const singleBlog = () => {
    const slug = title.toLowerCase().trim().replace(/\s+/g, "-");
    navigate(`/blog/${slug}`);
  };

  return (
    <div
      className="w-full border rounded-lg overflow-hidden shadow-md shadow-secondary/20 hover:scale-102 hover:shadow-secondary/40 duration-300 cursor-pointer"
      onClick={singleBlog}
    >
      <img src={image} alt="" className="aspect-video" />
      <span className="ml-4 mt-4 px-3 py-1 inline-block bg-text/20 rounded-full text-text text-xs">
        {category}
      </span>
      <div className="p-5">
        <h1 className="mb-2 font-medium text-text">{title}</h1>

        {/* rich text formate use like this other wise return html content with tag*/}
        <p
          className="mb-3 text-xs text-text/60"
          dangerouslySetInnerHTML={{
            __html: description.slice(0, 60) + "<br/><br/>Read More",
          }}
        ></p>
      </div>
    </div>
  );
};

export default Card;
