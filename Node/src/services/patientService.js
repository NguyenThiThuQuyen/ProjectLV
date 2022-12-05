const db = require("../models/index");

let getAllPatient = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let patients = {};
      patients = await db.Patient.findAll({
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: db.Parent,
            as: "parentDataToPatient",
            attributes: ["name", "email", "phone", "address", "gender", "id"],
          },
          {
            model: db.Allcode,
            as: "genderDataToPatient",
            attributes: ["value", "keyMap", "type"],
          },
        ],
      });
      resolve(patients);
    } catch (e) {
      reject(e);
    }
  });
};

let createNewPatient = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Patient.create({
        childrentName: data.childrentName,
        gender: data.gender,
        birthday: data.birthday,
        image: data.image,
        parentId: data.parentId,
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

let updatePatientData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          code: 2,
          message: "err",
        });
      } else {
        let patient1 = await db.Patient.findOne({
          where: { id: data.id },
        });
        if (patient1) {
          let day = new Date(data.birthday);
          patient1.childrentName = data.childrentName;
          patient1.birthday = day;
          patient1.image = data.image;
          patient1.gender = data.gender;
          patient1.parentId = data.parentId;
          await patient1.save();
          resolve({
            code: 0,
            message: "Cập nhật thành công!",
          });
        } else {
          resolve({
            code: 1,
            message: `Không tìm thấy người dùng!`,
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deletePatient = (patientId) => {
  return new Promise(async (resolve, reject) => {
    let found = await db.Patient.findOne({
      where: { id: patientId },
    });
    if (!found) {
      resolve({
        code: 2,
        message: `Người dùng không tồn tại`,
      });
    }
    await db.Patient.destroy({
      where: { id: patientId },
    });
    resolve({
      code: 0,
      message: `Đã xóa thành công`,
    });
  });
};

let getPatient = (patientId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let patient = "";
      if (patientId && patientId !== "ALL") {
        patient = await db.Patient.findOne({
          where: { id: patientId },
          include: [
            {
              model: db.Parent,
              as: "parentDataToPatient",
              attributes: ["name", "email", "phone", "address", "gender", "id"],
            },
            {
              model: db.Allcode,
              as: "genderDataToPatient",
              attributes: ["value", "keyMap", "type"],
            },
          ],
        });
      }
      resolve(patient);
    } catch (e) {
      reject(e);
    }
  });
};

let getSearchParentById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let search = await db.Patient.findAll({
        where: { parentId: id },
        include: [
          {
            model: db.Parent,
            as: "parentDataToPatient",
            attributes: ["id", "email", "name", "address", "phone"],
          },
        ],
        raw: true,
        nest: true,
      });
      if (search) {
        resolve(search);
      } else {
        resolve({
          code: 1,
          message: `Error không `,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllPatientToIdParent = (parentId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let findparentId = "";
      findparentId = await db.Patient.findAll({
        where: { parentId: parentId },
        include: [
          {
            model: db.Parent,
            as: "parentDataToPatient",
            attributes: ["name", "email", "phone", "address", "gender", "id"],
          },
          {
            model: db.Allcode,
            as: "genderDataToPatient",
            attributes: ["value", "keyMap", "type"],
          },
        ],
      });

      resolve(findparentId);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewPatient: createNewPatient,
  getAllPatient: getAllPatient,
  updatePatientData: updatePatientData,
  deletePatient: deletePatient,
  getPatient: getPatient,
  getSearchParentById: getSearchParentById,
  getAllPatientToIdParent: getAllPatientToIdParent,
};
