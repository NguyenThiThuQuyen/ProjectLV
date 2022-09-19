const patientService = require("../services/patientService");

let handleCreateNewPatient = async (req, res) => {
  let patient = await patientService.createNewPatient(req.body);
  return res.status(200).json({
    code: 0,
    message: "success",
    patient,
  });
};

let handleGetAllPatients = async (req, res) => {
  let patients = await patientService.getAllPatient();
  return res.status(200).json({
    code: 0,
    message: "success",
    patients,
  });
};

let handleEditPatient = async (req, res) => {
  let data = req.body;
  let message = await patientService.updatePatientData(data);
  return res.status(200).json(message);
};

let handleDeletePatient = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      code: 1,
      message: "Error",
    });
  }
  let message = await patientService.deletePatient(req.query.id);
  return res.status(200).json(message);
};

let handleGetPatient = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parmeters",
      patient: [],
    });
  }
  let patient = await patientService.getPatient(id);
  return res.status(200).json({
    code: 0,
    message: "Ok",
    patient,
  });
};

module.exports = {
  handleCreateNewPatient: handleCreateNewPatient,
  handleGetAllPatients: handleGetAllPatients,
  handleEditPatient: handleEditPatient,
  handleDeletePatient: handleDeletePatient,
  handleGetPatient: handleGetPatient,
};
