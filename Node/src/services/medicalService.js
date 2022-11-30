const db = require("../models/index");

let getAllMedicals = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let medicals = {};
      medicals = await db.Medical.findAll({
        order: [["createdAt", "DESC"]],
        // attributes: ["image"],
        include: [
          {
            model: db.MedicalType,
            as: "medicalTypeDataToMedical",
            attributes: ["name", "id"],
          },
          {
            model: db.Donvitinh,
            as: "donvitinhDataToMedical",
            attributes: ["donvitinh", "id"],
          },
          {
            model: db.Nhacungcap,
            as: "nhacungcapDataToMedical",
            attributes: ["nhacungcap", "id"],
          },
        ],
        raw: true,
        nest: true,
      });
      resolve(medicals);
    } catch (e) {
      reject(e);
    }
  });
};

let checkMedicalName = (tenthuoc) => {
  return new Promise(async (resolve, reject) => {
    try {
      let medicalname = await db.Medical.findOne({
        where: { name: tenthuoc },
      });
      if (medicalname) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let createNewMedical = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkMedicalName(data.name);
      if (check === true) {
        resolve({
          code: 1,
          message: "Tên thuốc đã tồn tại, vui lòng nhập lại!",
        });
      } else {
        await db.Medical.create({
          name: data.name,
          image: data.image,
          donvitinhId: data.donvitinhId,
          nhacungcapId: data.nhacungcapId,
          medicalTypeId: data.medicalTypeId,
        });
      }
      resolve({
        code: 0,
        message: "Thêm thuốc thành công!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let updateMedical = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          code: 2,
          message: "Error updating!",
        });
      } else {
        let tenthuoc = await db.Medical.findOne({
          where: { id: data.id },
        });
        if (tenthuoc) {
          let check = await checkMedicalName(data.name);
          if (check === true) {
            resolve({
              code: 1,
              message: "Tên thuốc đã tồn tại, vui lòng nhập lại!",
            });
          } else {
            tenthuoc.name = data.name;
            await tenthuoc.save();
            resolve({
              code: 0,
              message: "Cập nhật thuộc thành công",
            });
          }
        } else {
          resolve({
            code: 1,
            message: "Không tìm thấy thuốc",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteMedical = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let timthuoc = await db.Medical.findOne({
        where: { id: id },
      });
      if (!timthuoc) {
        resolve({
          code: 2,
          message: "Thuốc không tồn tại!",
        });
      }
      await db.Medical.destroy({
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

module.exports = {
  createNewMedical: createNewMedical,
  getAllMedicals: getAllMedicals,
  updateMedical: updateMedical,
  deleteMedical: deleteMedical,
};
