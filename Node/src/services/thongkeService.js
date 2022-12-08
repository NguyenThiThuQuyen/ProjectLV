const db = require("../models/index");
const moment = require("moment");
const Op = require("Sequelize").Op;
let getThongketheotuan = (week) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (week == 1) {
        let arr = [];

        for (let i = 0; i < 7; i++) {
          let obj = {};
          obj.value = moment(new Date())
            .subtract(i + 1, "days")
            .startOf("day")
            .valueOf();
          arr.push(obj.value);
        }

        let arrCount = [];
        for (let i = 0; i < arr.length; i++) {
          let dem = await db.ReservationTicket.count({
            where: { arrivalDate: arr[i], status: "Đã tư vấn" },
          });
          arrCount.push(dem);
        }
        resolve(arrCount);
      } else if (week == 2) {
        let arr = [];
        let arr2 = [];

        for (let i = 0; i < 7; i++) {
          let obj = {};
          obj.value = moment(new Date())
            .subtract(i + 1, "days")
            .startOf("day")
            .valueOf();
          arr.push(obj.value);
        }

        for (let i = 0; i < 7; i++) {
          let obj = {};
          obj.value = moment(new Date())
            .subtract(i + 8, "days")
            .startOf("day")
            .valueOf();
          arr2.push(obj.value);
        }

        let arrCount = [];
        for (let i = 0; i < arr.length; i++) {
          let dem = await db.ReservationTicket.count({
            where: { arrivalDate: arr[i], status: "Đã tư vấn" },
          });
          arrCount.push(dem);
        }

        let arrCount2 = [];
        for (let i = 0; i < arr2.length; i++) {
          let dem = await db.ReservationTicket.count({
            where: { arrivalDate: arr2[i], status: "Đã tư vấn" },
          });
          arrCount2.push(dem);
        }

        resolve([arrCount, arrCount2]);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getThongkeDoanhthu = (year) => {
  return new Promise(async (resolve, reject) => {
    try {
      let getMoney = await db.Receipt.findAll({
        raw: true,
        nest: true,
        include: [
          {
            model: db.ReservationTicket,
            as: "phieudatchoDataToReceipt",
            attributes: [
              "scheduleId",
              "medicalpackageId",
              "patientId",
              "doctorId",
              "status",
              "id",
            ],
            where: { status: { [Op.or]: ["Đã tư vấn", "Đã thanh toán"] } },
            include: [
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
            ],
          },
        ],
      });
      let t1 = [];
      let t2 = [];
      let t3 = [];
      let t4 = [];
      let t5 = [];
      let t6 = [];
      let t7 = [];
      let t8 = [];
      let t9 = [];
      let t10 = [];
      let t11 = [];
      let t12 = [];
      let temp = [];
      for (let i = 0; i < getMoney.length; i++) {
        // tháng 1
        if (moment(getMoney[i].date).format("MM/YYYY") == `01/${year}`) {
          let obj = {};
          obj =
            getMoney[i].phieudatchoDataToReceipt.goituvanDataToPhieudatcho
              .medicalPackageDataToPackagePrice.price * 1;
          temp.push(obj);
          t1 = t1.concat(temp);
          temp = [];
        }

        // tháng 2
        if (moment(getMoney[i].date).format("MM/YYYY") == `02/${year}`) {
          let obj = {};
          obj =
            getMoney[i].phieudatchoDataToReceipt.goituvanDataToPhieudatcho
              .medicalPackageDataToPackagePrice.price * 1;
          temp.push(obj);
          t2 = t2.concat(temp);
          temp = [];
        }

        // tháng 3
        if (moment(getMoney[i].date).format("MM/YYYY") == `03/${year}`) {
          let obj = {};
          obj =
            getMoney[i].phieudatchoDataToReceipt.goituvanDataToPhieudatcho
              .medicalPackageDataToPackagePrice.price * 1;
          temp.push(obj);
          t3 = t3.concat(temp);
          temp = [];
        }

        // tháng 4
        if (moment(getMoney[i].date).format("MM/YYYY") == `04/${year}`) {
          let obj = {};
          obj =
            getMoney[i].phieudatchoDataToReceipt.goituvanDataToPhieudatcho
              .medicalPackageDataToPackagePrice.price * 1;
          temp.push(obj);
          t4 = t4.concat(temp);
          temp = [];
        }

        // tháng 5
        if (moment(getMoney[i].date).format("MM/YYYY") == `05/${year}`) {
          let obj = {};
          obj =
            getMoney[i].phieudatchoDataToReceipt.goituvanDataToPhieudatcho
              .medicalPackageDataToPackagePrice.price * 1;
          temp.push(obj);
          t5 = t5.concat(temp);
          temp = [];
        }

        // tháng 6
        if (moment(getMoney[i].date).format("MM/YYYY") == `06/${year}`) {
          let obj = {};
          obj =
            getMoney[i].phieudatchoDataToReceipt.goituvanDataToPhieudatcho
              .medicalPackageDataToPackagePrice.price * 1;
          temp.push(obj);
          t6 = t6.concat(temp);
          temp = [];
        }

        // tháng 7
        if (moment(getMoney[i].date).format("MM/YYYY") == `07/${year}`) {
          let obj = {};
          obj =
            getMoney[i].phieudatchoDataToReceipt.goituvanDataToPhieudatcho
              .medicalPackageDataToPackagePrice.price * 1;
          temp.push(obj);
          t7 = t7.concat(temp);
          temp = [];
        }

        // tháng 8
        if (moment(getMoney[i].date).format("MM/YYYY") == `08/${year}`) {
          let obj = {};
          obj =
            getMoney[i].phieudatchoDataToReceipt.goituvanDataToPhieudatcho
              .medicalPackageDataToPackagePrice.price * 1;
          temp.push(obj);
          t8 = t8.concat(temp);
          temp = [];
        }

        // tháng 9
        if (moment(getMoney[i].date).format("MM/YYYY") == `09/${year}`) {
          let obj = {};
          obj =
            getMoney[i].phieudatchoDataToReceipt.goituvanDataToPhieudatcho
              .medicalPackageDataToPackagePrice.price * 1;
          temp.push(obj);
          t9 = t9.concat(temp);
          temp = [];
        }

        // tháng 10
        if (moment(getMoney[i].date).format("MM/YYYY") == `10/${year}`) {
          let obj = {};
          obj =
            getMoney[i].phieudatchoDataToReceipt.goituvanDataToPhieudatcho
              .medicalPackageDataToPackagePrice.price * 1;
          temp.push(obj);
          t10 = t10.concat(temp);
          temp = [];
        }

        // tháng 11
        if (moment(getMoney[i].date).format("MM/YYYY") == `11/${year}`) {
          let obj = {};
          obj =
            getMoney[i].phieudatchoDataToReceipt.goituvanDataToPhieudatcho
              .medicalPackageDataToPackagePrice.price * 1;
          temp.push(obj);
          t11 = t11.concat(temp);
          temp = [];
        }

        // tháng 12
        if (moment(getMoney[i].date).format("MM/YYYY") == `12/${year}`) {
          let obj = {};
          obj =
            getMoney[i].phieudatchoDataToReceipt.goituvanDataToPhieudatcho
              .medicalPackageDataToPackagePrice.price * 1;
          temp.push(obj);
          t12 = t12.concat(temp);
          temp = [];
        }
      }

      //
      let total1;
      if (t1 && t1.length > 0) {
        total1 = t1.reduce(
          (accumulator, currentValue) => accumulator + currentValue
        );
      } else {
        total1 = 0;
      }
      //
      let total2;
      if (t2 && t2.length > 0) {
        total2 = t2.reduce(
          (accumulator, currentValue) => accumulator + currentValue
        );
      } else {
        total2 = 0;
      }

      let total3;
      if (t3 && t3.length > 0) {
        total3 = t3.reduce(
          (accumulator, currentValue) => accumulator + currentValue
        );
      } else {
        total3 = 0;
      }

      let total4;
      if (t4 && t4.length > 0) {
        total4 = t4.reduce(
          (accumulator, currentValue) => accumulator + currentValue
        );
      } else {
        total4 = 0;
      }

      let total5;
      if (t5 && t5.length > 0) {
        total5 = t5.reduce(
          (accumulator, currentValue) => accumulator + currentValue
        );
      } else {
        total5 = 0;
      }

      let total6;
      if (t6 && t6.length > 0) {
        total6 = t6.reduce(
          (accumulator, currentValue) => accumulator + currentValue
        );
      } else {
        total6 = 0;
      }

      let total7;
      if (t7 && t7.length > 0) {
        total7 = t7.reduce(
          (accumulator, currentValue) => accumulator + currentValue
        );
      } else {
        total7 = 0;
      }

      let total8;
      if (t8 && t8.length > 0) {
        total8 = t8.reduce(
          (accumulator, currentValue) => accumulator + currentValue
        );
      } else {
        total8 = 0;
      }

      let total9;
      if (t9 && t9.length > 0) {
        total9 = t9.reduce(
          (accumulator, currentValue) => accumulator + currentValue
        );
      } else {
        total9 = 0;
      }

      let total10;
      if (t10 && t10.length > 0) {
        total10 = t10.reduce(
          (accumulator, currentValue) => accumulator + currentValue
        );
      } else {
        total10 = 0;
      }

      let total11;
      if (t11 && t11.length > 0) {
        total11 = t11.reduce(
          (accumulator, currentValue) => accumulator + currentValue
        );
      } else {
        total11 = 0;
      }

      let total12;
      if (t12 && t12.length > 0) {
        total12 = t12.reduce(
          (accumulator, currentValue) => accumulator + currentValue
        );
      } else {
        total12 = 0;
      }

      console.log("total1:", total2);
      resolve({
        data: [
          total1,
          total2,
          total3,
          total4,
          total5,
          total6,
          total7,
          total8,
          total9,
          total10,
          total11,
          total12,
        ],
        datatest: getMoney,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getThongketheotuan: getThongketheotuan,
  getThongkeDoanhthu: getThongkeDoanhthu,
};
