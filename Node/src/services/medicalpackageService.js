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
        await db.MedicalPackage.create({
          packageName: data.packageName,
          packageDecs: data.packageDecs,
          reservationticketId: data.reservationticketId,
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
        console.log("check ", data);
        resolve({
          code: 2,
          message: "Lỗi!",
        });
      } else {
        let goiKham = await db.MedicalPackage.findOne({
          where: { id: data.id },
          raw: false,
        });

        if (goiKham) {
          goiKham.packageName = data.packageName;
          goiKham.packageDecs = data.packageDecs;
          goiKham.reservationticketId = "1";

          let check = await checkNamePackage(data.packageName);
          if (check === true) {
            resolve({
              code: 1,
              message: `Tên gói khám đã tồn tại, vui lòng nhập lại!`,
            });
          } else {
            await goiKham.save();
          }
          resolve({
            code: 0,
            message: "Cập nhật gói khám thành công!",
          });
        } else {
          resolve({
            code: 1,
            message: `Không tìm thấy gói khám!`,
          });
        }
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
