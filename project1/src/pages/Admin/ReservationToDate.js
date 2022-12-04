import React, { useState, useEffect } from "react";
import Navbar from "../../components/Admin/Navbar";
import Sidebar from "../../components/Admin/Sidebar";
import NavbarConsult from "../../components/Doctor/NavbarConsult";
import { useDispatch, useSelector } from "react-redux";
import { HiDotsHorizontal } from "react-icons/hi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import {
  dataGetTimPhieutheongay,
  timPhieuTheoNgayAPI,
  getPhieudatchoAPI,
  dataCheck,
} from "../../redux/phieudatchoRedux";

import { dataGetDoctorHome, getAllDoctorHomeAPI } from "../../redux/userRedux";

import { dataGetFindSchedule } from "../../redux/scheduleRedux";
import { current } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import NavbarPhieuDatCho from "../../components/Admin/NavbarPhieuDatCho";
const ReservationToDate = () => {
  const [mang, setMang] = useState([]);
  const [dateChon, setDateChon] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [bacsiId, setBacsiId] = useState();
  const check = useSelector(dataCheck);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  //   const today = new Date();
  //   let date =
  //     today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  //   const test = new Date(date).getTime();

  const dataDoctor = useSelector(dataGetDoctorHome);

  const params = {
    doctorId: bacsiId,
    DateChon: moment(dateChon).format("YYYY-MM-DD"),
  };

  const data = useSelector(dataGetTimPhieutheongay);
  console.log("data", data);

  useEffect(() => {
    if (dataDoctor.data) {
      setBacsiId(dataDoctor.data[0].id);
    }
  }, [dataDoctor]);

  useEffect(() => {
    if (bacsiId !== undefined) {
      dispatch(timPhieuTheoNgayAPI(params));
    }
  }, [bacsiId]);

  useEffect(() => {
    if (dateChon !== undefined) {
      dispatch(timPhieuTheoNgayAPI(params));
    }
  }, [dateChon]);

  useEffect(() => {
    dispatch(getAllDoctorHomeAPI("ALL"));
  }, []);

  const handleConsult = async (id) => {
    navigate(`/manager/prescription/${id}`);
    dispatch(getPhieudatchoAPI(id));
  };

  const handleThanhToan = (id) => {
    navigate(`/manager/pay/${id}`);
    dispatch(getPhieudatchoAPI(id));
  };

  const handleDetail = (id) => {
    navigate(`/manager/reservation-detail/${id}`);
    dispatch(getPhieudatchoAPI(id));
  };

  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="flex-initial w-5/6">
        <Navbar />
        <NavbarPhieuDatCho />
        <div className="">
          <div className="w-full px-10 py-4">
            <div className="flex">
              <div className="">
                <label htmlFor="" className="text-slate-600 ml-2">
                  Chọn ngày:
                </label>

                <DatePicker
                  className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                  selected={dateChon}
                  required
                  // value={dateChon}
                  onChange={(date) => setDateChon(date)}
                  date={new Date()}
                  dateFormat="dd/MM/yyyy"
                  isClearable
                  showYearDropdown
                  scrollableMonthYearDropdown
                />
              </div>
            </div>
            <div className="flex">
              <div className="mt-4">
                <label htmlFor="" className="text-slate-600 ml-2">
                  Chọn bác sĩ:
                </label>
                <select
                  className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                  id=""
                  onChange={(event) => setBacsiId(event.target.value)}
                >
                  {dataDoctor.data &&
                    dataDoctor.data.length > 0 &&
                    dataDoctor.data.map((item, index) => {
                      return (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <table className="border border-slate-200 mt-10">
              <thead>
                <tr className="border border-slate-200 bg-green-600">
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Tên bệnh nhân
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Ngày sinh
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Gói tư vấn
                  </th>
                  {/* <th className="border border-slate-200 p-3 text-white font-medium">
                    Ngày đặt
                  </th> */}
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Khung giờ tư vấn
                  </th>

                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.data &&
                  data?.data?.length > 0 &&
                  data?.data?.map((item, index) => {
                    console.log("item:", item);
                    let fotmatday = moment(
                      item?.patientDataToPhieudatcho?.birthday
                    ).format("DD/MM/YYYY");
                    return (
                      <tr key={item.id} className="hover:bg-slate-200">
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item?.patientDataToPhieudatcho?.childrentName}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {fotmatday}
                        </td>
                        <td className="border-y w-[310px] border-slate-300 py-3 px-7 text-slate-700">
                          {item?.goituvanDataToPhieudatcho?.packageName}
                        </td>
                        {/* <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {ngaydat}
                        </td> */}
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {
                            item?.scheduleDataToPhieudatcho
                              ?.timeSlotDataToSchedule?.timeslot
                          }
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
    </div>
  );
};

export default ReservationToDate;
