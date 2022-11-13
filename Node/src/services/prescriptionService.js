const db = require("../models/index");

let createNewPrescription = (data) => {
  console.log("data:", data);
  return new Promise(async (resolve, reject) => {
    try {
      let prescription = await db.Prescription.create({
        loidan: data.loidan,
        menuId: data.menuId,
        reservationTicketId: data.reservationTicketId,
      });
      if (prescription) {
        let temp = await db.Prescription.findOne({
          where: { id: prescription.id },
        });
        if (temp) {
          temp.dateCreate = prescription.createdAt;
          await temp.save();
        }

        if (temp) {
          let trangthai = await db.ReservationTicket.findOne({
            where: {
              id: data.reservationTicketId,
            },
          });
          if (trangthai) {
            console.log("đã tạo");
            trangthai.status = "Đã tư vấn";
            trangthai.save();
          }
        }
      }
      resolve({
        code: 0,
        message: "Lưu thành công!",
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
          raw: true,
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

let getPrescription = (prescriptionId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let prescription = "";
      if (prescriptionId && prescriptionId !== "ALL") {
        prescription = await db.Prescription.findOne({
          where: { id: prescriptionId },
          // include: [
          //   {
          //     model: db.ReservationTicket,
          //     as: "phieudatchoDataToPrescription",
          //     attributes: ["status", "id"],
          //   },
          // ],
          // raw: true,
          // nest: true,
        });
      }
      resolve(prescription);
    } catch (e) {
      reject(e);
    }
  });
};

let findPhieuDatChoInPrescription = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.reservationTicketId) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters",
        });
      } else {
        let find = await db.Prescription.findOne({
          where: {
            reservationTicketId: data.reservationTicketId,
          },
          include: [
            {
              model: db.Menu,
              as: "menuDataToPrescription",
              attributes: ["name", "id"],
            },
          ],
          // raw: true,
        });

        resolve(find);
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewPrescription: createNewPrescription,
  updatePrescriptionData: updatePrescriptionData,
  deletePrescription: deletePrescription,
  getPrescription: getPrescription,
  findPhieuDatChoInPrescription: findPhieuDatChoInPrescription,
};
