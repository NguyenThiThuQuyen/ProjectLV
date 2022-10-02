const { response } = require("express");
const treatmentService = require("../services/treatmentService");

let handleCreateNewTreatment = async (req, res) => {
  let treatment = await treatmentService.createNewTreament(req.body);
  return response.status(200).json(treatment);
};

module.exports = {
  handleCreateNewTreatment: handleCreateNewTreatment,
};
