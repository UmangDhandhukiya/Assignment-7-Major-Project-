const Category = require("../modals/Category");

/**
 * Handles the creation of a new category.
 * Parameters: req (Request object, expecting 'name' in req.body), res (Response object).
 * The function validates the presence of 'name', checks for existing categories, and creates a new document.
 */
const addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name)
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });

    const existing = await Category.findOne({ name });
    if (existing)
      return res
        .status(400)
        .json({ success: false, message: "Category already exists" });

    const category = await Category.create({ name });
    res.status(201).json({
      success: true,
      message: "Category added successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Handles fetching all category entries.
 * Parameters: req (Request object), res (Response object).
 * The function queries the database to retrieve and sort all categories by creation date in descending order.
 */
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Handles updating an existing category entry using its database ID.
 * Parameters: req (Request object, expecting 'id' in req.params and 'name' in req.body), res (Response object).
 * The function finds the category by ID and updates its 'name' field.
 */
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updated = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!updated)
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });

    res.status(200).json({
      success: true,
      message: "Category updated",
      category: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Handles the deletion of a single category entry using its database ID.
 * Parameters: req (Request object, expecting 'id' in req.params), res (Response object).
 * The function finds and permanently removes the category document.
 */
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  addCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
