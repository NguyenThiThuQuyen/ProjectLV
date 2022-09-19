const db = require("../models/index");

let getAllGenders = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let gender = {};
      gender = await db.Gender.findAll();
      resolve(gender);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllGenders: getAllGenders,
};
