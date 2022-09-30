const db = require("../models/index");

let createNewPrice = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = await db.PackagePrice.create({
        price: data.price,
        applydateId: data.applydateId,
        medicalpackageId: data.medicalpackageId,
      });
      resolve({
        code: 0,
        message: "success",
        id,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getAllPrices = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let prices = {};
      prices = await db.PackagePrice.findAll({
        include: [
          {
            model: db.MedicalPackage,
            as: "medicalPackageDataToPackagePrice",
            attributes: ["packageName", "packageDecs", "id"],
          },
        ],
      });
      resolve(prices);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewPrice: createNewPrice,
  getAllPrices: getAllPrices,
};
