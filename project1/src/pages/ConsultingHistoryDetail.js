import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
// import { TbBellRinging } from "react-icons/tb";
// import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
// import { Buffer } from "buffer";
import moment from "moment/moment";
import { useNavigate, useParams } from "react-router-dom";
import SidebarInforPatient from "../components/Guest/SidebarInforPatient";
import {
  dataGetFindPrescription,
  getFindPrescriptionAPI,
} from "../redux/prescriptionRedux";
import { ToastContainer } from "react-toastify";
const ConsultingHistoryDetail = () => {
  const dispatch = useDispatch();
  const data = useSelector(dataGetFindPrescription);
  const params = useParams();
  console.log("params111: ", params);

  console.log("data", data.chitiet);
  useEffect(() => {
    dispatch(getFindPrescriptionAPI(params?.reservationTicketId));
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
            <div className="items-center justify-items-center mx-auto w-11/12">
              <div className="mb-2 text-green-500 font-medium text-sm uppercase">
                Thông tin trẻ
              </div>
              <div className="flex col-span-1">
                <div className="ml-3">
                  <div className="mb-2 text-md flex">
                    <div className="font-medium text-slate-500 w-[140px]">
                      Họ tên trẻ:
                    </div>
                    <span className="font-normal ml-2 ">
                      {
                        data.chitiet?.reservationTicketDataToPrescription
                          ?.patientDataToPhieudatcho?.childrentName
                      }
                    </span>
                  </div>
                  <div className="mb-2 text-md flex">
                    <div className="font-medium text-slate-500 w-[140px]">
                      Ngày sinh:
                    </div>
                    <span className="font-normal ml-2 ">
                      {moment(
                        data?.chitiet?.reservationTicketDataToPrescription
                          ?.patientDataToPhieudatcho?.birthday
                      ).format("DD/MM/YYYY")}
                    </span>
                  </div>
                  <div className="mb-2 text-md flex">
                    <div className="font-medium text-slate-500 w-[140px]">
                      Bác sĩ tư vấn:
                    </div>
                    <span className="font-normal ml-2 ">
                      {
                        data.chitiet?.reservationTicketDataToPrescription
                          ?.doctorDataToPhieudatcho?.name
                      }
                    </span>
                  </div>

                  <div className="mb-2 text-md flex">
                    <div className="font-medium text-slate-500 w-[140px]">
                      Ngày tư vấn:
                    </div>
                    <span className="font-normal ml-2 bg-green-500 rounded-md px-2">
                      {moment(
                        data?.chitiet?.reservationTicketDataToPrescription
                          ?.scheduleDataToPhieudatcho?.registerDate
                      ).format("DD/MM/YYYY")}
                    </span>
                  </div>
                  <div className="mb-2 text-md flex">
                    <div className="font-medium text-slate-500 w-[140px]">
                      Khung giờ tư vấn:
                    </div>
                    <span className="font-normal ml-2 bg-sky-500 rounded-md px-2">
                      {
                        data?.chitiet?.reservationTicketDataToPrescription
                          ?.scheduleDataToPhieudatcho?.timeSlotDataToSchedule
                          .timeslot
                      }
                    </span>
                  </div>
                  <div className="mb-2 text-md flex">
                    <div className="font-medium text-slate-500 w-[140px]">
                      Gói tư vấn:
                    </div>
                    <span className="font-normal ml-2 bg-yellow-500 rounded-md px-2 boder-2 max-w-[480px]">
                      {
                        data?.chitiet?.reservationTicketDataToPrescription
                          ?.goituvanDataToPhieudatcho?.packageName
                      }
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-5 text-green-500 font-medium text-sm uppercase">
                Thực đơn
              </div>
            </div>
            <div className="items-center justify-items-center mx-auto w-9/12">
              {data?.chitiet?.menuDataToPrescription?.menuDataToEatDetail &&
                data?.chitiet?.menuDataToPrescription?.menuDataToEatDetail
                  .length > 0 &&
                data?.chitiet?.menuDataToPrescription?.menuDataToEatDetail?.map(
                  (item, index) => {
                    //   let ngaysinh = moment(
                    //     item?.patientDataToPhieudatcho?.birthday
                    //   ).format("DD/MM/YYYY");
                    //   let ngaytuvan = moment(
                    //     item?.scheduleDataToPhieudatcho?.registerDate
                    //   ).format("DD/MM/YYYY");
                    return (
                      <>
                        <div className="border-[1px] shadow-md rounded-md mt-5 mx-2 py-5">
                          <div className="w-full text-xl text-sky-700 cursor-pointer rounded-[3px] flex space-x-4">
                            {/* <div className="ml-auto">
                            {item?.status == "Đã thanh toán" ? (
                              <>
                                <div className="text-sm mr-5 bg-green-500 px-2 py-1 rounded-md text-white">
                                  {item?.status}
                                </div>
                              </>
                            ) : (
                              <>
                                {item.status == "Đã tư vấn" ? (
                                  <>
                                    <div className="text-sm mr-5 bg-orange-500 px-2 py-1 rounded-md text-white">
                                      {item?.status}
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    {item.status == "null" ? (
                                      <>
                                        <div className="text-sm mr-5 bg-red-500 px-2 py-1 rounded-md text-white">
                                          Chưa thanh toán
                                        </div>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                )}
                              </>
                            )}
                          </div> */}
                          </div>
                          <div className="flex col-span-1 ml-3">
                            <div className="ml-3">
                              <div className="mb-2 text-md flex">
                                <span className="font-normal ml-2 ">
                                  {item?.eatDateDataToEatDetail?.eatdate}
                                </span>
                              </div>
                              <div className="mb-2 text-md flex">
                                <div className="font-medium text-slate-500 w-[140px]">
                                  Món ăn
                                </div>
                                <span className="font-normal ml-2 ">
                                  {item?.dishDataToEatDetail?.name}
                                </span>
                              </div>
                              <div className="mb-2 text-md flex">
                                <div className="font-medium text-slate-500 w-[140px]">
                                  Cách chế biến
                                </div>

                                <div
                                  className=" "
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      item?.dishDataToEatDetail?.contentHTML,
                                  }}
                                ></div>
                              </div>

                              <div className="mb-2 text-md flex">
                                <div className="font-medium text-slate-500 w-[140px]">
                                  Khung giờ ăn:
                                </div>
                                <span className="font-normal ml-2 bg-green-500 rounded-md px-2">
                                  {item?.eatTimeslotDataToEatDetail?.khunggioan}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  }
                )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ConsultingHistoryDetail;
