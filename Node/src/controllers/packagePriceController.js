const packagePriceService = require("../services/packagePriceService");

let handleGetAllPrices = async (req, res) => {
  let prices = await packagePriceService.getAllPrices();
  return res.status(200).json({
    code: 0,
    message: "success",
    prices,
  });
};

let handleCreatePrice = async (req, res) => {
  let price = await packagePriceService.createNewPrice(req.body);
  return res.status(200).json({
    code: 0,
    message: "success",
    price,
  });
};

module.exports = {
  handleCreatePrice: handleCreatePrice,
  handleGetAllPrices: handleGetAllPrices,
};
