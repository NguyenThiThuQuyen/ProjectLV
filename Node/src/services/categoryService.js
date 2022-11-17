const db = require("../models/index");

let getAllCategories = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let categories = {};
      categories = await db.Category.findAll({});

      resolve(categories);
    } catch (e) {
      reject(e);
    }
  });
};

let findCateInMenuId = (menuId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let find = await db.EatDetail.findOne({
        where: { menuId: menuId },
        include: [
          {
            model: db.Dish,
            as: "dishDataToEatDetail",
            attributes: ["name", "categoryId", "id"],
            include: [
              {
                model: db.Category,
                as: "categoryDataToDish",
                attributes: ["name", "id"],
              },
            ],
          },
        ],
      });
      resolve({
        code: 0,
        data: find,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllCategories: getAllCategories,
  findCateInMenuId: findCateInMenuId,
};
