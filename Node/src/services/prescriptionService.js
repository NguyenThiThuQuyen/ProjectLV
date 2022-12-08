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

        // if (temp) {
        //   let trangthai = await db.ReservationTicket.findOne({
        //     where: {
        //       id: data.reservationTicketId,
        //     },
        //   });

        //   if (trangthai) {
        //     console.log("đã tạo");
        //     trangthai.status = "Đã tư vấn";
        //     trangthai.save();
        //   }
        // }
      }
      resolve({
        code: 0,
        data: prescription.id,
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
        });
        if (prescription) {
          prescription.dateCreate = data.createdAt;
          prescription.reservationTicketId = data.reservationTicketId;
          prescription.menuId = data.menuId;
          prescription.loidan = data.loidan;
          await prescription.save();
          // resolve({
          //   code: 0,
          //   message: "Cập nhật toa thuốc thành công!",
          // });
        }
        if (prescription) {
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
        // else {
        //   resolve({
        //     code: 1,
        //     message: `Không tìm thấy toa thuốc!`,
        //   });
        // }
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

let findPrescription = (reservationTicketId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let chitiet = {};
      chitiet = await db.Prescription.findOne({
        where: { reservationTicketId: reservationTicketId },
        include: [
          {
            model: db.ReservationTicket,
            as: "reservationTicketDataToPrescription",
            include: [
              {
                model: db.Patient,
                as: "patientDataToPhieudatcho",
                attributes: ["childrentName", "gender", "birthday", "id"],
              },
              {
                model: db.User,
                as: "doctorDataToPhieudatcho",
                attributes: ["name", "id"],
              },
              {
                model: db.Schedule,
                as: "scheduleDataToPhieudatcho",
                attributes: ["timeslotId", "registerDate", "id"],
                include: [
                  {
                    model: db.TimeSlot,
                    as: "timeSlotDataToSchedule",
                    attributes: ["timeslot", "id"],
                  },
                ],
              },
              {
                model: db.MedicalPackage,
                as: "goituvanDataToPhieudatcho",
                attributes: ["packageName", "id"],
              },
            ],
          },
          {
            model: db.PrescriptionDetail,
            as: "prescriptionDataToPrescriptionDetail",
            include: [
              {
                model: db.Medical,
                as: "medicalDataToPrescriptionDetail",
                attributes: ["name", "id"],
              },
            ],
          },
          {
            model: db.Menu,
            as: "menuDataToPrescription",
            attributes: ["name", "id"],
            order: [["id", "DESC"]],
            include: [
              {
                model: db.EatDetail,
                as: "menuDataToEatDetail",
                include: [
                  {
                    model: db.Dish,
                    as: "dishDataToEatDetail",
                  },
                  {
                    model: db.EatTimeslot,
                    as: "eatTimeslotDataToEatDetail",
                  },
                  {
                    model: db.EatDate,
                    as: "eatDateDataToEatDetail",
                  },
                ],
              },
            ],
          },
        ],
      });

      resolve(chitiet);
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
  findPrescription: findPrescription,
};
