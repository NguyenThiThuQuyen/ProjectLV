const db = require("../models/index");

let createPhieudatcho = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.ReservationTicket.create({
        bookingDate: data.bookingDate,
        arrivalDate: data.arrivalDate,
        status: data.status,
        medicalpackageId: data.medicalpackageId,
        scheduleId: data.scheduleId,
        patientId: data.patientId,
        doctorId: data.doctorId,
      });
      resolve({
        code: 0,
        message: "Tạo phiếu đặt thành công!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let updatePhieudatcho = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          code: 2,
          message: "err",
        });
      } else {
        let phieudat = await db.ReservationTicket.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (phieudat) {
          phieudat.bookingDate = data.bookingDate;
          phieudat.arrivalDate = data.arrivalDate;
          phieudat.status = data.status;
          phieudat.medicalpackageId = data.medicalpackageId;
          phieudat.scheduleId = data.scheduleId;
          phieudat.patientId = data.patientId;
          phieudat.doctorId = data.doctorId;
          await phieudat.save();
          resolve({
            code: 0,
            message: "Cập nhật thành công!",
          });
        } else {
          resolve({
            code: 1,
            message: `Không tìm thấy phiếu đặt chỗ!`,
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllPhieudatcho = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let phieudatcho = {};
      phieudatcho = await db.ReservationTicket.findAll({
        include: [
          {
            model: db.MedicalPackage,
            as: "goituvanDataToPhieudatcho",
            attributes: ["packageName", "id"],
          },
          {
            model: db.Schedule,
            as: "scheduleDataToPhieudatcho",
            attributes: ["registerDate", "timeslotId", "userId", "id"],
            include: [
              {
                model: db.TimeSlot,
                as: "timeSlotDataToSchedule",
                attributes: ["timeslot", "id"],
              },
            ],
          },
          {
            model: db.Patient,
            as: "patientDataToPhieudatcho",
            attributes: ["childrentName", "birthday", "gender", "gender", "id"],
          },
          {
            model: db.User,
            as: "doctorDataToPhieudatcho",
            attributes: [
              "email",
              "name",
              "address",
              "phone",
              "gender",
              "roleId",
              "id",
            ],
          },
        ],
      });
      resolve(phieudatcho);
    } catch (e) {
      reject(e);
    }
  });
};

let getPhieudatcho = (phieudatchoId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let phieudatcho = "";
      if (phieudatchoId && phieudatchoId !== "ALL") {
        phieudatcho = await db.ReservationTicket.findOne({
          where: { id: phieudatchoId },
          include: [
            {
              model: db.MedicalPackage,
              as: "goituvanDataToPhieudatcho",
              attributes: ["packageName", "id"],
            },
            {
              model: db.Schedule,
              as: "scheduleDataToPhieudatcho",
              attributes: ["registerDate", "timeslotId", "userId", "id"],
              include: [
                {
                  model: db.TimeSlot,
                  as: "timeSlotDataToSchedule",
                  attributes: ["timeslot", "id"],
                },
              ],
            },
            {
              model: db.Patient,
              as: "patientDataToPhieudatcho",
              attributes: [
                "childrentName",
                "birthday",
                "gender",
                "gender",
                "id",
              ],
            },
            {
              model: db.User,
              as: "doctorDataToPhieudatcho",
              attributes: [
                "email",
                "name",
                "address",
                "phone",
                "gender",
                "roleId",
                "id",
              ],
            },
          ],
        });
      }
      resolve(phieudatcho);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createPhieudatcho: createPhieudatcho,
  updatePhieudatcho: updatePhieudatcho,
  getAllPhieudatcho: getAllPhieudatcho,
  getPhieudatcho: getPhieudatcho,
};
