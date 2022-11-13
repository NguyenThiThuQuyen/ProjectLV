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

module.exports = {
  handleGetAllCategories: handleGetAllCategories,
  handleGetFindCateInMenuId: handleGetFindCateInMenuId,
};
