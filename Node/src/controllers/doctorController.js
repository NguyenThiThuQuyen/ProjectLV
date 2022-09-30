const doctorService = require("../services/doctorService");

let handleGetAllDoctorHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 3;
  try {
    let response = await doctorService.getAllDoctorHome(limit);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(200).json({
      code: -1,
      message: "Error",
    });
  }
};

module.exports = {
  handleGetAllDoctorHome: handleGetAllDoctorHome,
};
