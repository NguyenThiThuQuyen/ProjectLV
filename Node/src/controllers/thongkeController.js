const thongkeService = require("../services/thongkeService");

let handleThongketheotuan = async (req, res) => {
  let week = req.query.week;
  if (!week) {
    return res.status(200).json({
      code: 1,
      message: "Missing required parmeters",
      week: [],
    });
  }
  let res1 = await thongkeService.getThongketheotuan(week);
  return res.status(200).json({
    code: 0,
    message: "Ok",
    res1,
  });
};

let handleThongkeDoanhthu = async (req, res) => {
  let year = req.query.year;
  if (!year) {
    return res.status(200).json({
      code: 1,
      message: "Missing required parmeters",
      year: [],
    });
  }
  let res1 = await thongkeService.getThongkeDoanhthu(year);
  return res.status(200).json({
    code: 0,
    message: "Ok",
    res1,
  });
};

module.exports = {
  handleThongketheotuan: handleThongketheotuan,
  handleThongkeDoanhthu: handleThongkeDoanhthu,
};
