const db = require("../models/index");

let createReceipt = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hoadon = await db.Receipt.create({
        date: data.date,
        userId: data.userId,
        reservationTicketId: data.reservationTicketId,
      });

      if (hoadon) {
        let timId = await db.Receipt.findOne({
          where: { id: hoadon.id },
        });

        if (timId) {
          timId.date = hoadon.createdAt;
          await timId.save();
        }

        if (timId) {
          let trangthai = await db.ReservationTicket.findOne({
            where: {
              id: data.reservationTicketId,
            },
          });
          if (trangthai) {
            trangthai.status = "Đã thanh toán";
            trangthai.save();
          }
        }
      }
      resolve({
        code: 0,
        message: "success",
        data: hoadon.id,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getReceipt = (receiptId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let receipt = "";
      receipt = await db.Receipt.findOne({
        where: { id: receiptId },
        include: [
          {
            model: db.User,
            as: "userDataToReceipt",
            attributes: ["name", "id"],
          },
          {
            model: db.ReservationTicket,
            as: "phieudatchoDataToReceipt",
            attributes: [
              "scheduleId",
              "medicalpackageId",
              "patientId",
              "doctorId",
              "id",
            ],
            include: [
              {
                model: db.Schedule,
                as: "scheduleDataToPhieudatcho",
                attributes: ["registerDate", "timeslotId", "id"],
                include: [
                  {
                    model: db.TimeSlot,
                    as: "timeSlotDataToSchedule",
                    attributes: ["timeslot", "id"],
                  },
                ],
              },
              {
                model: db.MedicalPackage,
                as: "goituvanDataToPhieudatcho",
                attributes: ["packageName", "id"],
                include: [
                  {
                    model: db.PackagePrice,
                    as: "medicalPackageDataToPackagePrice",
                    attributes: ["price", "applydateId", "id"],
                  },
                ],
              },
              {
                model: db.Patient,
                as: "patientDataToPhieudatcho",
                attributes: ["childrentName", "id"],
                include: [
                  {
                    model: db.Parent,
                    as: "parentDataToPatient",
                    attributes: ["name", "id"],
                  },
                ],
              },
              {
                model: db.User,
                as: "doctorDataToPhieudatcho",
                attributes: ["name", "id"],
              },
            ],
          },
        ],
      });

      resolve(receipt);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createReceipt: createReceipt,
  getReceipt: getReceipt,
};
