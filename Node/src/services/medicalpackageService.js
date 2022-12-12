const db = require("../models/index");

let findPrice = (priceId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let find = await db.PackagePrice.findAll({
        where: { medicalpackageId: priceId },
      });
      if (find) {
        resolve(find);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllGoiKham = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let goikhamArr = [];
      let goikham = [];
      goikham = await db.MedicalPackage.findAll({
        // order: [["updatedAt", "DESC"]],
        raw: true,
        nest: true,
      });
      if (goikham && goikham.length > 0) {
        goikham.map(async (item) => {
          // console.log("item", item.id);
          let obj = {};
          // obj.pushId = item.id;
          // goikhamArr.push(obj)

          let check = [];
          check = await db.PackagePrice.findAll({
            where: { medicalpackageId: item.id },
            order: [["updatedAt", "DESC"]],
            // include: [
            //   {
            //     model: db.MedicalPackage,
            //     as: "medicalPackageDataToPackagePrice",
            //   },
            // ],
          });
          // obj.pushId = check;
          // goikhamArr.push(obj);
          console.log("new price", check[0]?.price, check[0].medicalpackageId);
          item.newprice = check[0]?.price;
          // resolve(check);
          resolve(goikham);
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getMedicalPackage = (goikhamId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let goikham = "";
      if (goikhamId && goikhamId !== "ALL") {
        goikham = await db.MedicalPackage.findOne({
          where: { id: goikhamId },
          // include: [
          //   {
          //     model: db.PackagePrice,
          //     order: [["updatedAt", "DESC"]],
          //     as: "medicalPackageDataToPackagePrice",
          //     attributes: ["price", "applydateId", "id"],
          //   },
          // ],
          raw: true,
          nest: true,
        });

        let check = await db.PackagePrice.findAll({
          where: { medicalpackageId: goikhamId },
          order: [["updatedAt", "DESC"]],
          include: [
            {
              model: db.MedicalPackage,
              as: "medicalPackageDataToPackagePrice",
            },
          ],
        });
        resolve(check);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let checkNamePackage = (goikham) => {
  return new Promise(async (resolve, reject) => {
    try {
      let name = await db.MedicalPackage.findOne({
        where: { packageName: goikham },
      });
      if (name) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let createNewMedicalpackage = (data) => {
  console.log("data:", data);
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkNamePackage(data.packageName);
      if (check === true) {
        resolve({
          code: 1,
          message: `Tên đã tồn tại, vui lòng nhập lại!`,
        });
      } else {
        let goikham = await db.MedicalPackage.create({
          packageName: data.packageName,
          packageDecs: data.packageDecs,
          detailDecs: data.detailDecs,
          image: data.image,
          contentHTML: data.contentHTML,
          contentMarkdown: data.contentMarkdown,
        });

        let giagoikham = await db.PackagePrice.create({
          price: data.price,
          applydateId: data.applydateId,
          medicalpackageId: goikham.id,
        });
        resolve({
          code: 0,
          message: "Thêm thành công!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let updateGoiKham = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          code: 2,
          message: "Lỗi!",
        });
      } else {
        let goiKham = await db.MedicalPackage.findOne({
          where: { id: data.id },
        });
        let giagoikham = await db.PackagePrice.findOne({
          where: { medicalpackageId: data.id },
        });

        if (goiKham) {
          goiKham.packageName = data.packageName;
          goiKham.packageDecs = data.packageDecs;
          goiKham.detailDecs = data.detailDecs;
          goiKham.image = data.image;
          goiKham.contentHTML = data.contentHTML;
          goiKham.contentMarkdown = data.contentMarkdown;
          await goiKham.save();
        }

        // if (giagoikham) {
        let giagk = await db.PackagePrice.create({
          price: data.price,
          applydateId: data.applydateId,
          medicalpackageId: goiKham.id,
        });
        // giagoikham.price = data.price;
        // giagoikham.applydateId = data.applydateId;
        // giagoikham.medicalpackageId = data.medicalpackageId;
        // await giagoikham.create();
        // }
        resolve({
          code: 0,
          message: "Cập nhật thành công!",
        });

        // let giagoikham = await db.PackagePrice.create({
        //   price: data.price,
        //   applydateId: data.applydateId,
        //   medicalpackageId: goikham.id,
        // });
        // resolve({
        //   code: 0,
        //   message: "Thêm thành công!",
        // })
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteGoiKham = (goiKhamId) => {
  return new Promise(async (resolve, reject) => {
    let timGoiKham = await db.MedicalPackage.findOne({
      where: { id: goiKhamId },
    });
    if (!timGoiKham) {
      resolve({
        code: 2,
        message: `Gói khám không tồn tại! `,
      });
    }
    await db.MedicalPackage.destroy({
      where: { id: goiKhamId },
    });
    resolve({
      code: 0,
      message: `Xóa gói khám thành công!`,
    });
  });
};

let getAllMedicalPackageHome = (limitInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (limitInput !== "ALL") {
        let goikham = await db.MedicalPackage.findAll({
          limit: +limitInput,
          order: [["updatedAt", "DESC"]],
        });
        resolve({
          code: 0,
          data: goikham,
        });
      } else {
        let goikham = await db.MedicalPackage.findAll({
          order: [["updatedAt", "DESC"]],
        });
        resolve({
          code: 0,
          data: goikham,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

// let getAllMedicalPackageHomeAll = (limitInput) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let goikham = await db.MedicalPackage.findAll({
//         limit: limitInput,
//       });
//       resolve({
//         code: 0,
//         data: goikham,
//       });
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

module.exports = {
  createNewMedicalpackage: createNewMedicalpackage,
  updateGoiKham: updateGoiKham,
  deleteGoiKham: deleteGoiKham,
  getAllGoiKham: getAllGoiKham,
  getAllMedicalPackageHome: getAllMedicalPackageHome,
  getMedicalPackage: getMedicalPackage,
  // getAllMedicalPackageHomeAll: getAllMedicalPackageHomeAll,
};
