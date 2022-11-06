const menuService = require("../services/menuService");

let handleCreateNewMenuEatDetail = async (req, res) => {
  let menu = await menuService.createNewMenuEatDetail(req.body);
  return res.status(200).json({
    code: 0,
    message: "Ok",
    menu,
  });
};

let handleEditMenu = async (req, res) => {
  let data = req.body;
  let message = await menuService.updateMenu(data);
  return res.status(200).json(message);
};

// let handleDeleteParent = async (req, res) => {
//   let data = req.body;
//   let message = await menuService.deleteParent(data);
//   return res.status(200).json(message);
// };

module.exports = {
  handleCreateNewMenuEatDetail: handleCreateNewMenuEatDetail,
  handleEditMenu: handleEditMenu,
};
