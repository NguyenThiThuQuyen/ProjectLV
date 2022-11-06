const db = require("../models/index");

let getAllCategories = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let categories = {};
      categories = await db.Category.findAll();

      resolve(categories);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllCategories: getAllCategories,
};
