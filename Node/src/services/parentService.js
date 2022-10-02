const db = require("../models/index");
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

let deleteParent = (parentId) => {
  return new Promise(async (resolve, reject) => {
    let found = await db.Parent.findOne({
      where: { id: parentId },
    });
    if (!found) {
      resolve({
        code: 2,
        message: `Người đại diện không tồn tại!`,
      });
    }
    await db.Parent.destroy({
      where: { id: parentId },
    });
    resolve({
      code: 0,
      message: `Đã xóa người đại diện thành công`,
    });
  });
};

module.exports = {
  createNewParent: createNewParent,
  getAllParents: getAllParents,
  updateParentData: updateParentData,
  deleteParent: deleteParent,
};
