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
      code: 1,
      message: "Missing required parmeters",
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

let handleSearchParent = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      code: 1,
      message: "Error",
      searchParentId: [],
    });
  }
  let searchParentId = await patientService.getSearchParentById(id);
  return res.status(200).json({
    code: 0,
    message: "Ok",
    searchParentId,
  });
};

let handleGetAllPatientToIdParent = async (req, res) => {
  let parentId = req.query.parentId;
  if (!parentId) {
    return res.status(200).json({
      code: 1,
      message: "Missing required parmeters",
      findallpatients: [],
    });
  }
  let findallpatient = await patientService.getAllPatientToIdParent(parentId);
  return res.status(200).json({
    code: 0,
    message: "Ok",
    findallpatient,
  });
};

module.exports = {
  handleCreateNewPatient: handleCreateNewPatient,
  handleGetAllPatients: handleGetAllPatients,
  handleEditPatient: handleEditPatient,
  handleDeletePatient: handleDeletePatient,
  handleGetPatient: handleGetPatient,
  handleSearchParent: handleSearchParent,
  handleGetAllPatientToIdParent: handleGetAllPatientToIdParent,
};
