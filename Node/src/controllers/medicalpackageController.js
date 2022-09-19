const goiKhamService = require("../services/medicalpackageService");

let handleGetAllGoiKham = async (req, res) => {
  let goikham = await goiKhamService.getAllGoiKham();
  return res.status(200).json({
    code: 0,
    message: "success",
    goikham,
  });
};

let handleGoiKham = (req, res) => {
  let data = goiKhamService.createNewMedicalpackage(req.body);
  return res.status(200).json(data);
};

let handleEditGoiKham = async (req, res) => {
  let data = req.body;
  let message = await goiKhamService.updateGoiKham(data);
  return res.status(200).json(message);
};

let handleDeleteGoiKham = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      code: 1,
      message: "Error deleting",
    });
  }
  let message = await goiKhamService.deleteGoiKham(req.query.id);
  return res.status(200).json(message);
};

module.exports = {
  handleGoiKham: handleGoiKham,
  handleEditGoiKham: handleEditGoiKham,
  handleDeleteGoiKham: handleDeleteGoiKham,
  handleGetAllGoiKham: handleGetAllGoiKham,
};
