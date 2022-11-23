const { cloneDeep } = require("lodash");
const db = require("../models/index");
const moment = require("moment");
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
          let datcho = await db.ReservationTicket.create({
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
            birthday: moment(data.birthday).format("DD/MM/YYYY"),
            // gender: data.gender,

            testGoiKham: data.testGoiKham,
            testTimeslot: data.testTimeslot,
            testGiaGoiKham: data.testGiaGoiKham,
            arrivalDate: moment(data.arrivalDate).format("DD/MM/YYYY"),
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
              include: [
                {
                  model: db.PackagePrice,
                  as: "medicalPackageDataToPackagePrice",
                  attributes: ["price", "id"],
                },
              ],
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
              attributes: ["childrentName", "birthday", "gender", "id"],
              include: [
                {
                  model: db.Parent,
                  as: "parentDataToPatient",
                  attributes: [
                    "name",
                    "email",
                    "address",
                    "phone",
                    "gender",
                    "id",
                  ],
                },
                {
                  model: db.Allcode,
                  as: "genderDataToPatient",
                },
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

let findLichTheoNgay = (data) => {
  console.log("data:", data);
  return new Promise(async (resolve, reject) => {
    try {
      if (data.DateChon === "today" && data.doctorId) {
        console.log("TH1");
        const today = new Date();
        let date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
        // const test = new Date(date).getTime();
        // console.log("test date: ", test);
        // console.log("testDate:", testDate);
        // console.log("date:", date);

        // let temp = await db.ReservationTicket.findAll({
        //   raw: true,
        // });
        // console.log("temp luc dau:", temp);
        // console.log("today:", today);

        // if (temp && temp.length > 0) {
        //   temp = temp.map((item) => {
        //     console.log("eitm:", item);
        //     item.arrivalDate = new Date(item.arrivalDate).getTime();
        //     console.log("item.arrivalDate", typeof item.arrivalDate);
        //     console.log("item.arrivalDate 1", item.arrivalDate);
        //     return item;
        //   });
        // }
        // console.log("temp:", temp);

        let findday = await db.ReservationTicket.findAll({
          where: { doctorId: data.doctorId, arrivalDate: date },
          include: [
            {
              model: db.MedicalPackage,
              as: "goituvanDataToPhieudatcho",
              attributes: ["packageName", "id"],
            },
            {
              model: db.Patient,
              as: "patientDataToPhieudatcho",
              attributes: ["childrentName", "gender", "birthday", "id"],
            },
            {
              model: db.Schedule,
              as: "scheduleDataToPhieudatcho",
              attributes: ["timeslotId", "id"],
              include: [
                {
                  model: db.TimeSlot,
                  as: "timeSlotDataToSchedule",
                  attributes: ["timeslot", "id"],
                },
              ],
            },
          ],
        });
        resolve({
          code: 0,
          data: findday,
        });
      } else if (data.DateChon && data.DateChon !== "today" && data.doctorId) {
        let findday = await db.ReservationTicket.findAll({
          where: { doctorId: data.doctorId, arrivalDate: data.DateChon },
          include: [
            {
              model: db.MedicalPackage,
              as: "goituvanDataToPhieudatcho",
              attributes: ["packageName", "id"],
            },
            {
              model: db.Patient,
              as: "patientDataToPhieudatcho",
              attributes: ["childrentName", "gender", "birthday", "id"],
            },
            {
              model: db.Schedule,
              as: "scheduleDataToPhieudatcho",
              attributes: ["timeslotId", "id"],
              include: [
                {
                  model: db.TimeSlot,
                  as: "timeSlotDataToSchedule",
                  attributes: ["timeslot", "id"],
                },
              ],
            },
          ],
        });
        resolve({
          code: 0,
          data: findday,
        });
      } else if (data.doctorId) {
        console.log("TH2");
        let findday = await db.ReservationTicket.findAll({
          where: { doctorId: data.doctorId },
          include: [
            {
              model: db.MedicalPackage,
              as: "goituvanDataToPhieudatcho",
              attributes: ["packageName", "id"],
            },
            {
              model: db.Patient,
              as: "patientDataToPhieudatcho",
              attributes: ["childrentName", "gender", "birthday", "id"],
            },
            {
              model: db.Schedule,
              as: "scheduleDataToPhieudatcho",
              attributes: ["timeslotId", "id"],
              include: [
                {
                  model: db.TimeSlot,
                  as: "timeSlotDataToSchedule",
                  attributes: ["timeslot", "id"],
                },
              ],
            },
          ],
        });
        resolve({
          code: 0,
          data: findday,
        });
      }
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
  deletePhieudatcho: deletePhieudatcho,
  findLichTheoNgay: findLichTheoNgay,
};
