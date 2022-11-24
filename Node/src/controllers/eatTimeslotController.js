const eatTimeslotService = require("../services/eatTimeslotService");

let handleGetAllEatTimeslots = async (req, res) => {
  let eatTimeslot = await eatTimeslotService.getAllEatTimeslots();
  return res.status(200).json({
    code: 0,
    message: "success",
    eatTimeslot,
  });
};

let handleGetAllFindEatTimeslotsToSession = async (req, res) => {
  let data = req.body;
  let message = await eatTimeslotService.getAllFindEatTimeslotsToSession(data);
  return res.status(200).json(message);
};

// let handleCountEatDetail = async (req, res) => {
//   let id = req.query.id; //all, id
//   if (!id) {
//     return res.status(200).json({
//       code: 1,
//       message: "Missing required parmeters",
//       countEatTimeslots: [],
//     });
//   }
//   let countEatTimeslot = await eatTimeslotService.getCountEatDetail(id);
//   return res.status(200).json({
//     code: 0,
//     message: "Ok",
//     countEatTimeslot,
//   });
// };

let handleCountEatDetail = async (req, res) => {
  let data = req.body;
  let message = await eatTimeslotService.getCountEatDetail(data);
  return res.status(200).json(message);
};

let handleFindEatStimeslot = async (req, res) => {
  // let data = req.body;
  let data = req.body.data;
  let message = await eatTimeslotService.getFindEatStimeslot(data);
  // console.log("dataaaaaa:", data);
  return res.status(200).json(message);
};

module.exports = {
  handleGetAllEatTimeslots: handleGetAllEatTimeslots,
  handleGetAllFindEatTimeslotsToSession: handleGetAllFindEatTimeslotsToSession,
  handleCountEatDetail: handleCountEatDetail,
  handleFindEatStimeslot: handleFindEatStimeslot,
};
