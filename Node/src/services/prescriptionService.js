const db = require("../models/index");

let createNewPrescription = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Prescription.create({
        dateCreate: data.dateCreate,
        loidan: data.loidan,
        menuId: data.menuId,
        reservationTicketId: data.reservationTicketId,
      });

      resolve({
        code: 0,
        message: "Tạo thành công !",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let updatePrescriptionData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          code: 2,
          message: "err",
        });
      } else {
        let prescription = await db.Prescription.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (prescription) {
          prescription.dateCreate = data.dateCreate;
          prescription.reservationTicketId = data.reservationTicketId;
          prescription.menuId = data.menuId;
          await prescription.save();
          resolve({
            code: 0,
            message: "Cập nhật toa thuốc thành công!",
          });
        } else {
          resolve({
            code: 1,
            message: `Không tìm thấy toa thuốc!`,
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deletePrescription = (prescriptionId) => {
  return new Promise(async (resolve, reject) => {
    let found = await db.Prescription.findOne({
      where: { id: prescriptionId },
    });
    if (!found) {
      resolve({
        code: 2,
        message: `Toa thuốc không tồn tại!`,
      });
    }
    await db.Prescription.destroy({
      where: { id: prescriptionId },
    });
    resolve({
      code: 0,
      message: `Toa thuốc đã xóa thành công!`,
    });
  });
};

module.exports = {
  createNewPrescription: createNewPrescription,
  updatePrescriptionData: updatePrescriptionData,
  deletePrescription: deletePrescription,
};
