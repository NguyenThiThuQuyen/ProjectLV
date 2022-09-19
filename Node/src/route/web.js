const express = require("express");
const homeController = require("../controllers/homeController");
const userController = require("../controllers/userController");
const medicalpackageController = require("../controllers/medicalpackageController");
const medicaltypeController = require("../controllers/medicaltypeController");
const medicalController = require("../controllers/medicalController");
const patientController = require("../controllers/patientController");
const roleController = require("../controllers/roleController");
const genderController = require("../controllers/genderController");
const donvitinhController = require("../controllers/donvitinhController");
const nhacungcapController = require("../controllers/nhacungcapController");
const parentController = require("../controllers/parentController");
const dishController = require("../controllers/dishController");
const prescriptionController = require("../controllers/prescriptionController");

const { Router } = require("express");

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.post("/api/login", userController.handleLogin);

  // role
  router.get("/api/get-all-roles", roleController.handleGetAllRoles);

  // gender
  router.get("/api/get-all-genders", genderController.handleGetAllGenders);

  // user
  router.get("/api/get-user", userController.handleGetUser);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);

  // patient
  router.get("/api/get-patient", patientController.handleGetPatient);
  router.get("/api/get-all-patients", patientController.handleGetAllPatients);
  router.post(
    "/api/create-new-patient",
    patientController.handleCreateNewPatient
  );
  router.put("/api/edit-patient", patientController.handleEditPatient);
  router.delete("/api/delete-patient", patientController.handleDeletePatient);

  // phu huynh
  router.get("/api/get-all-parents", parentController.handleGetAllParents);
  router.post("/api/create-new-parent", parentController.handleCreateParent);
  router.put("/api/edit-parent", parentController.handleEditParent);
  router.delete("/api/delete-parent", parentController.handleDeleteParent);

  // goi kham
  router.get(
    "/api/get-all-medicalpackages",
    medicalpackageController.handleGetAllGoiKham
  );
  router.post(
    "/api/create-new-medicalpackage",
    medicalpackageController.handleGoiKham
  );
  router.put(
    "/api/edit-medicalpackage",
    medicalpackageController.handleEditGoiKham
  );
  router.delete(
    "/api/delete-medicalpackage",
    medicalpackageController.handleDeleteGoiKham
  );

  //loai thuoc
  router.get(
    "/api/get-all-medicaltypes",
    medicaltypeController.handleGetAllMedicalTypes
  );
  router.post(
    "/api/create-new-medicaltype",
    medicaltypeController.handleCreateMedicalType
  );
  router.put(
    "/api/edit-medicaltype",
    medicaltypeController.handleEditMedicalType
  );
  router.delete(
    "/api/delete-medicaltype",
    medicaltypeController.handleDeleteMedicalType
  );

  //thuoc
  router.get("/api/get-all-medicals", medicalController.handleGetAllMedicals);
  router.post("/api/create-new-medical", medicalController.handleCreateMedical);
  router.put("/api/edit-medical", medicalController.handleEditMedical);
  router.delete("/api/delete-medical", medicalController.handleDeleteMedical);

  //mon an
  router.get("/api/get-all-dishes", dishController.handleGetAllDishes);
  router.post("/api/create-new-dish", dishController.handleCreateDish);
  router.put("/api/edit-dish", dishController.handleEditDish);
  router.delete("/api/delete-dish", dishController.handleDeleteDish);

  //toa thuoc
  router.get(
    "/api/get-all-prescriptions",
    prescriptionController.handleGetAllPrescriptions
  );
  router.post(
    "/api/create-new-prescription",
    prescriptionController.handleCreatePrescription
  );
  router.put(
    "/api/edit-prescription",
    prescriptionController.handleEditPrescription
  );
  router.delete(
    "/api/delete-prescription",
    prescriptionController.handleDeletePrescription
  );

  // đơn vị tính
  router.get(
    "/api/get-all-donvitinh",
    donvitinhController.handleGetAllDonViTinh
  );

  // nha cung cap
  router.get("/api/get-all-ncc", nhacungcapController.handleGetAllNhaCungCap);

  return app.use("/", router);
};

module.exports = initWebRoutes;
