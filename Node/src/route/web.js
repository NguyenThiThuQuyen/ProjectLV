const express = require("express");
const homeController = require("../controllers/homeController");
const userController = require("../controllers/userController");
const medicalpackageController = require("../controllers/medicalpackageController");
const medicaltypeController = require("../controllers/medicaltypeController");
const medicalController = require("../controllers/medicalController");
const patientController = require("../controllers/patientController");
const donvitinhController = require("../controllers/donvitinhController");
const nhacungcapController = require("../controllers/nhacungcapController");
const parentController = require("../controllers/parentController");
const dishController = require("../controllers/dishController");
const prescriptionController = require("../controllers/prescriptionController");
const packagePriceController = require("../controllers/packagePriceController");
const doctorController = require("../controllers/doctorController");
const timeSlotController = require("../controllers/timeSlotController");
const scheduleController = require("../controllers/scheduleController");
const phieudatchoController = require("../controllers/phieudatchoController");
const menuController = require("../controllers/menuController");
const eatdateController = require("../controllers/eatdateController");
const categoryController = require("../controllers/categoryController");
const eatDetailController = require("../controllers/eatDetailController");
const sessionController = require("../controllers/sessionController");
const eatTimeslotController = require("../controllers/eatTimeslotController");
const thongkeController = require("../controllers/thongkeController");
const receiptController = require("../controllers/receiptController");
const searchController = require("../controllers/searchController");
const prescriptionDetailController = require("../controllers/prescriptionDetailController");
const newsController = require("../controllers/newsController");

const { Router } = require("express");

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);

  router.get("/api/check-sua-lich", doctorController.checksualichbacsi); //// api n??y true l?? cho s???a false l?? ko cho s???a
  router.get("/api/check-them-lich", doctorController.checkthemlichbacsi);

  // tin t???c
  router.get("/api/get-news", newsController.handleGetNews);
  router.get("/api/get-all-news", newsController.handleGetAllNews);
  router.post("/api/create-news", newsController.handleCreateNews);
  router.put("/api/edit-news", newsController.handleEditNews);
  router.delete("/api/delete-news", newsController.handleDeleteNews);

  //
  router.get(
    "/api/find-prescription",
    prescriptionController.handleFindPrescription
  );

  // l???ch s??? t?? v???n
  router.get("/api/consult-history", phieudatchoController.handleFindHistory);

  // t??m ki???m
  // ng?????i d??ng
  router.get("/api/search", searchController.handleSearch);
  // admin
  router.get("/api/search-admin", searchController.handleSearchAdmin);

  // h??a ????n
  // router.get("/api/get-all-receipt", receiptController.handleGetAllReceipt);
  router.get("/api/get-a-receipt", receiptController.handleGetReceipt);
  router.post("/api/create-receipt", receiptController.handleCreateReceipt);
  router.get(
    "/api/find-all-phieudatcho-in-receipt",
    receiptController.handleFindReservationTicketInReceipt
  );

  // thongke
  router.get(
    "/api/get-thongke-theo-tuan",
    thongkeController.handleThongketheotuan
  );
  router.get(
    "/api/get-thongke-doanh-thu",
    thongkeController.handleThongkeDoanhthu
  );

  // t??m khung gi??? trong chi ti???t ??n theo ng??y ??n v?? menuId
  router.post(
    "/api/find-eat-timeslot",
    eatTimeslotController.handleFindEatStimeslot
  );

  // ?????m chi ti???t ??n theo khung gi??? ??n, ng??y ??n v?? menuId
  router.post(
    "/api/count-eat-detail",
    eatTimeslotController.handleCountEatDetail
  );

  // tim danh muc theo id menu
  router.get(
    "/api/get-find-category-in-menuId",
    categoryController.handleGetFindCateInMenuId
  );

  // lay tat ca buoi
  router.get("/api/get-all-sessions", sessionController.handleGetAllSessions);

  // lay tat ca khung gio an
  router.get(
    "/api/get-all-eat-timeslots",
    eatTimeslotController.handleGetAllEatTimeslots
  );

  // lay tat ca khung gio an theo buoi
  router.post(
    "/api/get-find-all-eattimeslots-to-sessions",
    eatTimeslotController.handleGetAllFindEatTimeslotsToSession
  );

  // dang nhap bac si, admin
  router.post("/api/login", userController.handleLogin);

  // dang nhap benh nhan
  router.post("/api/login-parent", parentController.handleLoginParent);

  router.get("/api/allcode", userController.getAllCode);

  // homepage
  // get doctor
  router.get("/api/all-doctor-home", doctorController.handleGetAllDoctorHome);

  // get medical package
  router.get(
    "/api/all-medicalpackage-home",
    medicalpackageController.handleGetAllMedicalPackageHome
  );

  // router.get(
  //   "/api/all-medicalpackage-home-all",
  //   medicalpackageController.handleGetAllMedicalPackageHomeAll
  // );

  router.post("/api/save-infor-doctor", doctorController.postInforDoctor);
  router.get("/api/check-dat-lich", doctorController.checklichbacsi);
  router.post("/api/bulk-create-schedule", doctorController.bulkCreateSchedule);
  router.post(
    "/api/get-schedule-doctor-by-date",
    doctorController.getScheduleByDate
  );

  // danh muc mon an
  router.get(
    "/api/get-all-categories",
    categoryController.handleGetAllCategories
  );
  router.post(
    "/api/create-new-category",
    categoryController.handleCreateNewCategory
  );
  router.put("/api/edit-category", categoryController.handleEditCategory);
  router.delete(
    "/api/delete-category",
    categoryController.handleDeleteCategory
  );

  // menu
  // router.get("/api/get-a-menu", menuController.handleGetAMenu);
  // router.get("/api/get-all-menus", menuController.handleGetAllMenus);
  router.post(
    "/api/create-new-menu-eatdetail",
    menuController.handleCreateNewMenuEatDetail
  );
  router.put("/api/edit-menu", menuController.handleEditMenu);
  // router.delete("/api/delete-menu", menuController.handleDeleteMenu);

  // ng??y ??n
  router.post("/api/get-all-eatdates", eatdateController.handleGetAllEatDates);

  // t??m
  router.post(
    "/api/find-lich-theo-ngay",
    phieudatchoController.handleFindLichTheoNgay
  );

  // t??m m??n ??n theo danh m???c
  router.get("/api/find-dish-to-cate", dishController.handleFindDishToCate);

  // t??m id phieu dat cho trong toa thuoc
  router.post(
    "/api/find-id-phieudatcho-in-prescription",
    prescriptionController.handleFindPhieuDatChoInPrescription
  );

  // t??m th???c ????n theo toa thu???c
  router.post(
    "/api/find-menu-to-prescription",
    menuController.handleFindMenuToPrescription
  );

  // t??m chi ti???t ??n theo ng??y v?? menuId
  router.post(
    "/api/find-eat-detail-to-date",
    eatDetailController.handleFindEatDetailToDate
  );

  // t??m chi ti???t ??n theo ng??y
  router.post("/api/find-eat-date", eatDetailController.handleFindEatDate);

  // t???o chi ti???t
  router.post(
    "/api/create-eat-detail",
    eatDetailController.handleCreateEatDetail
  );
  // x??a chi ti???t
  router.delete(
    "/api/delete-eat-detail",
    eatDetailController.handleDeleteEatDetail
  );

  router.get("/api/find-patient", parentController.handleFindPatient);
  // t??m all bac si
  router.get("/api/get-doctor", scheduleController.handleFindDoctor);
  router.post("/api/get-find-email", phieudatchoController.handleEmail);
  // t??m l???ch theo b??o s??
  router.get(
    "/api/find-schedule-to-doctor",
    scheduleController.handleFindSchedule
  );
  // t??m khung gi??? theo ng??y
  router.post(
    "/api/find-timeslot-to-date",
    scheduleController.handleFindTimeslot
  );
  // t??m id l???ch t?? v???n theo ng??y, khung gi???, b??c s??
  router.post("/api/find-id-schedule", scheduleController.handleFindIdSchedule);

  // dem so luong lich da dang ky
  router.get("/api/count-schedule", scheduleController.handleCountSchedule);

  // user
  router.get("/api/get-user", userController.handleGetUser);
  router.post("/api/get-user-markdown", userController.handleGetUserMarkdown);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);

  // patient

  router.get(
    "/api/get-all-patient-to-parentId",
    patientController.handleGetAllPatientToIdParent
  );
  router.get("/api/get-patient", patientController.handleGetPatient);
  router.get("/api/get-all-patients", patientController.handleGetAllPatients);
  router.get(
    "/api/search-parentid-to-patient",
    patientController.handleSearchParent
  );
  router.post(
    "/api/create-new-patient",
    patientController.handleCreateNewPatient
  );
  router.put("/api/edit-patient", patientController.handleEditPatient);
  router.delete("/api/delete-patient", patientController.handleDeletePatient);

  // phu huynh

  // t??m th??ng tin ba m??? v?? con theo email
  // router.post(
  //   "/api/create-new-parent-patient",
  //   parentController.handleCreateNewParentPatient
  // );

  router.post(
    "/api/create-new-parent-patient",
    parentController.handleCreateNewParentPatient
  );
  router.get("/api/get-all-parents", parentController.handleGetAllParents);
  router.get("/api/get-parent", parentController.handleGetParent);
  router.post("/api/create-new-parent", parentController.handleCreateParent);
  router.put("/api/edit-parent", parentController.handleEditParent);
  router.delete("/api/delete-parent", parentController.handleDeleteParent);

  // phieu dat cho
  router.get(
    "/api/get-all-phieudatcho",
    phieudatchoController.handleGetAllPhieudatcho
  );
  router.get(
    "/api/get-phieudatcho",
    phieudatchoController.handleGetPhieudatcho
  );
  router.post(
    "/api/create-new-phieudatcho",
    phieudatchoController.handleCreatePhieudatcho
  );
  router.put(
    "/api/edit-phieudatcho",
    phieudatchoController.handleEditPhieudatcho
  );
  router.delete(
    "/api/delete-phieudatcho",
    phieudatchoController.handleDeletePhieudatcho
  );

  // lich tu van
  router.get(
    "/api/get-all-schedules",
    scheduleController.handleGetAllSchedules
  );
  router.get("/api/get-schedule", scheduleController.handleGetSchedules);
  router.post(
    "/api/create-new-schedule",
    scheduleController.handleCreateSchedule
  );
  router.put("/api/edit-schedule", scheduleController.handleEditSchedule);
  router.delete(
    "/api/delete-schedule",
    scheduleController.handleDeleteSchedule
  );

  // khung gio
  router.get("/api/get-timeslot", timeSlotController.handleGetATimeslot);
  router.get(
    "/api/get-all-timeslots",
    timeSlotController.handleGetAllTimeslots
  );
  router.post(
    "/api/create-new-timeslot",
    timeSlotController.handleCreateTimeslot
  );
  router.put("/api/edit-timeslot", timeSlotController.handleEditTimeslot);
  router.delete(
    "/api/delete-timeslot",
    timeSlotController.handleDeleteTimeslot
  );

  // gia goi kham
  router.get("/api/get-all-prices", packagePriceController.handleGetAllPrices);
  router.post(
    "/api/create-new-price",
    packagePriceController.handleCreatePrice
  );

  // goi kham
  router.get(
    "/api/get-medicalpackage",
    medicalpackageController.handleGetGoiKham
  );
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
  router.get("/api/get-dish", dishController.handleGetDish);
  router.post("/api/create-new-dish", dishController.handleCreateDish);
  router.put("/api/edit-dish", dishController.handleEditDish);
  router.delete("/api/delete-dish", dishController.handleDeleteDish);

  //toa thuoc
  router.get(
    "/api/get-all-prescriptions",
    prescriptionController.handleGetAllPrescriptions
  );
  router.get(
    "/api/get-prescription",
    prescriptionController.handleGetPrescription
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

  //chi tiet toa thuoc
  router.get(
    "/api/get-all-prescriptions-detail",
    prescriptionDetailController.handleGetAllPrescriptionDetail
  );
  router.get(
    "/api/get-prescription-detail",
    prescriptionDetailController.handleGetPrescriptionDetail
  );
  router.post(
    "/api/create-new-prescription-detail",
    prescriptionDetailController.handleCreatePrescriptionDetail
  );
  // router.put(
  //   "/api/edit-prescription",
  //   prescriptionController.handleEditPrescription
  // );
  router.delete(
    "/api/delete-prescription-detail",
    prescriptionDetailController.handleDeletePrescriptionDetail
  );

  router.get(
    "/api/find-prescription-detail",
    prescriptionDetailController.handleGetFindPrescriptionDetail
  );

  // ????n v??? t??nh
  router.get(
    "/api/get-all-donvitinh",
    donvitinhController.handleGetAllDonViTinh
  );

  // nha cung cap
  router.get("/api/get-all-ncc", nhacungcapController.handleGetAllNhaCungCap);

  return app.use("/", router);
};

module.exports = initWebRoutes;
