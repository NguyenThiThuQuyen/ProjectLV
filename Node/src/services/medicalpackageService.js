const db = require("../models/index");

let getAllGoiKham = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let goikham = {};
      goikham = await db.MedicalPackage.findAll();
      resolve(goikham);
    } catch (e) {
      reject(e);
    }
  });
};

let checkNamePackage = (goikham) => {
  return new Promise(async (resolve, reject) => {
    try {
      let name = await db.MedicalPackage.findOne({
        where: { packageName: goikham },
      });
      if (name) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

//ko hien thong bao
let createNewMedicalpackage = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkNamePackage(data.packageName);
      if (check === true) {
        resolve({
          code: 1,
          message: `Tên gói khám đã tồn tại, vui lòng nhập lại!`,
        });
      } else {
        let goikham = await db.MedicalPackage.create({
          packageName: data.packageName,
          packageDecs: data.packageDecs,
          reservationticketId: data.reservationticketId,
        });

        let giagoikham = await db.PackagePrice.create({
          price: data.price,
          applydateId: data.applydateId,
          medicalpackageId: goikham.id,
        });
      }
      resolve({
        code: 0,
        message: `Gói khám được thêm thành công! `,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let updateGoiKham = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          code: 2,
          message: "Lỗi!",
        });
      } else {
        let goiKham = await db.MedicalPackage.findOne({
          where: { id: data.id },
          raw: false,
        });
        let giagoikham = await db.PackagePrice.findOne({
          where: { medicalpackageId: data.id },
          raw: false,
        });

        if (goiKham) {
          let check = await checkNamePackage(data.packageName);
          if (check === true) {
            resolve({
              code: 1,
              message: `Tên gói khám đã tồn tại, vui lòng nhập lại!`,
            });
          } else {
            goiKham.packageName = data.packageName;
            goiKham.packageDecs = data.packageDecs;
            goiKham.reservationticketId = data.reservationticketId;
            await goiKham.save();
          }
        } else {
          resolve({
            code: 1,
            message: `Không tìm thấy gói khám!`,
          });
        }

        if (giagoikham) {
          giagoikham.price = data.price;
          giagoikham.applydateId = data.applydateId;
          giagoikham.medicalpackageId = data.medicalpackageId;
          await giagoikham.save();
        }
        resolve({
          errCode: 0,
          message: "Update succeeds!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteGoiKham = (goiKhamId) => {
  return new Promise(async (resolve, reject) => {
    let timGoiKham = await db.MedicalPackage.findOne({
      where: { id: goiKhamId },
    });
    console.log("object", timGoiKham);
    if (!timGoiKham) {
      resolve({
        code: 2,
        message: `Gói khám không tồn tại! `,
      });
    }
    await db.MedicalPackage.destroy({
      where: { id: goiKhamId },
    });
    resolve({
      code: 0,
      message: `Xóa gói khám thành công!`,
    });
  });
};

module.exports = {
  createNewMedicalpackage: createNewMedicalpackage,
  updateGoiKham: updateGoiKham,
  deleteGoiKham: deleteGoiKham,
  getAllGoiKham: getAllGoiKham,
};
