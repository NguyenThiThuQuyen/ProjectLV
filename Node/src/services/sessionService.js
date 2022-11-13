const db = require("../models/index");

let getAllSessions = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let sessions = {};
      sessions = await db.Session.findAll();
      resolve(sessions);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllSessions: getAllSessions,
};
