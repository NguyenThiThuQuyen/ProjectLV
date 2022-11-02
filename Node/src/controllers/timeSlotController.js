const timeslotService = require("../services/timeslotService");

let handleGetAllTimeslots = async (req, res) => {
  let timeslot = await timeslotService.getAllTimeslots();
  return res.status(200).json({
    code: 0,
    message: "success",
    timeslot,
  });
};

let handleCreateTimeslot = async (req, res) => {
  let message = await timeslotService.createNewTimeslot(req.body);
  return res.status(200).json(message);
};

let handleEditTimeslot = async (req, res) => {
  let data = req.body;
  let message = await timeslotService.updateTimeslot(data);
  return res.status(200).json(message);
};

let handleDeleteTimeslot = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      code: 1,
      message: "Error deleting",
    });
  }
  let message = await timeslotService.deleteMedical(req.query.id);
  return res.status(200).json(message);
};

let handleGetATimeslot = async (req, res) => {
  let id = req.query.id; //all, id
  if (!id) {
    return res.status(200).json({
      code: 1,
      message: "Missing required parmeters",
      timeslots: [],
    });
  }
  let timeslot = await timeslotService.getATimeslot(id);
  return res.status(200).json({
    code: 0,
    message: "Ok",
    timeslot,
  });
};

module.exports = {
  handleGetAllTimeslots: handleGetAllTimeslots,
  handleCreateTimeslot: handleCreateTimeslot,
  handleEditTimeslot: handleEditTimeslot,
  handleDeleteTimeslot: handleDeleteTimeslot,
  handleGetATimeslot: handleGetATimeslot,
};
