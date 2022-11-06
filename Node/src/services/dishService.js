const db = require("../models/index");

let getAllDishes = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let dishes = {};
      dishes = await db.Dish.findAll({
        include: [
          {
            model: db.Category,
            as: "categoryDataToDish",
            attributes: ["name", "id"],
          },
        ],
      });
      resolve(dishes);
    } catch (e) {
      reject(e);
    }
  });
};

let getDish = (dishId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dish = "";
      if (dishId && dishId !== "ALL") {
        dish = await db.Dish.findOne({
          where: { id: dishId },
          include: [
            {
              model: db.Category,
              as: "categoryDataToDish",
              attributes: ["name", "id"],
            },
          ],
        });
      }
      resolve(dish);
    } catch (e) {
      reject(e);
    }
  });
};

let checkName = (nameDish) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dish = await db.Dish.findOne({
        where: { name: nameDish },
      });
      if (dish) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let createNewDish = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkName(data.name);
      // const hashPassword = await argon2.hash(data.password);
      if (check === true) {
        resolve({
          code: 1,
          message: "Tên món ăn đã tồn tại, vui lòng nhập lại!",
        });
      } else {
        await db.Dish.create({
          name: data.name,
          contentHTML: data.contentHTML,
          contentMarkdown: data.contentMarkdown,
          categoryId: data.categoryId,
        });
      }
      resolve({
        code: 0,
        message: "Tạo thành công !",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let updateDishData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          code: 2,
          message: "err",
        });
      } else {
        let dish = await db.Dish.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (dish) {
          dish.name = data.name;
          dish.contentHTML = data.contentHTML;
          dish.contentMarkdown = data.contentMarkdown;
          dish.categoryId = data.categoryId;

          await dish.save();
          resolve({
            code: 0,
            message: "Cập nhật món ăn thành công!",
          });
        } else {
          resolve({
            code: 1,
            message: `Không tìm thấy!`,
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteDish = (id) => {
  return new Promise(async (resolve, reject) => {
    let found = await db.Dish.findOne({
      where: { id: id },
    });
    if (!found) {
      resolve({
        code: 2,
        message: `Món ăn không tồn tại !`,
      });
    }
    await db.Dish.destroy({
      where: { id: id },
    });
    resolve({
      code: 0,
      message: `Xóa thành công !`,
    });
  });
};

let findDishToCate = (cateId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let findDish = await db.Dish.findAll({
        where: { categoryId: cateId },
        attributes: ["name", "id"],
      });
      resolve({
        code: 0,
        data: findDish,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllDishes: getAllDishes,
  createNewDish: createNewDish,
  deleteDish: deleteDish,
  updateDishData: updateDishData,
  getDish: getDish,
  findDishToCate: findDishToCate,
};
