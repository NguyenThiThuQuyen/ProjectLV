const dishService = require("../services/dishService");

let handleGetAllDishes = async (req, res) => {
  let dishes = await dishService.getAllDishes();
  return res.status(200).json({
    code: 0,
    message: "success",
    dishes,
  });
};

let handleCreateDish = async (req, res) => {
  let dish = await dishService.createNewDish(req.body);
  return res.status(200).json(dish);
};

let handleEditDish = async (req, res) => {
  let data = req.body;
  let message = await dishService.updateDishData(data);
  return res.status(200).json(message);
};

let handleDeleteDish = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      code: 1,
      message: "Error",
    });
  }
  let message = await dishService.deleteDish(req.query.id);
  return res.status(200).json(message);
};

module.exports = {
  handleGetAllDishes: handleGetAllDishes,
  handleCreateDish: handleCreateDish,
  handleDeleteDish: handleDeleteDish,
  handleEditDish: handleEditDish,
};
