const eatDateService = require("../services/eatDateService");

let handleGetAllEatDates = async (req, res) => {
  let data = req.body;
  let eatdates = await eatDateService.getAllEatDates(data);
  return res.status(200).json({
    code: 0,
    message: "success",
    eatdates,
  });
};

module.exports = {
  handleGetAllEatDates: handleGetAllEatDates,
};
