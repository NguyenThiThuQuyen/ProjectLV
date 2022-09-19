const genderService = require("../services/genderService");

let handleGetAllGenders = async (req, res) => {
  let genders = await genderService.getAllGenders();
  return res.status(200).json({
    code: 0,
    message: "success",
    genders,
  });
};

module.exports = {
  handleGetAllGenders: handleGetAllGenders,
};
