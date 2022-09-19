const roleService = require("../services/roleService");

let handleGetAllRoles = async (req, res) => {
  let roles = await roleService.getAllRoles();
  return res.status(200).json({
    code: 0,
    message: "success",
    roles,
  });
};

module.exports = {
  handleGetAllRoles: handleGetAllRoles,
};
