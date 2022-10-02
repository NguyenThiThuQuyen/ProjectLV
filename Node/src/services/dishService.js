const db = require("../models/index");
// const argon2 = require("argon2");

let getAllDishes = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let dishes = {};
      dishes = await db.Dish.findAll();

      resolve(dishes);
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
          formula: data.formula,
          image: data.image,
        });
      }
      resolve({
        code: 0,
        message: "success",
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
          dish.formula = data.formula;
          dish.image = data.image;
          await dish.save();
          resolve({
            code: 0,
            message: "Update the dish succeeds!",
          });
        } else {
          resolve({
            code: 1,
            message: `User not found!`,
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
        message: `The user isn't exist`,
      });
    }
    await db.Dish.destroy({
      where: { id: id },
    });
    resolve({
      code: 0,
      message: `The user is deleted`,
    });
  });
};

module.exports = {
  getAllDishes: getAllDishes,
  createNewDish: createNewDish,
  deleteDish: deleteDish,
  updateDishData: updateDishData,
};
