const db = require("../models/index");
let createNewMenuEatDetail = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let menu = await db.Menu.create({
        name: data.name,
      });

      let chitietan = await db.EatDetail.create({
        gioan: data.gioan,
        huongdanan: data.huongdanan,
        solan: data.solan,
        ghichu: data.ghichu,
        menuId: menu.id,
        dishId: data.dishId,
        eatdateId: data.eatdateId,
      });
      resolve({
        code: 0,
        message: "Tạo thành công !",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let updateMenu = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          code: 2,
          message: "Lỗi!",
        });
      } else {
        let menu = await db.Menu.findOne({
          where: { id: data.id },
          raw: false,
        });
        let chitietan = await db.EatDetail.findOne({
          where: { menuId: data.id },
          raw: false,
        });

        if (menu) {
          menu.name = data.name;
          await menu.save();
        }

        if (chitietan) {
          chitietan.gioan = data.gioan;
          chitietan.huongdanan = data.huongdanan;
          chitietan.solan = data.solan;
          chitietan.ghichu = data.ghichu;
          chitietan.dishId = data.dishId;
          chitietan.eatdateId = data.eatdateId;
          await chitietan.save();
        }
        resolve({
          errCode: 0,
          message: "Cập nhật thành công!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewMenuEatDetail: createNewMenuEatDetail,
  updateMenu: updateMenu,
};
