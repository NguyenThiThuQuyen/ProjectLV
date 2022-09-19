const db = require("../models/index");

let getAllDonViTinh = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let dvt = {};
      dvt = await db.Donvitinh.findAll();
      resolve(dvt);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllDonViTinh: getAllDonViTinh,
};
