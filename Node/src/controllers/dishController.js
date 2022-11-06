const dishService = require("../services/dishService");

let handleGetAllDishes = async (req, res) => {
  let dishes = await dishService.getAllDishes();
  return res.status(200).json({
    code: 0,
    message: "success",
    dishes,
  });
};

let handleGetDish = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      code: 1,
      message: "Missing required parmeters",
      dishes: [],
    });
  }
  let dish = await dishService.getDish(id);
  return res.status(200).json({
    code: 0,
    message: "Ok",
    dish,
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

let handleFindDishToCate = async (req, res) => {
  let id = req.query.id; //all, id
  if (!id) {
    return res.status(200).json({
      code: 1,
      message: "Missing required parmeters",
      finds: [],
    });
  }
  let finddish = await dishService.findDishToCate(id);
  return res.status(200).json({
    code: 0,
    message: "success",
    finddish,
  });
};

module.exports = {
  handleGetAllDishes: handleGetAllDishes,
  handleCreateDish: handleCreateDish,
  handleDeleteDish: handleDeleteDish,
  handleEditDish: handleEditDish,
  handleGetDish: handleGetDish,
  handleFindDishToCate: handleFindDishToCate,
};
