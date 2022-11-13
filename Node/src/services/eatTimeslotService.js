const db = require("../models/index");

let getAllEatTimeslots = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let eatTimeslot = {};
      eatTimeslot = await db.EatTimeslot.findAll();
      resolve(eatTimeslot);
    } catch (e) {
      reject(e);
    }
  });
};

let getAllFindEatTimeslotsToSession = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data) {
        resolve({
          code: 2,
          message: "Missing required parameters",
        });
      } else {
        let find = await db.EatTimeslot.findAll({
          where: {
            sessionId: data,
          },
          raw: true,
        });
        resolve(find);
        // console.log("find", find.length);
        // if (find !== []) {
        //   for (let i = 0; i < find.length; i++) {
        //     let test = await getCountEatDetail(find[i].id);
        //     find[i].sldatlich = test.data;
        //   }
        //   resolve({
        //     code: 0,
        //     data: find,
        //   });
        // }
      }
    } catch (e) {
      reject(e);
    }
  });
};

// let getCountEatDetail = (data) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let count = await db.EatDetail.count({
//         where: {
//           menuId: data.menuId,
//           eatdateId: data.eatdateId,
//           eatTimeslotId: data.eatTimeslotId,
//         },
//         raw: true,
//       });
//       resolve({
//         code: 0,
//         data: count,
//       });
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

let getFindEatStimeslot = (data, array) => {
  return new Promise(async (resolve, reject) => {
    try {
      let find = await db.EatDetail.findAll({
        where: {
          eatdateId: data.eatdateId,
          menuId: data.menuId,
        },
        include: [
          {
            model: db.EatTimeslot,
            as: "eatTimeslotDataToEatDetail",
            attributes: ["khunggioan", "sessionId", "id"],
          },
        ],
        raw: true,
        nest: true,
      });
      if (array && find) {
        for (let i = 0; i < find.length; i++) {
          for (let j = 0; j < array.length; j++) {
            if (array[j].eatTimeslotId === find[i].id.toString()) {
              array[j].checkTimes = true;
            }
          }
        }
        resolve(array);
      }
      resolve({
        code: 0,
        data: find,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllEatTimeslots: getAllEatTimeslots,
  getAllFindEatTimeslotsToSession: getAllFindEatTimeslotsToSession,
  // getCountEatDetail: getCountEatDetail,
  getFindEatStimeslot: getFindEatStimeslot,
};
