const db = require("../models/index");

let finDoctor = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctor = await db.User.findAll({
        where: { roleId: "R2" },
        attributes: {
          exclude: ["password", "image", "email"],
        },
        include: [
          {
            model: db.Allcode,
            as: "roleDataToUser",
            attributes: ["value", "keyMap", "type"],
          },
        ],
      });
      resolve({
        code: 0,
        data: doctor,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let createNewSchedule = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Schedule.create({
        registerDate: data.registerDate,
        timeslotId: data.timeslotId,
        userId: data.userId,
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

let getAllSchedules = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let schedule = {};
      schedule = await db.Schedule.findAll({
        include: [
          {
            model: db.TimeSlot,
            as: "timeSlotDataToSchedule",
            attributes: ["timeslot", "id"],
          },
          {
            model: db.User,
            as: "userDataToSchedule",
            attributes: ["name", "id"],
          },
        ],
      });

      resolve(schedule);
    } catch (e) {
      reject(e);
    }
  });
};

let updateSchedule = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          code: 2,
          message: "err",
        });
      } else {
        let schedule = await db.Schedule.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (schedule) {
          schedule.registerDate = data.registerDate;
          schedule.timeslotId = data.timeslotId;
          schedule.userId = data.userId;
          await schedule.save();
          resolve({
            code: 0,
            message: "Cập nhật thành công!",
          });
        } else {
          resolve({
            code: 1,
            message: `Không tìm thấy lịch tư vấn!`,
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteSchedule = (scheduleId) => {
  return new Promise(async (resolve, reject) => {
    let found = await db.Schedule.findOne({
      where: { id: scheduleId },
    });
    if (!found) {
      resolve({
        code: 2,
        message: `Lịch tư vấn không tồn tại`,
      });
    }
    await db.Schedule.destroy({
      where: { id: scheduleId },
    });
    resolve({
      code: 0,
      message: `Đã xóa thành công`,
    });
  });
};

let getSchedule = (scheduleId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let schedule = "";
      if (scheduleId && scheduleId !== "ALL") {
        schedule = await db.Schedule.findOne({
          where: { id: scheduleId },
          include: [
            {
              model: db.TimeSlot,
              as: "timeSlotDataToSchedule",
              attributes: ["timeslot", "id"],
            },
            {
              model: db.User,
              as: "userDataToSchedule",
              attributes: ["name", "id"],
            },
          ],
        });
      }
      resolve(schedule);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewSchedule: createNewSchedule,
  finDoctor: finDoctor,
  getAllSchedules: getAllSchedules,
  updateSchedule: updateSchedule,
  deleteSchedule: deleteSchedule,
  getSchedule: getSchedule,
};
