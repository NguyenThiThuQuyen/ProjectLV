const prescriptionDetailService = require("../services/prescriptionDetailService");

let handleCreatePrescriptionDetail = async (req, res) => {
  let chitiet = await prescriptionDetailService.createPrescriptionDetail(
    req.body
  );
  return res.status(200).json({
    code: 0,
    message: "success",
    chitiet,
  });
};

let handleGetAllPrescriptionDetail = async (req, res) => {
  let prescriptionId = req.query.prescriptionId; //all, id
  if (!prescriptionId) {
    return res.status(200).json({
      code: 1,
      message: "Missing required parmeters",
      finds: [],
    });
  }
  let getall = await prescriptionDetailService.getAllPrescriptionDetail(
    prescriptionId
  );
  return res.status(200).json({
    code: 0,
    message: "success",
    getall,
  });
};

let handleDeletePrescriptionDetail = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      code: 1,
      message: "Error",
    });
  }
  let message = await prescriptionDetailService.deletePrescriptionDetail(
    req.query.id
  );
  return res.status(200).json(message);
};

module.exports = {
  handleCreatePrescriptionDetail: handleCreatePrescriptionDetail,
  handleGetAllPrescriptionDetail: handleGetAllPrescriptionDetail,
  handleDeletePrescriptionDetail: handleDeletePrescriptionDetail,
};
