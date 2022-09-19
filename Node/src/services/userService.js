const db = require("../models/index");
// const argon2 = require("argon2");

let getAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = {};
      user = await db.User.findAll({
        include: [
          {
            model: db.Role,
            as: "roleDataToUser",
            attributes: ["role", "id"],
          },
          {
            model: db.Gender,
            as: "genderDataToUser",
            attributes: ["gender", "id"],
          },
        ],
      });

      resolve(user);
    } catch (e) {
      reject(e);
    }
  });
};

// let getAllUsers = (userId) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let users = "";
//       if (userId === "ALL") {
//         users = await db.User.findAll({
//           // attributes:{
//           //     exclude: ['password']
//           // }

//           include: [
//             {
//               model: db.Role,
//               as: "roleDataToUser",
//               attributes: ["role", "id"],
//             },
//             {
//               model: db.Gender,
//               as: "genderDataToUser",
//               attributes: ["gender", "id"],
//             },
//           ],
//         });
//       }
//       if (userId && userId !== "ALL") {
//         users = await db.User.findOne({
//           where: { id: userId },
//           // attributes:{
//           //     exclude: ['password']
//           // }
//           include: [
//             {
//               model: db.Role,
//               as: "roleDataToUser",
//               attributes: ["role", "id"],
//             },
//             {
//               model: db.Gender,
//               as: "genderDataToUser",
//               attributes: ["gender", "id"],
//             },
//           ],
//         });
//       }
//       resolve(users);
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

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
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          attributes: [
            "email",
            "roleId",
            "password",
            "name",
            "address",
            "phone",
            "genderId",
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
            userData.message = "Wrong password";
          }
        } else {
          userData.code = 2;
          userData.message = `User's not found`;
        }
      } else {
        //return error
        userData.code = 1;
        userData.message = `Your's Email isn't exist in your system. Please try other email`;
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserEmail(data.email);
      console.log("check email:", check);
      // const hashPassword = await argon2.hash(data.password);
      if (check === true) {
        resolve({
          code: 1,
          message: "Email đã tồn tại, vui lòng nhập lại!",
        });
      } else {
        await db.User.create({
          email: data.email,
          password: data.password,
          name: data.name,
          address: data.address,
          phone: data.phone,
          genderId: data.genderId,
          roleId: data.roleId,
          image: data.image,
        });
      }

      resolve({
        code: 0,
        message: "success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        console.log("check ", data);
        resolve({
          code: 2,
          message: "err",
        });
      } else {
        let user = await db.User.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (user) {
          user.name = data.name;
          user.address = data.address;
          user.phone = data.phone;
          user.genderId = data.genderId;
          user.roleId = data.roleId;
          await user.save();
          resolve({
            code: 0,
            message: "Update the user succeeds!",
          });
        } else {
          resolve({
            code: 1,
            message: `User not found!`,
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
        message: `The user isn't exist`,
      });
    }
    await db.User.destroy({
      where: { id: userId },
    });
    resolve({
      code: 0,
      message: `The user is deleted`,
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
              model: db.Role,
              as: "roleDataToUser",
              attributes: ["role", "id"],
            },
            {
              model: db.Gender,
              as: "genderDataToUser",
              attributes: ["gender", "id"],
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

module.exports = {
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  updateUserData: updateUserData,
  getUser: getUser,
  handleUserLogin: handleUserLogin,
};
