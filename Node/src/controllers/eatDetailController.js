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

let handleFindEatDate = async (req, res) => {
  let data = req.body;
  let message = await eatDetailService.findEatDate(data);
  return res.status(200).json(message);
};

let handleDeleteEatDetail = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      code: 1,
      message: "Error",
    });
  }
  let message = await eatDetailService.deleteEatDetail(req.query.id);
  return res.status(200).json(message);
};

module.exports = {
  handleFindEatDetailToDate: handleFindEatDetailToDate,
  handleCreateEatDetail: handleCreateEatDetail,
  handleFindEatDate: handleFindEatDate,
  handleDeleteEatDetail: handleDeleteEatDetail,
};
