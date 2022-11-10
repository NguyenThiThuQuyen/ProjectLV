const db = require("../models/index");

let getAllEatDates = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let eatdates = {};
      eatdates = await db.EatDate.findAll({
        raw: true,
        nest: true,
      });
      if (data && eatdates) {
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < eatdates.length; j++) {
            if (data[i].eatdateId === eatdates[j].id.toString()) {
              eatdates[j].check = true;
            } else {
              eatdates[j].check = false;
            }
          }
        }
        resolve(eatdates);
      }
      // resolve(eatdates);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllEatDates: getAllEatDates,
};
