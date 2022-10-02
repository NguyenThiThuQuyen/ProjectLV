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

module.exports = {
  getAllDoctorHome: getAllDoctorHome,
};
