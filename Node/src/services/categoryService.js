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

let createNewCategory = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Category.create({
        name: data.name,
      });
      resolve({
        code: 0,
        message: "Thêm thành công!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let updateCategory = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          code: 2,
          message: "err",
        });
      } else {
        let monan = await db.Category.findOne({
          where: { id: data.id },
        });
        if (monan) {
          monan.name = data.name;
          await monan.save();
          resolve({
            code: 0,
            message: "Cập nhật thành công!",
          });
        } else {
          resolve({
            code: 1,
            message: `Không tìm thấy khung giờ!`,
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteCategory = (categoryId) => {
  return new Promise(async (resolve, reject) => {
    let found = await db.Category.findOne({
      where: { id: categoryId },
    });
    if (!found) {
      resolve({
        code: 2,
        message: `Không tồn tại danh mục món ăn`,
      });
    }
    await db.Category.destroy({
      where: { id: categoryId },
    });
    resolve({
      code: 0,
      message: `Đã xóa danh mục mó ăn`,
    });
  });
};

module.exports = {
  getAllCategories: getAllCategories,
  findCateInMenuId: findCateInMenuId,
  createNewCategory: createNewCategory,
  updateCategory: updateCategory,
  deleteCategory: deleteCategory,
};
