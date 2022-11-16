import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Schedule from "../pages/Schedule";
import Service from "../pages/Service";
import DetailService from "../pages/DetailService";
import DangKyTuVan from "../pages/DangKyTuVan";
import AllDocTorHome from "../pages/AllDocTorHome";
import DetailDoctorHome from "../pages/DetailDoctorHome";
import Confirm from "../pages/XacNhanDangKy";
import InforPatient from "../pages/InforPatient";
import LoginGuest from "../components/Auth/LoginGuest";

function guest() {
  return (
    <div>
      <Routes>
        <Route path="/" index element={<Homepage />} />
        <Route path="/login-guest" element={<LoginGuest />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/service" element={<Service />} />
        <Route path="/dang-ky-tu-van" element={<DangKyTuVan />} />
        <Route path="/all-doctor" element={<AllDocTorHome />} />
        <Route path="/detail-doctor/:userId" element={<DetailDoctorHome />} />
        <Route
          path="/detail-service/:medicalpackageId"
          element={<DetailService />}
        />

        <Route path="/infor-patient/:id" element={<InforPatient />} />
      </Routes>
    </div>
  );
}

export default guest;
