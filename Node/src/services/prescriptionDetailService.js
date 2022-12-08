const db = require("../models/index");

let handleCheckMedical = (prescriptionId, medicalId) => {
  return new Promise(async (resolve, reject) => {
    let check = "";

    check = await db.PrescriptionDetail.findOne({
      where: { prescriptionId: prescriptionId, medicalId: medicalId },
    });
    console.log("check", check);
    if (check) {
      resolve(true);
    } else {
      resolve(false);
    }
  });
};

let createPrescriptionDetail = (data) => {
  console.log("data:", data);
  return new Promise(async (resolve, reject) => {
    let kt = await handleCheckMedical(data.prescriptionId, data.medicalId);
    console.log("kt:", kt);
    try {
      if (kt == false) {
        await db.PrescriptionDetail.create({
          lieudung: data.lieudung,
          cachdung: data.cachdung,
          soluong: data.soluong,
          solandung: data.solandung,
          ghichu: data.ghichu,
          medicalId: data.medicalId,
          prescriptionId: data.prescriptionId,
        });
        resolve({
          code: 0,
          message: "Thêm thành công!",
        });
      } else {
        resolve({
          code: 1,
          message: "Thuốc đã tồn tại!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllPrescriptionDetail = (prescriptionId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let schedule = {};
      schedule = await db.PrescriptionDetail.findAll({
        where: { prescriptionId: prescriptionId },
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: db.Medical,
            as: "medicalDataToPrescriptionDetail",
            attributes: ["name", "id"],
          },
        ],
      });

      resolve(schedule);
    } catch (e) {
      reject(e);
    }
  });
};

let getPrescriptionDetail = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let chitiet = {};
      chitiet = await db.PrescriptionDetail.findOne({
        where: { id: id },
        include: [
          {
            model: db.Medical,
            as: "medicalDataToPrescriptionDetail",
            attributes: ["name", "id"],
          },
        ],
      });

      resolve(chitiet);
    } catch (e) {
      reject(e);
    }
  });
};

let deletePrescriptionDetail = (id) => {
  return new Promise(async (resolve, reject) => {
    let found = await db.PrescriptionDetail.findOne({
      where: { id: id },
    });
    if (!found) {
      resolve({
        code: 2,
        message: `Không tồn tại khung giờ`,
      });
    }
    await db.PrescriptionDetail.destroy({
      where: { id: id },
    });
    resolve({
      code: 0,
      message: `Đã xóa thành công`,
    });
  });
};

let findPrescriptionDetail = (prescriptionId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let chitiet = {};
      chitiet = await db.PrescriptionDetail.findAll({
        where: { prescriptionId: prescriptionId },
        include: [
          {
            model: db.Prescription,
            as: "prescriptionDataToPrescriptionDetail",
            attributes: [
              "dateCreate",
              "loidan",
              "menuId",
              "reservationTicketId",
              "id",
            ],
            include: [
              {
                model: db.Menu,
                as: "menuDataToPrescription",
                attributes: ["name", "id"],
              },
              {
                model: db.ReservationTicket,
                as: "reservationTicketDataToPrescription",
              },
            ],
          },
        ],
      });

      resolve(chitiet);
    } catch (e) {
      reject(e);
    }
  });
};

// let findPrescriptionDetailInToaThuoc = (reservationTicketId) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let chitiet = {};
//       chitiet = await db.PrescriptionDetail.findAll({
//         where: { reservationTicketId: reservationTicketId },
//         include: [
//           {
//             model: db.Prescription,
//             as: "prescriptionDataToPrescriptionDetail",
//             attributes: [
//               "dateCreate",
//               "loidan",
//               "menuId",
//               "reservationTicketId",
//               "id",
//             ],
//             include: [
//               {
//                 model: db.Menu,
//                 as: "menuDataToPrescription",
//                 attributes: ["name", "id"],
//                 include: [
//                   {
//                     model: db.EatDetail,
//                     as: "menuDataToEatDetail",
//                     include: [
//                       {
//                         model: db.Dish,
//                         as: "dishDataToEatDetail",
//                       },
//                       {
//                         model: db.EatTimeslot,
//                         as: "eatTimeslotDataToEatDetail",
//                       },
//                       {
//                         model: db.EatDate,
//                         as: "eatDateDataToEatDetail",
//                       },
//                     ],
//                   },
//                 ],
//               },
//               {
//                 model: db.ReservationTicket,
//                 as: "reservationTicketDataToPrescription",
//               },
//             ],
//           },
//         ],
//       });

//       resolve(chitiet);
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

module.exports = {
  createPrescriptionDetail: createPrescriptionDetail,
  getAllPrescriptionDetail: getAllPrescriptionDetail,
  deletePrescriptionDetail: deletePrescriptionDetail,
  getPrescriptionDetail: getPrescriptionDetail,
  findPrescriptionDetail: findPrescriptionDetail,
  // findPrescriptionDetailInToaThuoc: findPrescriptionDetailInToaThuoc,
};
