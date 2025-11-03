const express = require("express");
const {
  addCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const categoryRouter = express.Router();

// ctefgory router for all operation
categoryRouter.post("/add", addCategory);
categoryRouter.get("/all", getAllCategories);
categoryRouter.put("/update/:id", updateCategory);
categoryRouter.delete("/delete/:id", deleteCategory);

module.exports = categoryRouter;
