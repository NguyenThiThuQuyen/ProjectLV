import React from "react";
import { Route, Routes } from "react-router-dom";
import HomeAdmin from "../pages/Admin/HomeAdmin";
import UserManager from "../pages/Admin/UserManager";
import UserSingle from "../pages/Admin/UserSingle";
import GoiKhamManager from "../pages/Admin/GoiKhamManager";
import LoaiThuocManager from "../pages/Admin/LoaiThuocManager";
import ThuocManager from "../pages/Admin/ThuocManager";
import ParentManager from "../pages/Admin/ParentManager";
import PatientManager from "../pages/Admin/PatientManager";
import PatientModal from "../../src/components/Admin/Modal/Patient/PatientModal";
function admin() {
  return (
    <div>
      <Routes>
        <Route path="/" index element={<HomeAdmin />} />
        <Route path="/users-manager" element={<UserManager />} />
        <Route path="/user-detail-manager/:userId" element={<UserSingle />} />
        <Route path="/medical-package-manager" element={<GoiKhamManager />} />
        <Route path="/medical-type-manager" element={<LoaiThuocManager />} />
        <Route path="/medical-manager" element={<ThuocManager />} />
        <Route path="/parent-manager" element={<ParentManager />} />
        <Route path="/patient-manager" element={<PatientManager />} />
        <Route path="/patient-modal-manager" element={<PatientModal />} />
      </Routes>
    </div>
  );
}

export default admin;
