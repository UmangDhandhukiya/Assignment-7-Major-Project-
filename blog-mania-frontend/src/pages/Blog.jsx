import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { useParams } from "react-router-dom";
import Moment from "moment";
import Footer from "../components/Footer";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

/**
 * Renders the full view for a single blog post.
 * Parameters: None. It retrieves the blog slug from the URL parameters and global state (axios) from useAppContext.
 * The component fetches the specific blog data, displays the content, and formats the publication date.
 */
const Blog = () => {
  const { slug } = useParams();
  const { axios } = useAppContext();
  const [data, setData] = useState(null);

  const fetchBlogData = async () => {
    try {
      const res = await axios.get(`/api/blog/${slug}`);
      console.log(res.data);
      if (res.data.status) {
        setData(res.data.blog);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, [slug]);

  return data ? (
    <div className="relative">
      <Nav />

      <div className="text-center mt-8 text-text px-4">
        <p className="text-text py-4 font-medium">
          Published on {Moment(data.createdAt).format("MMMM Do YYYY")}
        </p>
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-text">
          {data.title}
        </h1>
        <p className="inline-flex justify-center items-center px-6 py-1.5 mb-4 border border-secondary/40 bg-secondary/10 rounded-full text-sm text-text">
          Umang Dhandhukiya
        </p>
      </div>

      <div className="flex flex-col justify-center items-center mx-5 max-w-5xl md:mx-auto my-10 mt-6">
        <img
          src={data.image}
          alt={data.title}
          className="w-full sm:w-3/4 lg:w-2/3 object-cover rounded-3xl mb-5 aspect-video"
        />
        <div
          className="rich-text max-w-3xl mx-auto text-text leading-relaxed"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
      </div>

      <Footer />
    </div>
  ) : (
    <div>Loading.....</div>
  );
};

export default Blog;
