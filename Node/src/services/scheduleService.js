const db = require("../models/index");

let findLichTVTheoBacSi = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let findSchedule = await db.Schedule.findAll({
        where: { userId: doctorId },
        include: [
          {
            model: db.TimeSlot,
            as: "timeSlotDataToSchedule",
            attributes: ["timeslot", "id"],
          },
        ],
      });
      resolve({
        code: 0,
        data: findSchedule,
      });
    } catch (e) {
      reject(e);
    }
  });
};

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

let checkRegisterDate = (regDate) => {
  return new Promise(async (resolve, reject) => {
    try {
      let schedule = await db.Schedule.findOne({
        where: { registerDate: regDate },
      });
      if (schedule) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let findTimeslot = (data) => {
  console.log("data", data);
  return new Promise(async (resolve, reject) => {
    try {
      let find = await db.Schedule.findAll({
        where: { registerDate: new Date(data.registerDate) },
        include: [
          {
            model: db.TimeSlot,
            as: "timeSlotDataToSchedule",
            attributes: ["timeslot", "id"],
          },
        ],
        raw: true,
        nest: true,
      });
      console.log("find", find.length);
      if (find !== []) {
        for (let i = 0; i < find.length; i++) {
          let test = await getCountSchedule(find[i].id);

          find[i].soluongdangky = test.data;
        }
        resolve({
          code: 0,
          data: find,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getCountSchedule = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let count = await db.ReservationTicket.count({
        where: { scheduleId: id },
        raw: false,
      });
      resolve({
        code: 0,
        data: count,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let createNewSchedule = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let date = new Date(data.registerDate * 1);
      await db.Schedule.create({
        registerDate: date,
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
              attributes: ["name", "email", "phone", "image", "id"],
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

let findIdSchedule = (data) => {
  return new Promise(async (resolve, reject) => {
    var today = new Date(data.registerDate);
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    try {
      if (!data.userId || !data.timeslotId || !data.registerDate) {
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
          // raw: false,
        });
        resolve(find.id);
      }
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
  findLichTVTheoBacSi: findLichTVTheoBacSi,
  findTimeslot: findTimeslot,
  findIdSchedule: findIdSchedule,
  getCountSchedule: getCountSchedule,
};
