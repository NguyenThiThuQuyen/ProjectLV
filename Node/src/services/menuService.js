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
        data: chitietan,
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
          raw: true,
        });
        let chitietan = await db.EatDetail.findOne({
          where: { menuId: data.id },
          raw: true,
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

let findMenuToPrescription = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.menuId) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters",
        });
      } else {
        let find = await db.Prescription.findOne({
          where: {
            menuId: data.menuId,
          },
          raw: true,
        });
        console.log("find 123:", find);
        resolve(find);
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewMenuEatDetail: createNewMenuEatDetail,
  updateMenu: updateMenu,
  findMenuToPrescription: findMenuToPrescription,
};
