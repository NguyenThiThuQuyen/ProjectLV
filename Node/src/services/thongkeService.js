const db = require("../models/index");
const moment = require("moment");

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

module.exports = {
  getThongketheotuan: getThongketheotuan,
};
