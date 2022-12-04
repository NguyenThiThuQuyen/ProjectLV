const receiptService = require("../services/receiptService");

let handleCreateReceipt = async (req, res) => {
  let receipt = await receiptService.createReceipt(req.body);
  return res.status(200).json({
    code: 0,
    message: "success",
    receipt,
  });
};

let handleGetReceipt = async (req, res) => {
  let id = req.query.id; //all, id
  if (!id) {
    return res.status(200).json({
      code: 1,
      message: "Missing required parmeters",
      receipt: [],
    });
  }
  let receipt = await receiptService.getReceipt(id);
  return res.status(200).json({
    code: 0,
    message: "Ok",
    receipt,
  });
};

let handleFindReservationTicketInReceipt = async (req, res) => {
  let phieudatchoId = req.query.reservationTicketId;
  if (!phieudatchoId) {
    return res.status(200).json({
      code: 1,
      message: "Missing required parmeters",
      phieudatcho: [],
    });
  }
  let phieuId = await receiptService.getFindReservationTicketInReceipt(
    phieudatchoId
  );
  return res.status(200).json({
    code: 0,
    message: "Ok",
    phieuId,
  });
};

module.exports = {
  handleCreateReceipt: handleCreateReceipt,
  handleGetReceipt: handleGetReceipt,
  handleFindReservationTicketInReceipt: handleFindReservationTicketInReceipt,
};
