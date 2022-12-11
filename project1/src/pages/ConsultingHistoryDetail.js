import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import EatDetailToDateModal from "../components/Guest/EatDetailToDateModal";
import { useDispatch, useSelector } from "react-redux";
import { dataAllEatDates, getAllEatDatesAPI } from "../redux/ngayanRedux";

// import { Buffer } from "buffer";
import moment from "moment/moment";
import { useNavigate, useParams } from "react-router-dom";
import SidebarInforPatient from "../components/Guest/SidebarInforPatient";
import {
  DataGetFindEatDetailToDate,
  getFindEatDetailToDateAPI,
} from "../redux/chitietanRedux";
import {
  datagetFindIdPhieuDatCho,
  findIdPhieuDatChoPrescriptionAPI,
  createPrescriptionAPI,
  editPrescriptionAPI,
} from "../redux/prescriptionRedux";
import {
  dataGetFindPrescription,
  getFindPrescriptionAPI,
} from "../redux/prescriptionRedux";
import { ToastContainer } from "react-toastify";
const ConsultingHistoryDetail = () => {
  const [showModal, setShowModal] = useState(false);
  const [eatDateId, seteatDateId] = useState();
  const dispatch = useDispatch();
  const data = useSelector(dataGetFindPrescription);
  const params = useParams();
  console.log("params111: ", params);

  // console.log("data", data.chitiet);
  useEffect(() => {
    dispatch(getFindPrescriptionAPI(params?.reservationTicketId));
  }, []);

  const handleXemMenu = (id) => {
    console.log("id 11", id);
    dispatch(
      getFindEatDetailToDateAPI({
        menuId: dataFindId?.menuId,
        eatdateId: id,
      })
    );
    seteatDateId(id);

    setShowModal(true);
  };

  const dataEatDates = useSelector(dataAllEatDates);
  console.log("dataEatDates 123:", dataEatDates);
  const dataFindId = useSelector(datagetFindIdPhieuDatCho);
  console.log("dataFindId:", dataFindId);

  const dataEatDate = useSelector(DataGetFindEatDetailToDate);
  console.log("dataEatDate 444:", dataEatDate);

  useEffect(() => {
    dispatch(getAllEatDatesAPI(params?.reservationTicketId));
    dispatch(
      findIdPhieuDatChoPrescriptionAPI({
        reservationTicketId: params?.reservationTicketId,
      })
    );
  }, []);

  const handleDong = (test) => {
    setShowModal(test);
  };
  const handleMoLai = (data) => {
    setShowModal(data);
  };

  return (
    <div className="h-screen w-full">
      <ToastContainer />
      <Header />
      <div className="mt-28 mx-auto w-7/8">
        <div className="grid grid-cols-4 px-10 py-14">
          <SidebarInforPatient />
          <div className="col-span-3 shadow-xl border-[1px] py-5 relative ml-5">
            <div className="mb-3 font-medium text-xl text-sky-700 text-center uppercase">
              Thông tin lịch sử tư vấn
            </div>
            <div className="items-center justify-items-center mx-auto w-11/12">
              <div className="mb-2 ml-2 text-green-500 font-medium text-sm uppercase">
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
            </div>

            <div className="grid grid-cols-2 mt-5">
              <div className="col-span-1 ml-16">
                <div className="mt-5 text-green-500 font-medium text-sm uppercase">
                  Thực đơn
                </div>
                <div className="">
                  {dataEatDates.eatdates &&
                    dataEatDates.eatdates.length > 0 &&
                    dataEatDates.eatdates.map((item, index) => {
                      console.log("item item: ", item);
                      return (
                        <>
                          <div className="">{item.eatdate}</div>
                          <div className="">
                            <div
                              className="italic hover:underline hover:underline-offset-2"
                              onClick={() => handleXemMenu(item?.id)}
                            >
                              Xem chi tiết thực đơn đã tạo
                            </div>
                          </div>
                        </>
                      );
                    })}
                </div>
              </div>

              <div className="col-span-1">
                <div className="mt-5 text-green-500 font-medium text-sm uppercase">
                  Thuốc hỗ trợ
                </div>
                <div className="">
                  {dataEatDates.eatdates &&
                    dataEatDates.eatdates.length > 0 &&
                    dataEatDates.eatdates.map((item, index) => {
                      console.log("item item: ", item);
                      return (
                        <>
                          <div className="">{item.eatdate}</div>
                          <div className="">
                            <div
                              className="italic hover:underline hover:underline-offset-2"
                              onClick={() => handleXemMenu(item?.id)}
                            >
                              Xem chi tiết thực đơn đã tạo
                            </div>
                          </div>
                        </>
                      );
                    })}
                </div>
              </div>
            </div>

            <div className="">
              {showModal === true ? (
                <EatDetailToDateModal
                  openModal={showModal}
                  handleClose={handleDong}
                  handleMo={handleMoLai}
                  // item={item}
                  params={params}
                  paramsMenuId={dataFindId?.menuId}
                  paramsEatDateId={eatDateId}
                />
              ) : (
                <>
                  <div className=""></div>
                </>
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
