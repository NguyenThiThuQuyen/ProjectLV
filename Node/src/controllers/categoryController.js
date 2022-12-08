const categoryService = require("../services/categoryService");

let handleGetAllCategories = async (req, res) => {
  let categories = await categoryService.getAllCategories();
  return res.status(200).json({
    code: 0,
    message: "success",
    categories,
  });
};

let handleGetFindCateInMenuId = async (req, res) => {
  let menuId = req.query.menuId; //all, id
  if (!menuId) {
    return res.status(200).json({
      code: 1,
      message: "Missing required parmeters",
      finds: [],
    });
  }
  let findcategory = await categoryService.findCateInMenuId(menuId);
  return res.status(200).json({
    code: 0,
    message: "success",
    findcategory,
  });
};

let handleCreateNewCategory = async (req, res) => {
  let message = await categoryService.createNewCategory(req.body);
  return res.status(200).json(message);
};

let handleEditCategory = async (req, res) => {
  let data = req.body;
  let message = await categoryService.updateCategory(data);
  return res.status(200).json(message);
};

let handleDeleteCategory = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      code: 1,
      message: "Error deleting",
    });
  }
  let message = await categoryService.deleteCategory(req.query.id);
  return res.status(200).json(message);
};

module.exports = {
  handleGetAllCategories: handleGetAllCategories,
  handleGetFindCateInMenuId: handleGetFindCateInMenuId,
  handleCreateNewCategory: handleCreateNewCategory,
  handleEditCategory: handleEditCategory,
  handleDeleteCategory: handleDeleteCategory,
};
