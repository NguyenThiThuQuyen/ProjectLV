import React, { useState, useEffect } from "react";
import Navbar from "../../components/Admin/Navbar";
import Sidebar from "../../components/Admin/Sidebar";
import { BsPlusLg } from "react-icons/bs";
import NavbarConsult from "../../components/Doctor/NavbarConsult";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MenuModal from "../../components/Doctor/MenuModal";

import {
  dataGetTimthieutheongay,
  timPhieuTheoNgayAPI,
  dataCheck,
} from "../../redux/phieudatchoRedux";
import moment from "moment";
import { dataGetFindSchedule } from "../../redux/scheduleRedux";
import { ToastContainer } from "react-toastify";

const Prescription = () => {
  const [showModal, setShowModal] = useState(false);
  const today = new Date();
  let date =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

  const handleMenu = () => {
    setShowModal(true);
  };
  const handleDong = (test) => {
    console.log("test", test);
    setShowModal(test);
  };

  return (
    <>
      <ToastContainer />
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-initial w-5/6">
          <Navbar />
          <div className="w-full mt-10">
            <div className="w-2/3 ml-5 mr-auto">
              <div className="border-2 border-slate-200 p-4 shadow-lg">
                <div className="flex ">
                  <span className="font-medium">Ngày lập:</span>
                  <div className="ml-3">{date}</div>
                </div>
                <div className="w-full mt-5">
                  <button
                    className="p-2 bg-yellow-500 text-white text-md font-medium rounded-md mx-auto"
                    onClick={() => handleMenu()}
                  >
                    <div className="flex">
                      <BsPlusLg className="mt-1 mr-2" />
                      <span>Tạo thực đơn</span>
                    </div>
                  </button>
                  <div className="">
                    {showModal === true ? (
                      <MenuModal
                        openModal={showModal}
                        handleClose={handleDong}
                      />
                    ) : null}
                  </div>
                </div>
                <div className="mt-5">
                  <label htmlFor="" className="font-medium">
                    Lời dặn:
                  </label>
                  <textarea
                    type="text"
                    placeholder="..."
                    className=" w-full h-16 border rounded-lg p-2 mt-1  outline-slate-300"
                  />
                </div>
                <div className="w-full text-right mt-2">
                  <button className="p-3 bg-green-500 text-white text-sm font-medium rounded-md mx-auto">
                    LƯU THÔNG TIN
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full px-10 py-4">
            <div className="text-sky-700 uppercase font-medium text-xl mt-10">
              Thông tin thực đơn
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Prescription;
