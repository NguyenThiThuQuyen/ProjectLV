const donvitinhService = require("../services/donvitinhService");

let handleGetAllDonViTinh = async (req, res) => {
  let dvt = await donvitinhService.getAllDonViTinh();
  return res.status(200).json({
    code: 0,
    message: "success",
    dvt,
  });
};

module.exports = {
  handleGetAllDonViTinh: handleGetAllDonViTinh,
};
