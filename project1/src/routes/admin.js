import React from "react";
import { Route, Routes } from "react-router-dom";
import HomeAdmin from "../pages/Admin/HomeAdmin";
import UserManager from "../pages/Admin/UserManager";
import UserSingle from "../pages/Admin/UserSingle";
import GoiKhamManager from "../pages/Admin/GoiKhamManager";
import ScheduleManager from "../pages/Admin/ScheduleManager";
import ScheduleSingle from "../pages/Admin/ScheduleSingle";
import LoaiThuocManager from "../pages/Admin/LoaiThuocManager";
import ThuocManager from "../pages/Admin/ThuocManager";
import ParentManager from "../pages/Admin/ParentManager";
import ParentSingle from "../pages/Admin/ParentSingle";
import PatientManager from "../pages/Admin/PatientManager";
import PatientSingle from "../pages/Admin/PatientSingle";
import GoiKhamSingle from "../pages/Admin/GoiKhamSingle";
import TimeslotManager from "../pages/Admin/TimeslotManager";
import PhieudatchoManager from "../pages/Admin/PhieudatchoManager";
import PatientModal from "../../src/components/Admin/Modal/Patient/PatientModal";
import DishManager from "../pages/Admin/DishManager";
import DishSingle from "../pages/Admin/DishSingle";
import CategoryManager from "../pages/Admin/CategoryManager";

import ConsultDoctor from "../pages/Doctor/ConsultDoctor";
import ConsultAllDate from "../pages/Doctor/ConsultAllDate";
import Prescription from "../pages/Doctor/Prescription";
import DetailMenu from "../pages/Doctor/DetailMenu";

import InforUser from "../pages/Admin/InforUser";
import ReservationSingle from "../pages/Admin/PhieudatchoSingle";
import PaySingle from "../pages/Admin/PaySingle";
import ReservationToDate from "../pages/Admin/ReservationToDate";
import Receipt from "../pages/Admin/Receipt";
import PrescriptionDetail from "../pages/Admin/PrescriptionDetail";

function admin() {
  return (
    <div>
      <Routes>
        <Route path="/" index element={<HomeAdmin />} />
        <Route path="/users-manager" element={<UserManager />} />
        <Route path="/user-detail-manager/:userId" element={<UserSingle />} />
        <Route
          path="/patient-detail-manager/:patientId"
          element={<PatientSingle />}
        />
        <Route
          path="/medical-package-detail/:medicalpackageId"
          element={<GoiKhamSingle />}
        />
        <Route path="/medical-package-manager" element={<GoiKhamManager />} />
        <Route path="/medical-type-manager" element={<LoaiThuocManager />} />
        <Route path="/medical-manager" element={<ThuocManager />} />
        <Route path="/parent-manager" element={<ParentManager />} />
        <Route path="/parent-detail/:parentId" element={<ParentSingle />} />
        <Route path="/patient-manager" element={<PatientManager />} />
        <Route path="/patient-modal-manager" element={<PatientModal />} />
        <Route path="/timeslot-manager" element={<TimeslotManager />} />
        <Route path="/schedule-manager" element={<ScheduleManager />} />
        <Route
          path="/schedule-detail/:scheduleId"
          element={<ScheduleSingle />}
        />
        <Route
          path="/reservation-ticket-manager"
          element={<PhieudatchoManager />}
        />

        {/* mon an */}
        <Route path="/dish-manager" element={<DishManager />} />
        <Route path="/dish-manager/:dishId" element={<DishSingle />} />
        <Route path="/category-manager" element={<CategoryManager />} />

        {/* trang bac si */}
        <Route path="/consult" element={<ConsultDoctor />} />
        <Route path="/consult-alldate" element={<ConsultAllDate />} />
        <Route path="/prescription/:id" element={<Prescription />} />

        <Route path="/detail-menu/:menuId/:id" element={<DetailMenu />} />

        <Route path="/infor-user/:id" element={<InforUser />} />
        <Route path="/reservation-detail/:id" element={<ReservationSingle />} />
        <Route path="/pay/:id" element={<PaySingle />} />
        <Route
          path="/reservation-ticket-date"
          element={<ReservationToDate />}
        />
        <Route path="/receipt/:id" element={<Receipt />} />
        <Route
          path="/prescription-detail/:id"
          element={<PrescriptionDetail />}
        />
      </Routes>
    </div>
  );
}

export default admin;
