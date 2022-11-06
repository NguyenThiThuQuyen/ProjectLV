const categoryService = require("../services/categoryService");

let handleGetAllCategories = async (req, res) => {
  let categories = await categoryService.getAllCategories();
  return res.status(200).json({
    code: 0,
    message: "success",
    categories,
  });
};

module.exports = {
  handleGetAllCategories: handleGetAllCategories,
};
