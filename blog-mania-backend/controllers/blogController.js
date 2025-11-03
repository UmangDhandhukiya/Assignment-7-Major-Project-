const cloudinary = require("../configs/cloudinary");
const Blog = require("../modals/Blog");

/**
 * Handles the creation of a new blog entry.
 * Parameters: req (Request object), res (Response object).
 * The function validates required fields, uploads the image to Cloudinary, and saves the new Blog document.
 */
const addBlog = async (req, res) => {
  try {
    const { title, slug, description, category } = JSON.parse(req.body.blog);
    const imageFile = req.file; // multer adds this
    console.log(req.file);

    if (!title || !slug || !description || !category || !imageFile) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const uploadResult = await cloudinary.uploader.upload(imageFile.path, {
      folder: "blog-thumbnails",
    });

    const blog = new Blog({
      title,
      slug,
      description,
      category,
      image: uploadResult.secure_url,
    });
    await blog.save();

    res.json({
      success: true,
      message: "Blog added successfully",
      data: blog,
    });
  } catch (err) {
    res.status(400).send("ERROR :- " + err.message);
  }
};

/**
 * Handles fetching all existing blog entries.
 * Parameters: req (Request object), res (Response object).
 * The function queries the database to retrieve all documents from the Blog collection.
 */
const getBlog = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({ message: "data Fetched", blogs: blogs });
  } catch (err) {
    res.status(400).send("ERROR :- " + err.message);
  }
};

/**
 * Handles fetching a single blog entry using its unique slug.
 * Parameters: req (Request object, expecting 'slug' in req.params), res (Response object).
 * The function searches the database for a blog matching the provided slug.
 */
const getBlogById = async (req, res) => {
  try {
    const { slug } = req.params;
    console.log(slug);
    const blog = await Blog.findOne({ slug });
    if (!blog) {
      return res.status(404).json({ status: false, message: "not found" });
    }
    res.status(200).json({ status: true, blog });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};

/**
 * Handles updating an existing blog entry using its database ID.
 * Parameters: req (Request object, expecting 'id' in req.params and fields in req.body), res (Response object).
 * The function finds the blog, updates fields based on request data, and saves the document.
 */
const updateBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, slug, description, category } = req.body;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    } // Update fields

    blog.title = title || blog.title;
    blog.slug = slug || blog.slug;
    blog.description = description || blog.description;
    blog.category = category || blog.category;

    await blog.save();
    res
      .status(200)
      .json({ success: true, message: "Blog updated successfully", blog });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

/**
 * Handles the deletion of a single blog entry using its database ID.
 * Parameters: req (Request object, expecting 'id' in req.params), res (Response object).
 * The function finds and removes the blog document matching the provided ID.
 */
const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    await Blog.findByIdAndDelete(id);
    res.status(200).json({ message: "delete blog successfully" });
  } catch (err) {
    res.status(400).send("ERROR :- " + err.message);
  }
};

module.exports = {
  addBlog,
  getBlog,
  getBlogById,
  updateBlogById,
  deleteBlogById,
};
