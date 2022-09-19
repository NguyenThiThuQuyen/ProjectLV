const db = require("../models/index");

let getAllNhaCungCap = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let ncc = {};
      ncc = await db.Nhacungcap.findAll();
      resolve(ncc);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllNhaCungCap: getAllNhaCungCap,
};
