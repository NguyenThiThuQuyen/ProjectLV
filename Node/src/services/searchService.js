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

let getSearchAdmin = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let arrSearch = [];
      let user = await db.User.findAll({
        // where: { roleId: "R2" },
      });
      // let service = await db.MedicalPackage.findAll({});
      if (user && user.length > 0) {
        user.map((item) => {
          let obj = {};
          obj.link = `/manager/user-detail-manager/${item.id}`;
          obj.title = item.name;
          // obj.img = item.image;
          arrSearch.push(obj);
        });
      }

      let patient = await db.Patient.findAll({});
      if (patient && patient.length > 0) {
        patient.map((item) => {
          let obj = {};
          obj.link = `/manager/patient-detail-manager/${item.id}`;
          obj.title = item.childrentName;
          // obj.img = item.image;
          arrSearch.push(obj);
        });
      }

      let parent = await db.Parent.findAll({});
      if (parent && parent.length > 0) {
        parent.map((item) => {
          let obj = {};
          obj.link = `/manager/parent-detail/${item.id}`;
          obj.title = item.name;
          // obj.img = item.image;
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
  getSearchAdmin: getSearchAdmin,
};
