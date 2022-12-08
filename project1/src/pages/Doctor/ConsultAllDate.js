import React, { useState, useEffect } from "react";
import Navbar from "../../components/Admin/Navbar";
import Sidebar from "../../components/Admin/Sidebar";
import NavbarConsult from "../../components/Doctor/NavbarConsult";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

import {
  dataGetTimPhieutheongay,
  timPhieuTheoNgayAPI,
  getPhieudatchoAPI,
  dataCheck,
} from "../../redux/phieudatchoRedux";
import { dataGetFindSchedule } from "../../redux/scheduleRedux";
import { current } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
const ConsultAllDate = () => {
  const [mang, setMang] = useState([]);
  const [dateChon, setDateChon] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const check = useSelector(dataCheck);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  //   const today = new Date();
  //   let date =
  //     today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  //   const test = new Date(date).getTime();

  const params = {
    doctorId: user.id,
    DateChon: moment(dateChon).format("YYYY-MM-DD"),
  };

  const data = useSelector(dataGetTimPhieutheongay);

  useEffect(() => {
    dispatch(timPhieuTheoNgayAPI(params));
  }, [dateChon]);

  const handleConsult = async (id) => {
    navigate(`/manager/prescription/${id}`);
    dispatch(getPhieudatchoAPI(id));
  };

  return (
    <>
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-initial w-5/6">
          <Navbar />
          <NavbarConsult />
          <div className="w-full px-10 py-4">
            <div className="flex">
              <div className="">
                <label htmlFor="" className="text-slate-600 ml-2">
                  Chọn ngày:
                </label>

                <DatePicker
                  className="w-full border-2 p-2 rounded-lg mt-1 bg-slate-100 outline-slate-300"
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
            <table className="border border-slate-200 mt-10">
              <thead>
                <tr className="border border-slate-200 bg-green-600">
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Tên
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Ngày sinh
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Gói tư vấn
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Giờ tư vấn
                  </th>
                  {/* <th className="border border-slate-200 p-3 text-white font-medium">
                    Trạng thái
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {data?.data &&
                  data?.data?.length > 0 &&
                  data?.data?.map((item, index) => {
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
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item?.goituvanDataToPhieudatcho?.packageName}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {
                            item?.scheduleDataToPhieudatcho
                              ?.timeSlotDataToSchedule?.timeslot
                          }
                        </td>

                        {/* <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item.status == "Đã tư vấn" ? (
                            <>
                              <div
                                className="bg-green-600 hover:bg-green-700 p-1 rounded-md text-white"
                                onClick={() => handleConsult(item.id)}
                              >
                                {item?.status}
                              </div>
                            </>
                          ) : (
                            <>
                              <div
                                className="bg-yellow-400 p-2 rounded-md hover:bg-yellow-500 hover:text-white cursor-pointer font-semibold"
                                onClick={() => handleConsult(item.id)}
                              >
                                Tư vấn
                              </div>
                            </>
                          )}
                        </td> */}
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

export default ConsultAllDate;
