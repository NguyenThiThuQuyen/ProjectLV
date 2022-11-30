import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Navbar from "../../components/Admin/Navbar";
import PhieudatchoModal from "../../components/Admin/Modal/Phieudatcho/PhieudatchoModal";
import UserModalEdit from "../../components/Admin/Modal/User/UserEditModal";
import { useNavigate } from "react-router-dom";
import { HiDotsHorizontal } from "react-icons/hi";
import { AiOutlineEye } from "react-icons/ai";
import { Buffer } from "buffer";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAllPhieudatchoAPI,
  dataGetAllPhieudatcho,
  dataCheck,
  deletePhieudatchoAPI,
  dataGetAPhieudatcho,
  getPhieudatchoAPI,
} from "../../redux/phieudatchoRedux";
import NavbarPhieuDatCho from "../../components/Admin/NavbarPhieuDatCho";

const PhieudatchoManager = () => {
  const dispatch = useDispatch();
  const data = useSelector(dataGetAllPhieudatcho);
  console.log("data:", data);
  const navigate = useNavigate();
  const check = useSelector(dataCheck);

  useEffect(() => {
    dispatch(getAllPhieudatchoAPI());
  }, [check]);

  const handleDeletePhieudatcho = (id) => {
    dispatch(deletePhieudatchoAPI(id));
  };

  const handleDetail = (id) => {
    navigate(`/manager/reservation-detail/${id}`);
    dispatch(getPhieudatchoAPI(id));
  };

  const handleThanhToan = (id) => {
    navigate(`/manager/pay/${id}`);
    dispatch(getPhieudatchoAPI(id));
  };

  return (
    <>
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-initial w-5/6">
          <Navbar />
          <ToastContainer />
          <NavbarPhieuDatCho />
          <PhieudatchoModal />
          <div className="w-full px-10 py-4">
            <table className="border border-slate-200">
              <thead>
                <tr className="border border-slate-200 bg-green-600">
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    id
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Tên bệnh nhân
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Gói tư vấn
                  </th>
                  {/* <th className="border border-slate-200 p-3 text-white font-medium">
                    Ngày đặt
                  </th> */}
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Ngày tư vấn
                  </th>
                  {/* <th className="border border-slate-200 p-3 text-white font-medium">
                    Khung giờ tư vấn
                  </th> */}
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Bác sĩ tư vấn
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.phieudatcho &&
                  data.phieudatcho.length > 0 &&
                  data.phieudatcho.map((item, index) => {
                    let ngaydat = "";
                    ngaydat = moment(item.bookingDate).format("DD/MM/YYYY");

                    let ngayden = "";
                    ngayden = moment(item.arrivalDate).format("DD/MM/YYYY");

                    return (
                      <tr key={item.id} className="hover:bg-slate-200">
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item?.id}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item?.patientDataToPhieudatcho?.childrentName}
                        </td>
                        <td className="border-y w-[310px] border-slate-300 py-3 px-7 text-slate-700">
                          {item?.goituvanDataToPhieudatcho?.packageName}
                        </td>
                        {/* <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {ngaydat}
                        </td> */}
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {ngayden}
                        </td>
                        {/* <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {
                            item?.scheduleDataToPhieudatcho
                              ?.timeSlotDataToSchedule?.timeslot
                          }
                        </td> */}
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item?.doctorDataToPhieudatcho?.name}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-800">
                          <div className="flex">
                            {item?.status == null ? (
                              <>
                                <button
                                  className="mr-5 bg-yellow-500 rounded-md px-1 hover:bg-yellow-600 hover:text-white"
                                  onClick={() => handleThanhToan(item.id)}
                                >
                                  Thanh toán
                                </button>
                                <button
                                  className="bg-sky-400 hover:bg-sky-500 px-3 rounded-md"
                                  title="Xem chi tiết"
                                  onClick={() => handleDetail(item.id)}
                                >
                                  <HiDotsHorizontal className="cursor-pointer text-lg text-sky-800" />
                                </button>
                              </>
                            ) : (
                              <div className="">
                                {item?.status == "Đã thanh toán" ? (
                                  <>
                                    <button
                                      className="mr-5 bg-lime-500 rounded-md px-1 hover:bg-lime-600 hover:text-white"
                                      onClick={() => handleThanhToan(item.id)}
                                    >
                                      Đã thanh toán
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      className="mr-5 bg-orange-500 rounded-md px-1 hover:bg-orange-600 hover:text-white"
                                      onClick={() => handleThanhToan(item.id)}
                                    >
                                      Đã tư vấn
                                    </button>
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default PhieudatchoManager;
