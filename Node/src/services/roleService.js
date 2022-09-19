const db = require("../models/index");

let getAllRoles = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let role = {};
      role = await db.Role.findAll();
      resolve(role);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllRoles: getAllRoles,
};
