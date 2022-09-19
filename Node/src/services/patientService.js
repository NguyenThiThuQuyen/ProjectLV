const db = require("../models/index");

let getAllPatient = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let patients = {};
      patients = await db.Patient.findAll({
        include: [
          {
            model: db.Parent,
            as: "parentDataToPatient",
            attributes: ["name", "email", "phone", "id"],
          },
          {
            model: db.Gender,
            as: "genderDataToPatient",
            attributes: ["gender", "id"],
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
        genderId: data.genderId,
        birthday: data.birthday,
        address: data.address,
        image: data.image,
        parentId: data.parentId,
      });
      resolve({
        code: 0,
        message: "success",
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
        console.log("check ", data);
        resolve({
          code: 2,
          message: "err",
        });
      } else {
        let patient = await db.Patient.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (patient) {
          patient.childrentName = data.childrentName;
          patient.address = data.address;
          patient.birthday = data.birthday;
          patient.image = data.image;
          patient.genderId = data.genderId;
          patient.parentId = data.parentId;
          await patient.save();
          resolve({
            code: 0,
            message: "Cập nhật thông tin người dùng thành công!",
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
      message: `Đã xóa người dùng`,
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
              attributes: ["name", "email", "phone", "id"],
            },
            {
              model: db.Gender,
              as: "genderDataToPatient",
              attributes: ["gender", "id"],
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

module.exports = {
  createNewPatient: createNewPatient,
  getAllPatient: getAllPatient,
  updatePatientData: updatePatientData,
  deletePatient: deletePatient,
  getPatient: getPatient,
};
