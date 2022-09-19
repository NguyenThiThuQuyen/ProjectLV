const medicaltypeService = require("../services/medicaltypeService");

let handleCreateMedicalType = async (req, res) => {
  let medicaltype = await medicaltypeService.createNewMedicaltype(req.body);
  return res.status(200).json({
    code: 0,
    message: "success",
    medicaltype,
  });
};

let handleEditMedicalType = async (req, res) => {
  let data = req.body;
  let message = await medicaltypeService.updateMedicalType(data);
  return res.status(200).json(message);
};

let handleDeleteMedicalType = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      code: 1,
      message: "Error deleting",
    });
  }
  let message = await medicaltypeService.deleteMedicalType(req.query.id);
  return res.status(200).json(message);
};

let handleGetAllMedicalTypes = async (req, res) => {
  let medicaltypes = await medicaltypeService.getAllMedicalTypes();
  return res.status(200).json({
    code: 0,
    message: "success",
    medicaltypes,
  });
};

module.exports = {
  handleCreateMedicalType: handleCreateMedicalType,
  handleEditMedicalType: handleEditMedicalType,
  handleDeleteMedicalType: handleDeleteMedicalType,
  handleGetAllMedicalTypes: handleGetAllMedicalTypes,
};
