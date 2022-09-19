const medicalService = require("../services/medicalService");

let handleGetAllMedicals = async (req, res) => {
  let medicals = await medicalService.getAllMedicals();
  return res.status(200).json({
    code: 0,
    message: "success",
    medicals,
  });
};

let handleCreateMedical = async (req, res) => {
  let message = await medicalService.createNewMedical(req.body);
  return res.status(200).json(message);
};

let handleEditMedical = async (req, res) => {
  let data = req.body;
  let message = await medicalService.updateMedical(data);
  return res.status(200).json(message);
};

let handleDeleteMedical = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      code: 1,
      message: "Error deleting",
    });
  }
  let message = await medicalService.deleteMedical(req.query.id);
  return res.status(200).json(message);
};

module.exports = {
  handleCreateMedical: handleCreateMedical,
  handleGetAllMedicals: handleGetAllMedicals,
  handleEditMedical: handleEditMedical,
  handleDeleteMedical: handleDeleteMedical,
};
