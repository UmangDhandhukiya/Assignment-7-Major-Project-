const express = require("express");
const {
  addBlog,
  getBlog,
  getBlogById,
  deleteBlogById,
  updateBlogById,
} = require("../controllers/blogController");
const auth = require("../middleware/auth");
const upload = require("../middleware/multer");

const blogRouter = express.Router();

//blog router for all operation
blogRouter.post("/add", upload.single("image"), auth, addBlog);
blogRouter.get("/all", getBlog);
blogRouter.get("/:slug", getBlogById);
blogRouter.put("/update/:id", updateBlogById);
blogRouter.delete("/delete/:id", auth, deleteBlogById);

module.exports = blogRouter;
