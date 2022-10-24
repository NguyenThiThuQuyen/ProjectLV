const db = require("../models/index");
const _ = require("lodash");
require("dotenv").config();
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let getAllDoctorHome = (limitInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        limit: limitInput,
        where: { roleId: "R2" },
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["password"],
        },
        // raw: true
        include: [
          {
            model: db.Allcode,
            as: "genderDataToUser",
            attributes: ["value", "keyMap", "type"],
          },
          {
            model: db.Allcode,
            as: "roleDataToUser",
            attributes: ["value", "keyMap", "type"],
          },
        ],
      });
      resolve({
        code: 0,
        data: users,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let saveDetailInforDoctor = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !inputData.doctorId ||
        !inputData.contentHTML ||
        !inputData.contentMarkdown
      ) {
        resolve({
          code: 1,
          message: "Error",
        });
      } else {
        await db.Markdown.create({
          contentHTML: inputData.contentHTML,
          contentMarkdown: inputData.contentMarkdown,
          description: inputData.description,
          doctorId: inputData.doctorId,
        });
        resolve({
          code: 0,
          message: "Lưu thành công!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let scheduleByDate = (doctorId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId || !date) {
        resolve({
          code: 1,
          message: "Missing",
        });
      } else {
        let dataSchedule = await db.Schedule.findAll({
          where: { userId: doctorId, registerDate: date },
        });
        if (!dataSchedule) dataSchedule = [];
        resolve({
          code: 0,
          data: dataSchedule,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let bulkCreateSchedule = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.arrSchedule || !data.userId || !data.registerDate) {
        resolve({
          codeL: 1,
          message: "Error",
        });
      } else {
        let schedule = data.arrSchedule;
        if (schedule && schedule.length > 0) {
          schedule = schedule.map((item) => {
            item.maxNumber = MAX_NUMBER_SCHEDULE;
            return item;
          });
        }
        console.log("schedule", schedule);

        let existing = await db.Schedule.findAll({
          where: { userId: data.userId, registerDate: data.registerDate },
          attributes: ["timeslotId", "registerDate", "userId", "maxNumber"],
          raw: true,
        });

        if (existing && existing.length > 0) {
          existing = existing.map((item) => {
            item.registerDate = new Date(item.registerDate).getTime();
            return item;
          });
        }
        console.log("existing", existing);

        let toCreate = _.differenceWith(schedule, existing, (a, b) => {
          console.log("registerDate 111111111", typeof a.registerDate);
          console.log("registerDate 222222222", typeof b.registerDate);
          return (
            a.timeslotId.toString() === b.timeslotId &&
            a.registerDate === b.registerDate
          );
        });
        console.log("toCreate", toCreate);

        if (toCreate && toCreate.length > 0) {
          await db.Schedule.bulkCreate(toCreate);
        }
      }
      resolve({
        code: 0,
        message: "Success thành công!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllDoctorHome: getAllDoctorHome,
  saveDetailInforDoctor: saveDetailInforDoctor,
  scheduleByDate: scheduleByDate,
  bulkCreateSchedule: bulkCreateSchedule,
};
