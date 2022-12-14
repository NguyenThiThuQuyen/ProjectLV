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

let loginParent = (email, password) => {
  console.log("email", email);
  console.log("password", password);
  return new Promise(async (resolve, reject) => {
    try {
      let parentData = {};
      let isExist = await checkParentEmail(email);
      if (isExist) {
        let parent = await db.Parent.findOne({
          attributes: [
            "email",
            "password",
            "name",
            "gender",
            "phone",
            "address",
            "id",
          ],
          where: { email: email },
          include: [
            {
              model: db.Patient,
              as: "parentDataToPatient",
              attributes: ["id", "childrentName", "gender", "birthday"],
            },
          ],
          // raw: true,
        });
        if (parent) {
          if (password == parent.password) {
            parentData.code = 0;
            (parentData.message = "Đăng nhập thành công"),
              delete parent.password;
            parentData.parent = parent;
          } else {
            parentData.code = 3;
            parentData.message = "Sai mật khẩu !";
          }
        } else {
          parentData.code = 2;
          parentData.message = `Không tìm người dùng !`;
        }
      } else {
        //return error
        parentData.code = 1;
        parentData.message = `Tài khoản không tồn tại !`;
      }
      resolve(parentData);
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

let checkParentPhone = (parentPhone) => {
  return new Promise(async (resolve, reject) => {
    try {
      let parent = await db.Parent.findOne({
        where: { phone: parentPhone },
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

let createNewParentPatient = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkemail = await checkParentEmail(data.email);
      let checkphone = await checkParentPhone(data.phone);
      if (data.email === "") {
        resolve({
          code: 2,
          message: "Vui lòng nhập email !",
        });
      } else {
        if (checkemail === true) {
          resolve({
            code: 1,
            message: "Email đã tồn tại, vui lòng nhập lại!",
          });
        } else if (checkphone === true) {
          resolve({
            code: 1,
            message: "Số điện thoại đã tồn tại, vui lòng nhập lại!",
          });
        } else {
          let parent = await db.Parent.create({
            name: data.name,
            email: data.email,
            password: data.password,
            phone: data.phone,
            address: data.address,
            gender: data.genderparent,
          });

          let patient = await db.Patient.create({
            childrentName: data.childrentName,
            gender: data.genderpatient,
            birthday: data.birthday,
            image: data.image,
            parentId: parent.id,
          });
          if (patient) {
            resolve(patient);
          }
        }
      }
      resolve({
        code: 0,
        message: "Tạo thành công !",
      });
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
          address: data.address,
          gender: data.gender,
        });
        resolve({
          code: 0,
          message: "Thêm thành công!",
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
        });
        if (parent) {
          parent.name = data.name;
          parent.email = data.email;
          parent.password = data.password;
          parent.phone = data.phone;
          parent.address = data.address;
          parent.gender = data.gender;
          await parent.save();
          resolve({
            code: 0,
            message: "Cập nhật thành công!",
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
      let find = await db.Patient.findAll({
        where: { parentId: patient },
        include: [
          {
            model: db.Parent,
            as: "parentDataToPatient",
            attributes: ["name", "email", "phone", "address", "gender", "id"],
          },
          {
            model: db.Allcode,
            as: "genderDataToPatient",
            attributes: ["value", "keyMap", "type"],
          },
        ],
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

let deleteParent = (id) => {
  return new Promise(async (resolve, reject) => {
    if (!id) {
      resolve({
        code: 2,
        message: "Missing required parameters",
      });
    } else {
      let del = await db.Parent.findOne({
        where: { id: id },
        raw: true,
      });
      if (!del) {
        resolve({
          code: 2,
          message: `Người dùng không tồn tại`,
        });
      } else {
        let check = await findPatient(id);
        if (check) {
          resolve({
            code: 1,
            message: "Người đại diện đã tồn tại bệnh nhân ",
          });
        } else {
          await db.Parent.destroy({ where: { id: id } });
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
  createNewParentPatient: createNewParentPatient,
  loginParent: loginParent,
};
