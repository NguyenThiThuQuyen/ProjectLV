import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { AiFillStar } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { BsPersonCheck } from "react-icons/bs";
import hinh1 from "../assets/upload/bacsi2.jpg";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Buffer } from "buffer";
import { getAUserAPI, dataGetAUser, dataCheck } from "../redux/userRedux";
import { getATimeslotAPI, dataGetATimeslot } from "../redux/timeslotRedux";
import { getLoginGuestAPI, dataCheck2 } from "../redux/Auth/guestRedux";
import { useLocation, useParams } from "react-router-dom";
import { createPhieudatchoAPI } from "../redux/phieudatchoRedux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import XemChiTietLichModal from "../components/Guest/XemChiTietLichModal";

import {
  getAllGoiKhamAPI,
  dataGetAllGoiKham,
  getGoiKhamAPI,
  dataGetGoiKham,
} from "../redux/goiKhamRedux";
import TaoThongTinNguoiDungModal from "../components/Guest/TaoThongTinNguoiDungModal";
import {
  getFindScheduleToDoctorAPI,
  dataGetFindSchedule,
  getFindTimeslotAPI,
  dataGetFindTimeslot,
} from "../redux/scheduleRedux";
import DetailServiceModal from "../components/Guest/DetailServiceModal";
const DetailDoctorHome = (props) => {
  const [showThongTinNguoiDungModal, setShowThongTinNguoiDungModal] =
    useState(false);

  const [medicalpackageId, setMedicalpackageId] = useState();
  const [bookingDate, setBookingDate] = useState(new Date());
  const [registerDate, setRegisterDate] = useState();
  const [timeslotId, setTimeslotId] = useState();
  const [newCreateParentId, setNewCreateParentId] = useState();
  const [scheduleId, setScheduleId] = useState();
  const [patientId, setPatientId] = useState();
  const [mang, setMang] = useState([]);

  //
  const [testTimeslot, setTestTimeslot] = useState();
  const [testGoiKham, setTestGoiKham] = useState();
  const [testGiaGoiKham, setTestGiaGoiKham] = useState();
  const [testTenPhuHuynh, setTestTenPhuHuynh] = useState();
  const [testEmail, setTestEmail] = useState();
  const [testPhone, setTestPhone] = useState();
  const [testTenTre, setTestTenTre] = useState();
  const [testGoiTinh, setGoiTinh] = useState();
  const [testNgaySinh, setNgaySinh] = useState();
  const [testDiaChi, setTestDiaChi] = useState();

  const dispatch = useDispatch();

  const userId = useParams();
  const doctorId = userId?.userId;

  const parent = JSON.parse(localStorage.getItem("parent"));
  const patientId1 = parent?.parentDataToPatient;

  const params = {
    doctorId: doctorId,
    userId: userId.userId,
    patientId: newCreateParentId,
    medicalpackageId: medicalpackageId,
    registerDate: registerDate,
    timeslotId: timeslotId,
    bookingDate: bookingDate,
    arrivalDate: registerDate,
    newCreateParentId: newCreateParentId,
    scheduleId: scheduleId,
  };

  const check = useSelector(dataCheck);
  const user = useSelector(dataGetAUser);
  const dataAllGoiKham = useSelector(dataGetAllGoiKham);
  const dataFindSchedule = useSelector(dataGetFindSchedule);
  const dataFindTimeslot = useSelector(dataGetFindTimeslot);

  useEffect(() => {
    dispatch(getAllGoiKhamAPI());
    dispatch(getGoiKhamAPI());
    dispatch(getAUserAPI(userId.userId));
    dispatch(getFindScheduleToDoctorAPI(userId.userId));
    dispatch(getLoginGuestAPI(parent?.parentDataToPatient?.id));
  }, [check]);

  useEffect(() => {
    dataFindSchedule?.schedule?.data &&
      dataFindSchedule?.schedule?.data?.length > 0 &&
      dataFindSchedule?.schedule?.data?.map((item, index) => {
        const kt = XoaTrungTrongMang(item?.registerDate);
        if (kt) {
          mang.push(item?.registerDate);
        }
      });
  }, [dataFindSchedule]);

  const checkTest = useSelector(dataCheck);

  const XoaTrungTrongMang = (date) => {
    for (var i = 0; i < mang.length; i++) {
      if (mang[i].toString() == date.toString()) {
        return false;
      }
    }
    return true;
  };

  const handleFindTimeslot = (item) => {
    const params = {
      registerDate: item,
    };
    dispatch(getFindTimeslotAPI(params));
    setRegisterDate(item);
  };

  const handleGetIdTimeslot = async (timeslotId) => {
    let testkhunggio = await dispatch(getATimeslotAPI(timeslotId));
    let khunggio = testkhunggio.payload.timeslot.timeslot;
    setTestTimeslot(khunggio);
    setTimeslotId(timeslotId);
  };

  const handleFindDetailGoiKham = async (id) => {
    let testchitiet = await dispatch(getGoiKhamAPI(id));
    let test1 = testchitiet.payload.goikham.packageName;
    const testgia =
      testchitiet.payload.goikham.medicalPackageDataToPackagePrice.price;
    setMedicalpackageId(id);
    setTestGoiKham(test1);
    setTestGiaGoiKham(testgia);
  };

  useEffect(() => {
    setNewCreateParentId(parent?.parentDataToPatient[0].id);
  }, [parent?.parentDataToPatient]);

  const date =
    bookingDate.getDate() +
    "-" +
    (bookingDate.getMonth() + 1) +
    "-" +
    bookingDate.getFullYear();

  let imageBase64 = "";
  if (user?.user?.image) {
    imageBase64 = new Buffer(user?.user?.image, "base64").toString("binary");
  }

  const handleCrete = (id) => {
    setNewCreateParentId(id);
  };

  const handletest = (data) => {
    setShowThongTinNguoiDungModal(data);
  };

  const handletest2 = (data2) => {
    setShowThongTinNguoiDungModal(data2);
  };

  const handleDatLich = () => {
    setShowThongTinNguoiDungModal(true);
    props.handleMoLai(false);
  };

  const params2 = {
    testTenPhuHuynh: parent?.name,
    testEmail: parent?.email,
    testPhone: parent?.phone,
    // testTenTre: parent?.patientId?.childrentName,
    testGoiKham: testGoiKham,
    testTimeslot: testTimeslot,
    testGiaGoiKham: testGiaGoiKham,
    registerDate: registerDate,
  };

  return (
    <div className="h-screen bg-slate-50">
      <Header />
      <ToastContainer />
      <div className="w-full pt-28">
        <div className="w-4/5 mx-auto bg-white shadow-lg shadow-sky-200">
          <div className="grid grid-cols-2 p-5">
            <div className="col-span-1 border-y-[1px] border-l-[1px] p-5 relative">
              <div className="flex gap-5">
                <img
                  src={imageBase64}
                  alt=""
                  className=""
                  style={{ height: "200px", width: "200px" }}
                />
                <div className="ml-3">
                  <div className="flex">
                    <span className="text-xl text-slate-600 font-medium">
                      Bác sĩ:
                    </span>
                    <div className="ml-2 text-xl uppercase text-slate-800 font-medium">
                      {user?.user?.name}
                    </div>
                  </div>
                  <div className="text-slate-400">Chuyên khoa Nhi</div>
                  <div className="text-slate-400">Id patient</div>
                  <select
                    className="text-slate-400"
                    onChange={(e) => handleCrete(e.target.value)}
                  >
                    {parent?.parentDataToPatient &&
                      parent?.parentDataToPatient?.length > 0 &&
                      parent?.parentDataToPatient?.map((item, index) => {
                        return (
                          <option key={index} value={item.id}>
                            {item.id}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
              <div className="mt-5">
                <div className="flex">
                  <FiUsers className="mt-1 mr-2 text-sky-500" />
                  <div className="text-slate-700">Lược tư vấn: 10</div>
                </div>
                <div className="flex mt-2">
                  <AiFillStar size={20} className="mt-1 mr-2 text-sky-500" />
                  <div className="text-slate-700">Đánh giá: 5</div>
                </div>
              </div>
            </div>

            <div className="col-span-1 border-y-[1px] border-r-[1px] p-5 relative">
              <div className="font-semibold">Lịch tư vấn trực tuyến:</div>
              <div className="my-4">
                <label htmlFor="" className="text-slate-700">
                  Ngày tư vấn:
                </label>
                <select
                  className="h-10 border p-1 mt-1 ml-5 bg-green-300 outline-slate-300"
                  id=""
                  onClick={(e) => handleFindTimeslot(e.target.value)}
                >
                  {mang &&
                    mang?.length > 0 &&
                    mang?.map((item, index) => {
                      let day = "";
                      day = moment(item).format("YYYY-MM-DD");
                      return (
                        <option key={index} value={item}>
                          {day}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="my-4">
                <label htmlFor="" className="text-slate-700">
                  Khung giờ tư vấn
                </label>
                <div className="flex">
                  {dataFindTimeslot?.data &&
                    dataFindTimeslot?.data.length > 0 &&
                    dataFindTimeslot?.data.map((item, index) => {
                      return (
                        <div
                          key={index}
                          value={item.timeslotId}
                          onClick={() => handleGetIdTimeslot(item.timeslotId)}
                          className="border p-2 bg-sky-200 hover:bg-sky-300 w-fit rounded-md mr-3 mt-2 cursor-pointer"
                        >
                          {item?.timeSlotDataToSchedule?.timeslot}
                        </div>
                      );
                    })}
                </div>
              </div>

              <div className="my-4">
                <label htmlFor="" className="text-slate-700">
                  Chọn gói tư vấn
                </label>
                <select
                  className="w-full h-10 border rounded-md p-2 mt-1 bg-slate-50 outline-slate-300"
                  id=""
                  onClick={(event) =>
                    handleFindDetailGoiKham(event.target.value)
                  }
                >
                  {dataAllGoiKham.goikham &&
                    dataAllGoiKham.goikham.length > 0 &&
                    dataAllGoiKham.goikham.map((item, index) => {
                      return (
                        <option key={index} value={item.id}>
                          {item.packageName}
                        </option>
                      );
                    })}
                </select>
                <div className="">
                  <DetailServiceModal />
                </div>
              </div>

              <div className="mt-10 w-full text-right">
                <button
                  onClick={() => handleDatLich()}
                  className="rounded px-6 py-3 font-semibold text-white hover:text-black
                                                               bg-green-600 hover:bg-white hover:border-2
                                                               hover:border-green-600 mr-auto "
                >
                  ĐẶT LỊCH
                </button>
              </div>

              {showThongTinNguoiDungModal && parent === null ? (
                <>
                  <TaoThongTinNguoiDungModal
                    openModal={showThongTinNguoiDungModal}
                    hanldeParent={handletest}
                  />
                </>
              ) : (
                <>
                  {showThongTinNguoiDungModal && parent !== null ? (
                    <XemChiTietLichModal
                      openModal={showThongTinNguoiDungModal}
                      params2={params2}
                      params={params}
                      hanldeCloseThongTin={handletest2}
                    />
                  ) : null}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full py-10 bg-slate-50">
        <div className="w-4/5 mx-auto bg-green-200">
          <div className="grid grid-cols-1 p-5">
            <div className="col-span-1 shadow-lg border-[1px] p-5 relative">
              <div
                className=""
                dangerouslySetInnerHTML={{ __html: user?.user?.contentHTML }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DetailDoctorHome;