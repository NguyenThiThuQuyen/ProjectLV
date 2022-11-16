const prescriptionService = require("../services/prescriptionService");

let handleCreatePrescription = async (req, res) => {
  let prescription = await prescriptionService.createNewPrescription(req.body);
  return res.status(200).json(prescription);
};

let handleEditPrescription = async (req, res) => {
  let data = req.body;
  let message = await prescriptionService.updatePrescriptionData(data);
  return res.status(200).json(message);
};

let handleDeletePrescription = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      code: 1,
      message: "Error",
    });
  }
  let message = await prescriptionService.deletePrescription(req.query.id);
  return res.status(200).json(message);
};

let handleGetAllPrescriptions = async (req, res) => {
  let prescriptions = await prescriptionService.getAllPrescriptions();
  return res.status(200).json({
    code: 0,
    message: "success",
    prescriptions,
  });
};

let handleGetPrescription = async (req, res) => {
  let id = req.query.id; //all, id
  if (!id) {
    return res.status(200).json({
      code: 1,
      message: "Missing required parmeters",
      prescriptions: [],
    });
  }
  let prescription = await prescriptionService.getPrescription(id);
  return res.status(200).json({
    code: 0,
    message: "Ok",
    prescription,
  });
};

let handleFindPhieuDatChoInPrescription = async (req, res) => {
  let data = req.body;
  let message = await prescriptionService.findPhieuDatChoInPrescription(data);
  return res.status(200).json(message);
};

module.exports = {
  handleCreatePrescription: handleCreatePrescription,
  handleEditPrescription: handleEditPrescription,
  handleDeletePrescription: handleDeletePrescription,
  handleGetAllPrescriptions: handleGetAllPrescriptions,
  handleGetPrescription: handleGetPrescription,
  handleFindPhieuDatChoInPrescription: handleFindPhieuDatChoInPrescription,
};
