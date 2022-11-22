const db = require("../models/index");

let getSearch = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let arrSearch = [];
      let doctor = await db.User.findAll({
        where: { roleId: "R2" },
      });
      let service = await db.MedicalPackage.findAll({});
      if (doctor && doctor.length > 0) {
        doctor.map((item) => {
          let obj = {};
          obj.link = `/detail-doctor/${item.id}`;
          obj.title = item.name;
          obj.img = item.image;

          arrSearch.push(obj);
        });
      }
      if (service && service.length > 0) {
        service.map((item) => {
          let obj = {};
          obj.link = `/detail-service/${item.id}`;
          obj.title = item.packageName;
          obj.img = item.image;

          arrSearch.push(obj);
        });
      }
      resolve(arrSearch);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getSearch: getSearch,
};
