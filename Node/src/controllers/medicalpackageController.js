const goiKhamService = require("../services/medicalpackageService");

let handleGetAllGoiKham = async (req, res) => {
  let goikham = await goiKhamService.getAllGoiKham();
  return res.status(200).json({
    code: 0,
    message: "success",
    goikham,
  });
};

let handleGetGoiKham = async (req, res) => {
  let id = req.query.id; //all, id
  if (!id) {
    return res.status(200).json({
      code: 1,
      message: "Missing required parmeters",
      goikhams: [],
    });
  }
  let goikham = await goiKhamService.getMedicalPackage(id);
  return res.status(200).json({
    code: 0,
    message: "Ok",
    goikham,
  });
};

let handleGoiKham = async (req, res) => {
  let data = await goiKhamService.createNewMedicalpackage(req.body);
  console.log("data:", data);
  return res.status(200).json(data);
};

let handleEditGoiKham = async (req, res) => {
  let data = req.body;
  let message = await goiKhamService.updateGoiKham(data);
  return res.status(200).json(message);
};

let handleDeleteGoiKham = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      code: 1,
      message: "Error deleting",
    });
  }
  let message = await goiKhamService.deleteGoiKham(req.query.id);
  return res.status(200).json(message);
};

let handleGetAllMedicalPackageHome = async (req, res) => {
  let limit = req.query.limit;
  // if (!limit) limit = 4;
  try {
    let response = await goiKhamService.getAllMedicalPackageHome(limit);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(200).json({
      code: -1,
      message: "Error",
    });
  }
};

// let handleGetAllMedicalPackageHomeAll = async (req, res) => {
//   let limit = req.query.limit;
//   // if (!limit) limit = 4;
//   try {
//     let response = await goiKhamService.getAllMedicalPackageHomeAll(limit);
//     return res.status(200).json(response);
//   } catch (e) {
//     return res.status(200).json({
//       code: -1,
//       message: "Error",
//     });
//   }
// };

module.exports = {
  handleGoiKham: handleGoiKham,
  handleEditGoiKham: handleEditGoiKham,
  handleDeleteGoiKham: handleDeleteGoiKham,
  handleGetAllGoiKham: handleGetAllGoiKham,
  handleGetAllMedicalPackageHome: handleGetAllMedicalPackageHome,
  // handleGetAllMedicalPackageHomeAll: handleGetAllMedicalPackageHomeAll,
  handleGetGoiKham: handleGetGoiKham,
};
