const db = require("../models/index");

let createNewTreament = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkNameMethod = await checkNameTreatment(data.method);
      if (checkNameMethod === true) {
        resolve({
          code: 1,
          message: "me",
        });
      }
      resolve({
        code: 0,
        message: "create a new treatment succeed!",
      });
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createNewTreament: createNewTreament,
};
