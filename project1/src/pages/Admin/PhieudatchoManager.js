import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Navbar from "../../components/Admin/Navbar";
import PhieudatchoModal from "../../components/Admin/Modal/Phieudatcho/PhieudatchoModal";
import UserModalEdit from "../../components/Admin/Modal/User/UserEditModal";
import { useNavigate } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
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
} from "../../redux/phieudatchoRedux";

const PhieudatchoManager = () => {
  const dispatch = useDispatch();
  const data = useSelector(dataGetAllPhieudatcho);
  // console.log("data:", data);
  const navigate = useNavigate();
  const check = useSelector(dataCheck);

  useEffect(() => {
    dispatch(getAllPhieudatchoAPI());
  }, [check]);

  const handleDeletePhieudatcho = (id) => {
    dispatch(deletePhieudatchoAPI(id));
  };

  //   const handleDetailUser = (userId) => {
  //     navigate(`/manager/user-detail-manager/${userId}`);
  //     dispatch(getAUserAPI(userId));
  //   };

  return (
    <>
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-initial w-5/6">
          <Navbar />
          <ToastContainer />
          <PhieudatchoModal />
          <div className="w-full px-10 py-4">
            <table className="border border-slate-200">
              <thead>
                <tr className="border border-slate-200 bg-green-600">
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Tên bệnh nhân
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Gói tư vấn
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Ngày đặt
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Ngày đến
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Khung giờ tư vấn
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Bác sĩ tư vấn
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Điều chỉnh
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.phieudatcho &&
                  data.phieudatcho.length > 0 &&
                  data.phieudatcho.map((item, index) => {
                    let ngaydat = "";
                    ngaydat = moment(item.bookingDate).format("YYYY-MM-DD");

                    let ngayden = "";
                    ngayden = moment(item.arrivalDate).format("YYYY-MM-DD");

                    return (
                      <tr
                        key={item.id}
                        className="hover:bg-slate-200"
                        // onClick={() => handleDetailUser(item.id)}
                      >
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item?.patientDataToPhieudatcho?.childrentName}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item?.goituvanDataToPhieudatcho?.packageName}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {ngaydat}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {ngayden}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {
                            item?.scheduleDataToPhieudatcho
                              ?.timeSlotDataToSchedule?.timeslot
                          }
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item?.doctorDataToPhieudatcho?.name}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          <div className="flex">
                            <div className="mr-5" title="Sửa">
                              {/* <UserModalEdit item={item} /> */}
                            </div>

                            <div
                              className=""
                              title=""
                              onClick={() => handleDeletePhieudatcho(item.id)}
                            >
                              <RiDeleteBinLine className="cursor-pointer text-lg text-red-700" />
                            </div>
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
