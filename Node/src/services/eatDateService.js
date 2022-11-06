const db = require("../models/index");

let getAllEatDates = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let eatdates = {};
      eatdates = await db.EatDate.findAll();
      resolve(eatdates);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllEatDates: getAllEatDates,
};
