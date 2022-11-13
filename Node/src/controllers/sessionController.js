const sessionService = require("../services/sessionService");
let handleGetAllSessions = async (req, res) => {
  let session = await sessionService.getAllSessions();
  return res.status(200).json({
    code: 0,
    message: "success",
    session,
  });
};
module.exports = {
  handleGetAllSessions: handleGetAllSessions,
};
