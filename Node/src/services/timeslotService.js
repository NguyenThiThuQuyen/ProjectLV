const db = require("../models/index");

let createNewTimeslot = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.TimeSlot.create({
        timeslot: data.timeslot,
      });
      resolve({
        code: 0,
        message: "Thêm thành công!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let updateTimeslot = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          code: 2,
          message: "err",
        });
      } else {
        let khunggio = await db.TimeSlot.findOne({
          where: { id: data.id },
        });
        if (khunggio) {
          khunggio.timeslot = data.timeslot;
          await khunggio.save();
          resolve({
            code: 0,
            message: "Cập nhật thành công!",
          });
        } else {
          resolve({
            code: 1,
            message: `Không tìm thấy khung giờ!`,
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteMedical = (timeslotId) => {
  return new Promise(async (resolve, reject) => {
    let found = await db.TimeSlot.findOne({
      where: { id: timeslotId },
    });
    if (!found) {
      resolve({
        code: 2,
        message: `Không tồn tại khung giờ`,
      });
    }
    await db.TimeSlot.destroy({
      where: { id: timeslotId },
    });
    resolve({
      code: 0,
      message: `Đã xóa khung giờ`,
    });
  });
};

let getAllTimeslots = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let timeslots = {};
      timeslots = await db.TimeSlot.findAll();
      resolve(timeslots);
    } catch (e) {
      reject(e);
    }
  });
};

let getATimeslot = (timeslotId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let timeslot = "";
      if (timeslotId && timeslotId !== "ALL") {
        timeslot = await db.TimeSlot.findOne({
          where: { id: timeslotId },
        });
      }
      resolve(timeslot);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  deleteMedical: deleteMedical,
  updateTimeslot: updateTimeslot,
  createNewTimeslot: createNewTimeslot,
  getAllTimeslots: getAllTimeslots,
  getATimeslot: getATimeslot,
};
