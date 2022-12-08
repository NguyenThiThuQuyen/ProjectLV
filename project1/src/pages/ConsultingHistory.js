import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { TbBellRinging } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Buffer } from "buffer";
import moment from "moment/moment";
import { useNavigate, useParams } from "react-router-dom";
import SidebarInforPatient from "../components/Guest/SidebarInforPatient";
import {
  dataHistoryPhieudatcho,
  historyPhieudatchoAPI,
} from "../redux/phieudatchoRedux";
import { ToastContainer } from "react-toastify";
const ConsultingHistory = () => {
  const dispatch = useDispatch();
  const data = useSelector(dataHistoryPhieudatcho);
  const params = useParams();
  console.log("params: ", params);

  console.log("data", data);
  useEffect(() => {
    dispatch(historyPhieudatchoAPI(params?.patientId));
  }, []);

  return (
    <div className="h-screen w-full">
      <ToastContainer />
      <Header />
      <div className="mt-28 mx-auto w-7/8">
        <div className="grid grid-cols-4 px-10 py-14">
          <SidebarInforPatient />
          <div className="col-span-3 shadow-xl border-[1px] pl-10 py-5 relative ml-5">
            <div className="mb-3 font-medium text-xl text-sky-700 text-center uppercase">
              Thông tin lịch sử tư vấn
            </div>
            <div className="items-center justify-items-center mx-auto w-9/12">
              {data.chitiet &&
                data.chitiet.length > 0 &&
                data.chitiet.map((item, index) => {
                  let ngaysinh = moment(
                    item?.patientDataToPhieudatcho?.birthday
                  ).format("DD/MM/YYYY");
                  let ngaytuvan = moment(
                    item?.scheduleDataToPhieudatcho?.registerDate
                  ).format("DD/MM/YYYY");
                  return (
                    <>
                      <div className="border-[1px] shadow-md rounded-md mt-5 mx-2 py-5">
                        <div className="flex col-span-1 ml-3">
                          <div className="ml-3">
                            <div className="mb-2 text-md">
                              <span className="font-medium text-slate-500">
                                Họ tên trẻ:
                              </span>
                              <span className="font-normal ml-2 ">
                                {item?.patientDataToPhieudatcho?.childrentName}
                              </span>
                            </div>

                            {/* <div className="mb-2 text-md">
                              <span className="font-medium text-slate-500">
                                Giới tính:
                              </span>
                              <span className="font-normal ml-2">
                                {item?.genderDataToPatient?.value}
                              </span>
                            </div>
                            <div className="mb-2 text-md">
                              <span className="font-medium text-slate-500">
                                Ngày sinh:
                              </span>
                              <span className="font-normal ml-2">
                                {ngaysinh}
                              </span>
                            </div> */}

                            <div className="mb-2 text-md">
                              <span className="font-medium text-slate-500">
                                Bác sĩ tư vấn:
                              </span>
                              <span className="font-normal ml-2 ">
                                {item?.doctorDataToPhieudatcho?.name}
                              </span>
                            </div>

                            <div className="mb-2 text-md">
                              <span className="font-medium text-slate-500">
                                Ngày tư vấn:
                              </span>
                              <span className="font-normal ml-2 ">
                                {ngaytuvan}
                              </span>
                            </div>

                            <div className="mb-2 text-md">
                              <span className="font-medium text-slate-500">
                                Khung giờ tư vấn:
                              </span>
                              <span className="font-normal ml-2 ">
                                {
                                  item?.scheduleDataToPhieudatcho
                                    ?.timeSlotDataToSchedule?.timeslot
                                }
                              </span>
                            </div>
                            <div className="mb-2 text-md">
                              <span className="font-medium text-slate-500">
                                Gói tư vấn:
                              </span>
                              <span className="font-normal ml-2 ">
                                {
                                  item?.scheduleDataToPhieudatcho
                                    ?.timeSlotDataToSchedule?.timeslot
                                }
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ConsultingHistory;
