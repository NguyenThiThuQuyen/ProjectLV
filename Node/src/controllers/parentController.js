const parentService = require("../services/parentService");

let handleCreateParent = async (req, res) => {
  let parent = await parentService.createNewParent(req.body);
  return res.status(200).json({
    code: 0,
    message: "success",
    parent,
  });
};

let handleGetAllParents = async (req, res) => {
  let parents = await parentService.getAllParents();
  return res.status(200).json({
    code: 0,
    message: "success",
    parents,
  });
};

let handleEditParent = async (req, res) => {
  let data = req.body;
  let message = await parentService.updateParentData(data);
  return res.status(200).json(message);
};

let handleDeleteParent = async (req, res) => {
  let data = req.body;
  let message = await parentService.deleteParent(data);
  return res.status(200).json(message);
};

let handleGetParent = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      code: 1,
      message: "Missing required parmeters",
      parents: [],
    });
  }
  let parent = await parentService.getParent(id);
  return res.status(200).json({
    code: 0,
    message: "Ok",
    parent,
  });
};

let handleFindPatient = async (req, res) => {
  let id = req.query.id; //all, id
  if (!id) {
    return res.status(200).json({
      code: 1,
      message: "Missing required parmeters",
      finds: [],
    });
  }
  let parent = await parentService.findPatient(id);
  return res.status(200).json({
    code: 0,
    message: "success",
    parent,
  });
};

module.exports = {
  handleCreateParent: handleCreateParent,
  handleGetAllParents: handleGetAllParents,
  handleEditParent: handleEditParent,
  handleDeleteParent: handleDeleteParent,
  handleGetParent: handleGetParent,
  handleFindPatient: handleFindPatient,
};
