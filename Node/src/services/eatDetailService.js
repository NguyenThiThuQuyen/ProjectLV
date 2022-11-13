const db = require("../models/index");

let findEatDetailToDate = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.eatdateId && !data.menuId) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters",
        });
      } else if (data.menuId && !data.eatdateId) {
        let find = await db.EatDetail.findAll({
          where: {
            menuId: data.menuId,
          },
          attributes: [
            "huongdanan",
            "solan",
            "ghichu",
            "dishId",
            "eatdateId",
            "eatTimeslotId",
            "id",
          ],
          include: [
            {
              model: db.EatTimeslot,
              as: "eatTimeslotDataToEatDetail",
              attributes: ["khunggioan", "sessionId", "id"],
              include: [
                {
                  model: db.Session,
                  as: "sessionDataToEatTimeslot",
                  attributes: ["name", "id"],
                },
              ],
            },
            {
              model: db.EatDate,
              as: "eatDateDataToEatDetail",
              attributes: ["eatdate", "id"],
            },
            {
              model: db.Menu,
              as: "menuDataToEatDetail",
              attributes: ["name", "id"],
            },
            {
              model: db.Dish,
              as: "dishDataToEatDetail",
              attributes: [
                "name",
                "contentHTML",
                "contentMarkdown",
                "categoryId",
                "id",
              ],
              include: [
                {
                  model: db.Category,
                  as: "categoryDataToDish",
                  attributes: ["name", "id"],
                },
              ],
            },
          ],

          raw: true,
          nest: true,
        });
        resolve(find);
      } else if (data.menuId && data.eatdateId) {
        let find = await db.EatDetail.findAll({
          where: {
            eatdateId: data.eatdateId,
            menuId: data.menuId,
          },
          attributes: [
            "huongdanan",
            "solan",
            "ghichu",
            "dishId",
            "eatdateId",
            "eatTimeslotId",
            "id",
          ],
          include: [
            {
              model: db.EatTimeslot,
              as: "eatTimeslotDataToEatDetail",
              attributes: ["khunggioan", "sessionId", "id"],
              include: [
                {
                  model: db.Session,
                  as: "sessionDataToEatTimeslot",
                  attributes: ["name", "id"],
                },
              ],
            },
            {
              model: db.EatDate,
              as: "eatDateDataToEatDetail",
              attributes: ["eatdate", "id"],
            },
            {
              model: db.Menu,
              as: "menuDataToEatDetail",
              attributes: ["name", "id"],
            },
            {
              model: db.Dish,
              as: "dishDataToEatDetail",
              attributes: [
                "name",
                "contentHTML",
                "contentMarkdown",
                "categoryId",
                "id",
              ],
              include: [
                {
                  model: db.Category,
                  as: "categoryDataToDish",
                  attributes: ["name", "id"],
                },
              ],
            },
          ],

          raw: true,
          nest: true,
        });
        resolve(find);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let createNewEatDetail = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.EatDetail.create({
        huongdanan: data.huongdanan,
        solan: data.solan,
        ghichu: data.ghichu,
        menuId: data.menuId,
        dishId: data.dishId,
        eatdateId: data.eatdateId,
        eatTimeslotId: data.eatTimeslotId,
      });
      resolve({
        code: 0,
        message: "Thêm thành công!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let findEatDate = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.eatdateId) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters",
        });
      } else {
        let find = await db.EatDetail.findAll({
          where: {
            eatdateId: data.eatdateId,
          },
          attributes: [
            "huongdanan",
            "solan",
            "ghichu",
            "dishId",
            "eatdateId",
            "eatTimeslotId",
            "id",
          ],
          raw: true,
          nest: true,
        });
        resolve(find);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteEatDetail = (id) => {
  return new Promise(async (resolve, reject) => {
    let found = await db.EatDetail.findOne({
      where: { id: id },
    });
    if (!found) {
      resolve({
        code: 2,
        message: `Chi tiết không tồn tại`,
      });
    }
    await db.EatDetail.destroy({
      where: { id: id },
    });
    resolve({
      code: 0,
      message: `Đã xóa thành công`,
    });
  });
};

module.exports = {
  findEatDetailToDate: findEatDetailToDate,
  createNewEatDetail: createNewEatDetail,
  findEatDate: findEatDate,
  deleteEatDetail: deleteEatDetail,
};
