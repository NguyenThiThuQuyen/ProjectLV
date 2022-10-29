import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Schedule from "../pages/Schedule";
import Service from "../pages/Service";
import DetailService from "../pages/DetailService";
import DangKyTuVan from "../pages/DangKyTuVan";
import AllDocTorHome from "../pages/AllDocTorHome";

function guest() {
  return (
    <div>
      <Routes>
        <Route path="/" index element={<Homepage />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/service" element={<Service />} />
        <Route path="/dang-ky-tu-van" element={<DangKyTuVan />} />
        <Route path="/all-doctor" element={<AllDocTorHome />} />
        <Route
          path="/detail-service/:medicalpackageId"
          element={<DetailService />}
        />
      </Routes>
    </div>
  );
}

export default guest;
