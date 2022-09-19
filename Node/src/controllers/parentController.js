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
  if (!req.query.id) {
    return res.status(200).json({
      code: 1,
      message: "Error",
    });
  }
  let message = await parentService.deleteParent(req.query.id);
  return res.status(200).json(message);
};

module.exports = {
  handleCreateParent: handleCreateParent,
  handleGetAllParents: handleGetAllParents,
  handleEditParent: handleEditParent,
  handleDeleteParent: handleDeleteParent,
};
