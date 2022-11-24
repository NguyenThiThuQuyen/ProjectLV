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
      if (!data.sessionId) {
        resolve({
          code: 2,
          message: "Missing required parameters",
        });
      } else {
        let find = await db.EatTimeslot.findAll({
          where: {
            sessionId: data.sessionId,
          },
          raw: true,
          nest: true,
        });
        resolve(find);

        // if (find !== []) {
        //   for (let i = 0; i < find.length; i++) {
        //     let test = await getCountEatDetail(find[i].id);
        //     find[i].dadangky = test.data;
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

let getCountEatDetail = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let count = await db.EatDetail.count({
        where: {
          menuId: data.menuId,
          eatdateId: data.eatdateId,
          eatTimeslotId: data._eatTimeslotId,
        },
        raw: true,
      });
      resolve({
        code: 0,
        data: count,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getFindEatStimeslot = (data) => {
  console.log("data123", data);
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.obj.eatdateId || !data.obj.menuId) {
        resolve({
          code: 2,
          message: "Missing required parameters",
        });
      } else {
        let find = await db.EatDetail.findAll({
          where: {
            eatdateId: data.obj.eatdateId,
            menuId: data.obj.menuId,
          },
          // where: {
          //   eatdateId: data.eatdateId,
          //   menuId: data.menuId,
          // },
          include: [
            {
              model: db.EatTimeslot,
              as: "eatTimeslotDataToEatDetail",
              attributes: ["khunggioan", "sessionId", "id"],
            },
          ],
          raw: true,
          // nest: true,
        });

        // resolve(find);

        if (data.array && find) {
          for (let i = 0; i < find.length; i++) {
            for (let j = 0; j < data.array.length; j++) {
              if (data.array[j].id.toString() === find[i].eatTimeslotId) {
                data.array[j].checkTimes = true;
              }
            }
          }
          resolve(data.array);
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllEatTimeslots: getAllEatTimeslots,
  getAllFindEatTimeslotsToSession: getAllFindEatTimeslotsToSession,
  getCountEatDetail: getCountEatDetail,
  getFindEatStimeslot: getFindEatStimeslot,
};
