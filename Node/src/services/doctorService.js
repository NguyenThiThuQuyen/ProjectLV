const db = require("../models/index");

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

module.exports = {
  getAllDoctorHome: getAllDoctorHome,
  saveDetailInforDoctor: saveDetailInforDoctor,
  scheduleByDate: scheduleByDate,
};
