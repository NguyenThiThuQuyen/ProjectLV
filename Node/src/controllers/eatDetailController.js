const eatDetailService = require("../services/eatDetailService");

let handleFindEatDetailToDate = async (req, res) => {
  let data = req.body;
  let message = await eatDetailService.findEatDetailToDate(data);
  return res.status(200).json(message);
};

let handleCreateEatDetail = async (req, res) => {
  let eatdetail = await eatDetailService.createNewEatDetail(req.body);
  return res.status(200).json(eatdetail);
};

module.exports = {
  handleFindEatDetailToDate: handleFindEatDetailToDate,
  handleCreateEatDetail: handleCreateEatDetail,
};
