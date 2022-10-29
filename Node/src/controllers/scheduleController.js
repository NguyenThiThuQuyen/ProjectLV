const scheduleService = require("../services/scheduleService");

let handleGetAllSchedules = async (req, res) => {
  let schedules = await scheduleService.getAllSchedules();
  return res.status(200).json({
    code: 0,
    message: "success",
    schedules,
  });
};

let handleCreateSchedule = async (req, res) => {
  let schedule = await scheduleService.createNewSchedule(req.body);
  return res.status(200).json({
    code: 0,
    message: "success",
    schedule,
  });
};

let handleFindDoctor = async (req, res) => {
  let doctor = await scheduleService.finDoctor();
  return res.status(200).json({
    code: 0,
    message: "success",
    doctor,
  });
};

let handleFindTimeslot = async (req, res) => {
  let data = req.body;
  let message = await scheduleService.findTimeslot(data);
  return res.status(200).json(message);
};

let handleFindSchedule = async (req, res) => {
  let id = req.query.id; //all, id
  if (!id) {
    return res.status(200).json({
      code: 1,
      message: "Missing required parmeters",
      finds: [],
    });
  }
  let schedule = await scheduleService.findLichTVTheoBacSi(id);
  return res.status(200).json({
    code: 0,
    message: "success",
    schedule,
  });
};

let handleEditSchedule = async (req, res) => {
  let data = req.body;
  let message = await scheduleService.updateSchedule(data);
  return res.status(200).json(message);
};

let handleDeleteSchedule = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      code: 1,
      message: "Error",
    });
  }
  let message = await scheduleService.deleteSchedule(req.query.id);
  return res.status(200).json(message);
};

let handleGetSchedules = async (req, res) => {
  let id = req.query.id; //all, id
  if (!id) {
    return res.status(200).json({
      code: 1,
      message: "Missing required parmeters",
      schedules: [],
    });
  }
  let schedule = await scheduleService.getSchedule(id);
  return res.status(200).json({
    code: 0,
    message: "Ok",
    schedule,
  });
};

let handleFindIdSchedule = async (req, res) => {
  let data = req.body;
  console.log("data1", data);
  let message = await scheduleService.findIdSchedule(data);
  return res.status(200).json(message);
};

module.exports = {
  handleCreateSchedule: handleCreateSchedule,
  handleFindDoctor: handleFindDoctor,
  handleGetAllSchedules: handleGetAllSchedules,
  handleEditSchedule: handleEditSchedule,
  handleDeleteSchedule: handleDeleteSchedule,
  handleGetSchedules: handleGetSchedules,
  handleFindSchedule: handleFindSchedule,
  handleFindTimeslot: handleFindTimeslot,
  handleFindIdSchedule: handleFindIdSchedule,
};
