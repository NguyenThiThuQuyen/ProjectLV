const db = require("../models");
const doctorService = require("../services/doctorService");

let handleGetAllDoctorHome = async (req, res) => {
  let limit = req.query.limit;
  console.log("limit:", limit);
  // if (!limit) limit = 3;
  try {
    let response = await doctorService.getAllDoctorHome(limit);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(200).json({
      code: -1,
      message: "Error",
    });
  }
};

let postInforDoctor = async (req, res) => {
  try {
    let response = await doctorService.saveDetailInforDoctor(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      code: -1,
      message: "Error ne",
    });
  }
};

let getScheduleByDate = async (req, res) => {
  try {
    let infor = await doctorService.scheduleByDate(
      req.query.doctorId,
      req.query.date
    );
    return res.status(200).json();
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      code: -1,
      message: "Error ne",
    });
  }
};

let bulkCreateSchedule = async (req, res) => {
  try {
    let infor = await doctorService.bulkCreateSchedule(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      code: -1,
      message: "Error ne",
    });
  }
};

module.exports = {
  handleGetAllDoctorHome: handleGetAllDoctorHome,
  postInforDoctor: postInforDoctor,
  getScheduleByDate: getScheduleByDate,
  bulkCreateSchedule: bulkCreateSchedule,
};
