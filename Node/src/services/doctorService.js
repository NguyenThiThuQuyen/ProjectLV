const db = require("../models/index");
const _ = require("lodash");
require("dotenv").config();
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let getAllDoctorHome = (limitInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (limitInput !== "ALL") {
        let users = await db.User.findAll({
          limit: +limitInput,
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
      } else {
        let users = await db.User.findAll({
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
      }
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
          message: "L??u th??nh c??ng!",
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

        let toCreate = _.differenceWith(schedule, existing, (a, b) => {
          return (
            a.timeslotId.toString() === b.timeslotId &&
            a.registerDate === b.registerDate
          );
        });

        if (toCreate && toCreate.length > 0) {
          await db.Schedule.bulkCreate(toCreate);
          resolve({
            code: 0,
            message: "T???o l???ch th??nh c??ng!",
          });
        } else if (toCreate && toCreate.length == 0) {
          resolve({
            code: 0,
            message: "T???o l???ch th???t b???i!",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let checksualichbacsi = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (id) {
        let check = await db.ReservationTicket.count({
          where: { scheduleId: id },
        });
        if (check > 0) {
          resolve(false);
        } else if (check == 0) {
          resolve(true);
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let checkthemlichbacsi = (id, ngay) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (id) {
        let check = await db.Schedule.findAll({
          where: { userId: id, registerDate: ngay * 1 },
          attributes: ["timeslotId"],
        });

        resolve({
          check,
        });
      }
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
  checksualichbacsi: checksualichbacsi,
  checkthemlichbacsi: checkthemlichbacsi,
};
