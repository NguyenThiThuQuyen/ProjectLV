const db = require("../models/index");

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleUserLogin = (email, password) => {
  console.log("email", email);
  console.log("password", password);
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          attributes: [
            "id",
            "email",
            "roleId",
            "password",
            "name",
            "address",
            "phone",
            "gender",
          ],
          where: { email: email },
          raw: true,
        });
        if (user) {
          //compare password
          // let check = true;
          if (password == user.password) {
            userData.code = 0;
            (userData.message = "Ok"), delete user.password;
            userData.user = user;
          } else {
            userData.code = 3;
            userData.message = "Sai mật khẩu !";
          }
        } else {
          userData.code = 2;
          userData.message = `Không tìm người dùng !`;
        }
      } else {
        //return error
        userData.code = 1;
        userData.message = `Tài khoản không tồn tại !`;
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          code: 2,
          message: "err",
        });
      } else {
        let user = await db.User.findOne({
          where: { id: data.id },
          raw: true,
        });
        if (user && data.roleId === "R1") {
          user.name = data.name;
          user.password = data.password;
          user.address = data.address;
          user.image = data.image;
          user.phone = data.phone;
          user.gender = data.gender;
          user.roleId = data.roleId;
          await user.save();
          resolve({
            code: 0,
            message: "Cập nhật thành công admin!",
          });
        } else {
          if (user && data.roleId === "R2") {
            user.name = data.name;
            user.password = data.password;
            user.address = data.address;
            user.image = data.image;
            user.phone = data.phone;
            user.gender = data.gender;
            user.roleId = data.roleId;
            user.contentHTML = data.contentHTML;
            user.contentMarkdown = data.contentMarkdown;
            await user.save();
          }
          resolve({
            code: 0,
            message: "Cập nhật thành công bác sĩ!",
          });
        }
        resolve({
          code: 1,
          message: `Không tìm thấy người dùng!`,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let createNewUser = (data) => {
  console.log("data:", data);
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserEmail(data.email);
      // const hashPassword = await argon2.hash(data.password);
      if (check === true) {
        resolve({
          code: 1,
          message: "Email đã tồn tại, vui lòng nhập lại!",
        });
      } else {
        if (data.roleId === "R1") {
          await db.User.create({
            email: data.email,
            password: "123",
            name: data.name,
            address: data.address,
            phone: data.phone,
            gender: data.gender,
            roleId: data.roleId,
            image: data.image,
          });
          resolve({
            code: 0,
            message: "Thêm admin thành công!",
          });
        } else {
          await db.User.create({
            email: data.email,
            password: "123",
            name: data.name,
            address: data.address,
            phone: data.phone,
            gender: data.gender,
            roleId: data.roleId,
            image: data.image,
            contentHTML: data.contentHTML,
            contentMarkdown: data.contentMarkdown,
          });
          resolve({
            code: 0,
            message: "Thêm bác sĩ thành công!",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    let foundUser = await db.User.findOne({
      where: { id: userId },
    });
    if (!foundUser) {
      resolve({
        code: 2,
        message: `Người dùng không tồn tại`,
      });
    }
    await db.User.destroy({
      where: { id: userId },
    });
    resolve({
      code: 0,
      message: `Đã xóa thành công`,
    });
  });
};

let getUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = "";
      if (userId && userId !== "ALL") {
        user = await db.User.findOne({
          where: { id: userId },
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
      }
      resolve(user);
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = {};
      user = await db.User.findAll({
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

      resolve(user);
    } catch (e) {
      reject(e);
    }
  });
};

let getAllCodeService = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        resolve({
          code: 1,
          message: "Missing required parameters",
        });
      } else {
        let res = {};
        let allcode = await db.Allcode.findAll({
          where: { type: typeInput },
        });
        res.code = 0;
        res.data = allcode;
        resolve(res);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getUserMarkdown = (data) => {
  console.log("data:", data);
  return new Promise(async (resolve, reject) => {
    if (data.roleId === "R2") {
      let findDoctor = await db.Markdown.findOne({
        where: { doctorId: data.userId },
      });
      resolve({
        code: 0,
        data: findDoctor,
      });
    }
  });
};

module.exports = {
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  updateUserData: updateUserData,
  getUser: getUser,
  handleUserLogin: handleUserLogin,
  getAllCodeService: getAllCodeService,
  getUserMarkdown: getUserMarkdown,
};
