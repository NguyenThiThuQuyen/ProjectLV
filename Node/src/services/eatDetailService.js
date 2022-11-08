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
            "gioan",
            "huongdanan",
            "solan",
            "ghichu",
            "dishId",
            "eatdateId",
            "id",
          ],
          include: [
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
            "gioan",
            "huongdanan",
            "solan",
            "ghichu",
            "dishId",
            "eatdateId",
            "id",
          ],
          include: [
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
        gioan: data.gioan,
        huongdanan: data.huongdanan,
        solan: data.solan,
        ghichu: data.ghichu,
        menuId: data.menuId,
        dishId: data.dishId,
        eatdateId: data.eatdateId,
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

module.exports = {
  findEatDetailToDate: findEatDetailToDate,
  createNewEatDetail: createNewEatDetail,
};
