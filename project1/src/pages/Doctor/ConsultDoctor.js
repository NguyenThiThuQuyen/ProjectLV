import React, { useState, useEffect } from "react";
import Navbar from "../../components/Admin/Navbar";
import Sidebar from "../../components/Admin/Sidebar";
import NavbarConsult from "../../components/Doctor/NavbarConsult";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  dataGetTimPhieutheongay,
  timPhieuTheoNgayAPI,
  getPhieudatchoAPI,
  dataCheck,
} from "../../redux/phieudatchoRedux";
import moment from "moment";

const ConsultDoctor = () => {
  const [mang, setMang] = useState([]);
  const [arrivalDate, SetArrivalDate] = useState();
  const check = useSelector(dataCheck);

  const user = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  let testDate = moment(date).format("DD/MM/YYYY");

  const params = {
    doctorId: user.id,
    DateChon: date,
  };
  const data = useSelector(dataGetTimPhieutheongay);

  useEffect(() => {
    dispatch(
      timPhieuTheoNgayAPI({
        doctorId: user.id,
        DateChon: "today",
      })
    );
  }, []);

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
              <div className="flex">
                <div className="">Ngày khám:</div>
                <div className="ml-2 bg-yellow-500 rounded-md">{testDate}</div>
              </div>
            </div>
            <div className="">
              <div className="grid row-auto">
                <div className="grid grid-cols-5">
                  <div className="col-span-3">
                    <div className="text-center uppercase text-sm font-medium text-slate-700">
                      Đơn tư vấn hôm nay
                    </div>
                    <div className="">
                      <div className="mt-10">
                        <div className="px-3">
                          {data?.data &&
                            data?.data?.length > 0 &&
                            data?.data?.map((item, index) => {
                              let fotmatday = moment(
                                item?.patientDataToPhieudatcho?.birthday
                              ).format("DD/MM/YYYY");
                              return (
                                <>
                                  {item?.status == "Đã thanh toán" ? (
                                    <div className="border-y border-y-slate-200 flex justify-between">
                                      <div className="p-4">
                                        <div className="flex">
                                          <div className="mr-2 font-medium">
                                            Tên bệnh nhân:
                                          </div>
                                          <div className="">
                                            {
                                              item?.patientDataToPhieudatcho
                                                ?.childrentName
                                            }
                                          </div>
                                        </div>
                                        <div className="text-sm uppercase text-slate-600 font-medium mt-1">
                                          {
                                            item?.goituvanDataToPhieudatcho
                                              ?.packageName
                                          }
                                        </div>
                                        <div className="text-md uppercase text-orange-800 font-medium mt-1">
                                          {
                                            item?.scheduleDataToPhieudatcho
                                              ?.timeSlotDataToSchedule?.timeslot
                                          }
                                        </div>
                                      </div>
                                      <div className="my-auto">
                                        <button
                                          className="mr-5 bg-lime-500 rounded-md px-1 hover:bg-lime-600 hover:text-white"
                                          onClick={() => handleConsult(item.id)}
                                        >
                                          Đã thanh toán
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className=""></div>
                                  )}
                                </>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 border-l-4 border-indigo-500">
                    <div className="text-center uppercase text-sm font-medium text-slate-700">
                      Tất cả đơn hôm nay
                    </div>
                    <div className="">
                      <div className="mt-10">
                        <div className="px-3">
                          {data?.data &&
                            data?.data?.length > 0 &&
                            data?.data?.map((item, index) => {
                              let fotmatday = moment(
                                item?.patientDataToPhieudatcho?.birthday
                              ).format("DD/MM/YYYY");
                              return (
                                <div className="border-y border-y-slate-200 flex justify-between">
                                  <div className="py-2 w-2/3">
                                    <div className="">
                                      {
                                        item?.patientDataToPhieudatcho
                                          ?.childrentName
                                      }
                                    </div>
                                    <div className="text-sm uppercase text-slate-600 font-medium mt-1">
                                      {
                                        item?.goituvanDataToPhieudatcho
                                          ?.packageName
                                      }
                                    </div>
                                  </div>

                                  <div className="py-5">
                                    {item?.status == "Đã thanh toán" ? (
                                      <>
                                        <button
                                          className="mr-5 bg-lime-500 rounded-md px-1 hover:bg-lime-600 hover:text-white"
                                          onClick={() => handleConsult(item.id)}
                                        >
                                          Đã thanh toán
                                        </button>
                                      </>
                                    ) : (
                                      <div className="">
                                        {item.status == "Đã tư vấn" ? (
                                          <>
                                            <button
                                              className="mr-5 bg-yellow-500 rounded-md px-1 hover:bg-yellow-600 hover:text-white"
                                              onClick={() =>
                                                handleConsult(item.id)
                                              }
                                            >
                                              Đã tư vấn
                                            </button>
                                          </>
                                        ) : (
                                          <>
                                            <button
                                              className="mr-5 bg-orange-500 rounded-md px-1 cursor-not-allowed"
                                              // onClick={() => handleThanhToan(item.id)}
                                            >
                                              Chưa thanh toán
                                            </button>
                                          </>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConsultDoctor;
