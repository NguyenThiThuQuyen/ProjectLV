const db = require("../models/index");
require("dotenv").config();
const emailService = require("./emailService");

let createPhieudatcho = (data) => {
  console.log("data: ", data);
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.userId ||
        !data.timeslotId ||
        !data.registerDate ||
        !data.email
      ) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters",
        });
      } else {
        let find = await db.Schedule.findOne({
          where: {
            userId: data.userId,
            timeslotId: data.timeslotId,
            registerDate: new Date(data.registerDate),
          },
        });
        if (find) {
          await db.ReservationTicket.create({
            bookingDate: data.bookingDate,
            arrivalDate: data.arrivalDate,
            status: data.status,
            medicalpackageId: data.medicalpackageId,
            scheduleId: find.id,
            patientId: data.patientId,
            doctorId: data.doctorId,
          });

          let findemail = await emailService.sendSimpleEmail({
            reciverEmail: data.email,
            name: data.name,
            phone: data.phone,

            childrentName: data.childrentName,
            birthday: data.birthday,
            gender: data.gender,

            testGoiKham: data.testGoiKham,
            testTimeslot: data.testTimeslot,
            testGiaGoiKham: data.testGiaGoiKham,
            arrivalDate: data.arrivalDate,
          });
          resolve({
            code: 0,
            message: "Tạo phiếu đặt thành công!",
            data: findemail,
          });
        }
      }
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

let deletePhieudatcho = (phieudatchoId) => {
  return new Promise(async (resolve, reject) => {
    let found = await db.ReservationTicket.findOne({
      where: { id: phieudatchoId },
    });
    if (!found) {
      resolve({
        code: 2,
        message: `Phiếu tư vấn không tồn tại`,
      });
    }
    await db.ReservationTicket.destroy({
      where: { id: phieudatchoId },
    });
    resolve({
      code: 0,
      message: `Đã xóa thành công`,
    });
  });
};

module.exports = {
  createPhieudatcho: createPhieudatcho,
  updatePhieudatcho: updatePhieudatcho,
  getAllPhieudatcho: getAllPhieudatcho,
  getPhieudatcho: getPhieudatcho,
  deletePhieudatcho: deletePhieudatcho,
};
