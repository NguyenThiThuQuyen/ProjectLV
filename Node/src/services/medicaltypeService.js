const db = require("../models/index");

let checkMedicaltypeName = (tenloai) => {
  return new Promise(async (resolve, reject) => {
    try {
      let nametype = await db.MedicalType.findOne({
        where: { name: tenloai },
      });
      if (nametype) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let createNewMedicaltype = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkMedicaltypeName(data.name);
      if (check === true) {
        resolve({
          code: 1,
          message: "Tên loại thuốc đã tồn tại, vui lòng nhập lại!",
        });
      } else {
        await db.MedicalType.create({
          name: data.name,
        });
      }
      resolve({
        code: 0,
        message: "Thêm loại thuốc thành công!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let updateMedicalType = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          code: 2,
          message: "Error updating!",
        });
      } else {
        let tenloai = await db.MedicalType.findOne({
          where: { id: data.id },
          raw: true,
        });
        if (tenloai) {
          let check = await checkMedicaltypeName(data.name);
          if (check === true) {
            resolve({
              code: 1,
              message: "Tên loại thuốc đã tồn tại, vui lòng nhập lại!",
            });
          } else {
            tenloai.name = data.name;
            await tenloai.save();
            resolve({
              code: 0,
              message: "Cập nhật loại thuộc thành công",
            });
          }
        } else {
          resolve({
            code: 1,
            message: "Không tìm thấy loại thuốc",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteMedicalType = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let timloai = await db.MedicalType.findOne({
        where: { id: id },
      });
      if (!timloai) {
        resolve({
          code: 2,
          message: "Loại thuốc không tồn tại!",
        });
      }
      await db.MedicalType.destroy({
        where: { id: id },
      });
      resolve({
        code: 0,
        message: "Xóa loại thuốc thành công!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getAllMedicalTypes = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let medicaltypes = {};
      medicaltypes = await db.MedicalType.findAll({
        include: [
          {
            model: db.Medical,
            as: "medicalTypeDataToMedical",
            attributes: ["name", "id"],
          },
        ],
        raw: true,
        nest: true,
      });
      resolve(medicaltypes);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewMedicaltype: createNewMedicaltype,
  updateMedicalType: updateMedicalType,
  deleteMedicalType: deleteMedicalType,
  getAllMedicalTypes: getAllMedicalTypes,
};
