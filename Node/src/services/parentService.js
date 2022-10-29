const db = require("../models/index");
const { createNewMedicalpackage } = require("./medicalpackageService");
const { getSearchParentById } = require("./patientService");

let getAllParents = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let parents = {};
      parents = await db.Parent.findAll({
        include: [
          {
            model: db.Allcode,
            as: "genderDataToParent",
            attributes: ["value", "keyMap", "type"],
          },
        ],
      });
      resolve(parents);
    } catch (e) {
      reject(e);
    }
  });
};

let checkParentEmail = (parentEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let parent = await db.Parent.findOne({
        where: { email: parentEmail },
      });
      if (parent) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let createNewParent = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkParentEmail(data.email);
      if (check === true) {
        resolve({
          code: 1,
          message: "Email đã tồn tại, vui lòng nhập lại!",
        });
      } else {
        const id = await db.Parent.create({
          name: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone,
          gender: data.gender,
        });
        resolve({
          code: 0,
          message: "success",
          id,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let updateParentData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          code: 2,
          message: "err",
        });
      } else {
        let parent = await db.Parent.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (parent) {
          parent.name = data.name;
          parent.email = data.email;
          parent.password = data.password;
          parent.phone = data.phone;
          parent.gender = data.gender;
          await parent.save();
          resolve({
            code: 0,
            message: "Cập nhật người đại diện trẻ thành công!",
          });
        } else {
          resolve({
            code: 1,
            message: `Không tìm thấy người đại diện trẻ!`,
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getParent = (parentId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let parent = "";
      if (parentId && parentId !== "ALL") {
        parent = await db.Parent.findOne({
          where: { id: parentId },
          include: [
            {
              model: db.Patient,
              as: "parentDataToPatient",
              attributes: [
                "childrentName",
                "gender",
                "birthday",
                "address",
                "image",
                "id",
              ],
              include: [
                {
                  model: db.Allcode,
                  as: "genderDataToPatient",
                  attributes: ["value", "keyMap", "type"],
                },
              ],
            },
            {
              model: db.Allcode,
              as: "genderDataToParent",
              attributes: ["value", "keyMap", "type"],
            },
          ],
        });
      }
      resolve(parent);
    } catch (e) {
      reject(e);
    }
  });
};

let findPatient = (patient) => {
  return new Promise(async (resolve, reject) => {
    try {
      let find = await db.Patient.findOne({
        where: { parentId: patient },
      });
      if (find) {
        resolve(find);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteParent = (data) => {
  return new Promise(async (resolve, reject) => {
    if (!data.id) {
      resolve({
        code: 2,
        message: "Missing required parameters",
      });
    } else {
      let del = await db.Parent.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (!del) {
        resolve({
          code: 2,
          message: `Người dùng không tồn tại`,
        });
      } else {
        let check = await findPatient(data.id);
        if (check) {
          resolve({
            code: 1,
            message: "Đã tồn tại ... ",
          });
        } else {
          await db.Parent.destroy({ where: { id: data.id } });
        }
        resolve({
          code: 0,
          message: "Xóa thành công!",
        });
      }
    }
  });
};

// let deleteParent = (data) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let check = await findPatient(data.parentId);
//       let find = await db.Parent.findOne({
//         where: { id: data },
//       });
//       if (!find.id) {
//         resolve({
//           code: 2,
//           message: `Người dùng không tồn tại`,
//         });
//       } else {
//         if (check === true) {
//           resolve({
//             code: 1,
//             message: "Đã tồn tại bệnh nhân, không thể xóa!",
//           });
//         } else {
//           await db.Parent.destroy({
//             where: { id: parent },
//           });
//           resolve({
//             code: 0,
//             message: `Đã xóa người đại diện thành công`,
//           });
//         }
//       }
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

module.exports = {
  createNewParent: createNewParent,
  getAllParents: getAllParents,
  updateParentData: updateParentData,
  deleteParent: deleteParent,
  getParent: getParent,
  findPatient: findPatient,
};
