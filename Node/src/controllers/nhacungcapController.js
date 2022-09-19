const nhacungcapService = require("../services/nhacungcapService");

let handleGetAllNhaCungCap = async (req, res) => {
  let ncc = await nhacungcapService.getAllNhaCungCap();
  return res.status(200).json({
    code: 0,
    message: "success",
    ncc,
  });
};

module.exports = {
  handleGetAllNhaCungCap: handleGetAllNhaCungCap,
};
