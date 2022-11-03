const phieudatchoService = require("../services/phieudatchoService");

let handleGetAllPhieudatcho = async (req, res) => {
  let phieudatcho = await phieudatchoService.getAllPhieudatcho();
  return res.status(200).json({
    code: 0,
    message: "success",
    phieudatcho,
  });
};

let handleCreatePhieudatcho = async (req, res) => {
  console.log("req.body: ", req.body);
  let phieudatcho = await phieudatchoService.createPhieudatcho(req.body);
  return res.status(200).json(phieudatcho);
};

let handleEditPhieudatcho = async (req, res) => {
  let data = req.body;
  let message = await phieudatchoService.updatePhieudatcho(data);
  return res.status(200).json(message);
};

let handleDeletePhieudatcho = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      code: 1,
      message: "Error",
    });
  }
  let message = await phieudatchoService.deletePhieudatcho(req.query.id);
  return res.status(200).json(message);
};

let handleGetPhieudatcho = async (req, res) => {
  let id = req.query.id; //all, id
  if (!id) {
    return res.status(200).json({
      code: 1,
      message: "Missing required parmeters",
      phieudatchos: [],
    });
  }
  let phieudatcho = await phieudatchoService.getPhieudatcho(id);
  return res.status(200).json({
    code: 0,
    message: "Ok",
    phieudatcho,
  });
};

let handleEmail = async (req, res) => {
  let data = req.body;
  let message = await phieudatchoService.findEmail(data);
  return res.status(200).json(message);
};

module.exports = {
  handleCreatePhieudatcho: handleCreatePhieudatcho,
  handleEditPhieudatcho: handleEditPhieudatcho,
  handleGetAllPhieudatcho: handleGetAllPhieudatcho,
  handleGetPhieudatcho: handleGetPhieudatcho,
  handleDeletePhieudatcho: handleDeletePhieudatcho,
  handleEmail: handleEmail,
};
