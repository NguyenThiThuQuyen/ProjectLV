const userService = require("../services/userService");

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(500).json({
      code: 1,
      message: "Error",
    });
  }
  let userData = await userService.handleUserLogin(email, password);
  console.log(userData);
  return res.status(200).json({
    code: userData.code,
    message: userData.message,
    user: userData.user ? userData.user : {},
  });
};

let handleGetAllUsers = async (req, res) => {
  let users = await userService.getAllUsers();
  return res.status(200).json({
    code: 0,
    message: "success",
    users,
  });
};

let handleCreateNewUser = async (req, res) => {
  let user = await userService.createNewUser(req.body);
  return res.status(200).json(user);
};

let handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await userService.updateUserData(data);
  return res.status(200).json(message);
};

let handleDeleteUser = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      code: 1,
      message: "Error",
    });
  }
  let message = await userService.deleteUser(req.query.id);
  return res.status(200).json(message);
};

let handleGetUser = async (req, res) => {
  let id = req.query.id; //all, id
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parmeters",
      users: [],
    });
  }
  let user = await userService.getUser(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    user,
  });
};

// let test = async (req, res) => {
//   let id = req.query.id; //all, id
//   if (!id) {
//     return res.status(200).json({
//       errCode: 1,
//       errMessage: "Missing required parmeters",
//       users: [],
//     });
//   }

//   let users = await userService.getAllUsers(id);
//   return res.status(200).json({
//     errCode: 0,
//     errMessage: "Ok",
//     users,
//   });
// };

module.exports = {
  // handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUser: handleCreateNewUser,
  handleDeleteUser: handleDeleteUser,
  handleEditUser: handleEditUser,
  handleLogin: handleLogin,
  handleGetUser: handleGetUser,
};
