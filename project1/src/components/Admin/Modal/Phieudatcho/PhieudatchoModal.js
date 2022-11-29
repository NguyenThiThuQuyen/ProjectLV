import { useState, useEffect } from "react";
import { BsPlusLg, BsSearch } from "react-icons/bs";
import Select from "react-select";
import moment from "moment";
import { createPhieudatchoAPI } from "../../../../redux/phieudatchoRedux";
import { getATimeslotAPI } from "../../../../redux/timeslotRedux";
import {
  getAllPatientsAPI,
  dataGetAllPatient,
  ArrayPatient,
  dataGetPatient,
  getPatientAPI,
} from "../../../../redux/patientRedux";

import {
  getAllParentsAPI,
  dataGetAllParent,
  getFindAllPatientAPI,
  dataGetFindPatient,
} from "../../../../redux/parentRedux";

import {
  getAllDoctorAPI,
  dataGetDoctor,
} from "../../../../redux/scheduleRedux";
import {
  getAllGoiKhamAPI,
  dataGetAllGoiKham,
  dataGetGoiKham,
  getGoiKhamAPI,
} from "../../../../redux/goiKhamRedux";
import {
  getAllSchedulesAPI,
  getFindScheduleToDoctorAPI,
  dataGetFindSchedule,
  // dataGetAllSchedule,
  getFindTimeslotAPI,
  dataGetFindTimeslot,
  dataFindIdSchedule,
  getFindIdScheduleAPI,
} from "../../../../redux/scheduleRedux";
import { useDispatch, useSelector } from "react-redux";
import { ImDownload3, ImUpload3 } from "react-icons/im";
import { data } from "autoprefixer";
export default function PhieudatchoModal() {
  const [showModal, setShowModal] = useState(false);
  const [bookingDate, setBookingDate] = useState(new Date());
  const [arrivalDate, setArrivalDate] = useState();
  const [registerDate, setRegisterDate] = useState();
  const [status, setStatus] = useState();
  const [medicalpackageId, setMedicalpackageId] = useState();
  const [scheduleId, setScheduleId] = useState();
  const [timeslotId, setTimeslotId] = useState();
  const [patientId, setPatientId] = useState();
  const [parentId, setParentId] = useState("");
  const [email, setEmail] = useState();
  const [doctorId, setDoctorId] = useState();

  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [childrentName, setChildrentName] = useState();
  const [packageName, setPackageName] = useState();
  const [packagePrice, setPackagePrice] = useState();
  const [timeslot, setTimeslot] = useState();
  const params = {
    bookingDate: bookingDate,
    arrivalDate: registerDate,
    status: status,
    medicalpackageId: medicalpackageId,
    scheduleId: scheduleId,
    patientId: patientId,
    doctorId: doctorId,
    userId: doctorId,
    timeslotId: timeslotId,
    registerDate: registerDate,
    email: email,
    parentId: parentId,
    name: name,
    phone: phone,
    childrentName: childrentName,
    testGoiKham: packageName,
    testGiaGoiKham: packagePrice,
    testTimeslot: timeslot,
  };

  const dataFind = useSelector(dataGetFindPatient);
  const dataDoctor = useSelector(dataGetDoctor);
  const dataGoiKham = useSelector(dataGetAllGoiKham);
  const dataFindSchedule = useSelector(dataGetFindSchedule);
  const dataFindTimeslot = useSelector(dataGetFindTimeslot);
  const dataAllParent = useSelector(dataGetAllParent);

  const dataIdSchedule = useSelector(dataFindIdSchedule);
  const dataAPatient = useSelector(dataGetPatient);
  const dataPatient = useSelector(dataGetAllPatient);
  const array1 = useSelector(ArrayPatient);

  const dispatch = useDispatch();
  const [mang, setMang] = useState([]);

  useEffect(() => {
    dispatch(getAllPatientsAPI());
    dispatch(getAllDoctorAPI());
    dispatch(getAllGoiKhamAPI());
    dispatch(getAllSchedulesAPI());
    dispatch(getFindIdScheduleAPI());
    dispatch(getAllParentsAPI());
  }, [showModal]);

  useEffect(() => {
    if (dataAllParent.parents) {
      setParentId(dataAllParent.parents[0].id);
    }
  }, [dataAllParent]);

  useEffect(() => {
    if (parentId) {
      dispatch(getFindAllPatientAPI(parentId));
    }
  }, [parentId]);

  const today = new Date();

  let date2 =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  let day2 = new Date(date2).getTime();

  useEffect(() => {
    dataFindSchedule?.schedule?.data &&
      dataFindSchedule?.schedule?.data?.length > 0 &&
      dataFindSchedule?.schedule?.data?.map((item, index) => {
        const kt = XoaTrungTrongMang(item?.registerDate);
        let temp = new Date(item?.registerDate).getTime();
        if (kt && day2 < temp) {
          mang.push(item?.registerDate);
        }
      });
    const params = {
      registerDate: mang[0],
      userId: doctorId,
    };
    dispatch(getFindTimeslotAPI(params));
  }, [dataFindSchedule]);

  const XoaTrungTrongMang = (date) => {
    for (var i = 0; i < mang.length; i++) {
      if (mang[i].toString() == date.toString()) {
        return false;
      }
    }
    return true;
  };

  const handleClose = () => {
    setMang([]);
    setShowModal(false);
  };

  const handleSave = () => {
    if (
      !email ||
      !patientId ||
      !medicalpackageId ||
      !doctorId ||
      // !arrivalDate ||
      !timeslotId
    ) {
      setShowModal(true);
      alert("Vui lòng nhập đầy đủ thông tin !");
    } else {
      dispatch(createPhieudatchoAPI(params));
      setShowModal(false);
    }
  };

  const handleFindSchedule = (id) => {
    setMang([]);
    dispatch(getFindScheduleToDoctorAPI(id));
    setDoctorId(id);
  };

  const handleFindTimeslot = (item) => {
    const params = {
      registerDate: item,
      userId: doctorId,
    };
    dispatch(getFindTimeslotAPI(params));
    setRegisterDate(item);
  };

  const date =
    bookingDate.getDate() +
    "-" +
    (bookingDate.getMonth() + 1) +
    "-" +
    bookingDate.getFullYear();

  const dateformat = moment(data).format("DD/MM/YYYY");

  const handleFindPatient = async (id) => {
    let dataId = await dispatch(getFindAllPatientAPI(id));
    let findemail = dataId?.payload?.parent[0]?.parentDataToPatient?.email;
    setEmail(findemail);
  };

  const handleFindInfor = async (id) => {
    let dataInfor = await dispatch(getPatientAPI(id));
    let testNameBame = dataInfor?.payload?.patient?.parentDataToPatient?.name;
    setName(testNameBame);
    let testPhone = dataInfor?.payload?.patient?.parentDataToPatient?.phone;
    setPhone(testPhone);
    let testTenTre = dataInfor?.payload?.patient?.childrentName;
    setChildrentName(testTenTre);
  };

  const handleFindGoiKham = async (id) => {
    let goikham = await dispatch(getGoiKhamAPI(id));
    let tengoi = goikham?.payload?.goikham?.packageName;
    setPackageName(tengoi);
    let giatengoi =
      goikham?.payload?.goikham?.medicalPackageDataToPackagePrice?.price;
    setPackagePrice(giatengoi);
  };

  const handleFindKhungGio = async (timeslotId) => {
    let khunggio = await dispatch(getATimeslotAPI(timeslotId));
    let gio = khunggio?.payload?.timeslot?.timeslot;
    let gioId = khunggio?.payload?.timeslot?.id;
    setTimeslot(gio);
    setTimeslotId(gioId);
  };

  return (
    <>
      <div className="mt-4 ml-5">
        <div className="ml-5 flex justify-start">
          <div className="flex items-center border border-scale-200 p-1 rounded">
            <input
              className="border-0 outline-0 bg-transparent"
              type="text"
              placeholder="Tìm kiếm..."
            />
            <BsSearch />
          </div>
        </div>
        <div className="flex">
          <div className="ml-6 mt-8">
            <button
              className="flex text-teal-800 font-medium hover:text-slate-600"
              type="button"
              onClick={() => setShowModal(true)}
            >
              <BsPlusLg className="mr-2 mt-1 text-teal-700" />
              Đặt chỗ
            </button>
          </div>
          <div className="ml-8 mt-8">
            <button
              className="flex text-teal-800 font-medium hover:text-slate-600"
              type="button"
            >
              <ImDownload3 className="mr-2 mt-1 text-teal-700" />
              Xuất excel
            </button>
          </div>
        </div>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-4xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-base font-bold text-slate-500">
                    PHIẾU ĐẶT CHỖ
                  </h3>
                </div>
                <div className="relative p-6 flex-auto">
                  <form className="">
                    <div className="grid auto-rows-auto">
                      <div className="grid row-span-1 grid-cols-3">
                        <div className="col-span-2 flex mx-3 my-4">
                          <label
                            htmlFor=""
                            className="text-slate-600 mt-3 ml-2"
                          >
                            Ngày đặt:
                          </label>
                          <div className="shadow-lg w-1/3 ml-3 h-10 border rounded-lg p-2 mt-1 bg-yellow-600 outline-slate-300 cursor-not-allowed">
                            {dateformat}
                          </div>
                        </div>
                      </div>
                      <div className="grid row-span-1 grid-cols-6">
                        <div className="col-span-3 mx-3 my-4">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            Email
                          </label>

                          <select
                            className="w-full h-11 shadow-md border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                            id=""
                            onClick={(event) =>
                              handleFindPatient(event.target.value)
                            }
                            // onChange={(event) => setEmail()}
                          >
                            {dataAllParent.parents &&
                              dataAllParent.parents.length > 0 &&
                              dataAllParent.parents.map((item, index) => {
                                return (
                                  <option key={item?.email} value={item.id}>
                                    {item?.email}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                        <div className="col-span-3 mx-3 my-4">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            Tên bệnh nhân
                          </label>

                          <select
                            className="w-full h-11 shadow-md border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                            id=""
                            onChange={(event) =>
                              setPatientId(event.target.value)
                            }
                            onClick={(event) =>
                              handleFindInfor(event.target.value)
                            }
                          >
                            {dataFind?.parent &&
                              dataFind?.parent.length > 0 &&
                              dataFind?.parent.map((item, index) => {
                                return (
                                  <option key={index} value={item.id}>
                                    {item.childrentName}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                      </div>
                      <div className="grid row-span-1 grid-cols-6">
                        <div className="col-span-3 mx-3 my-4">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            Gói tư vấn
                          </label>
                          <select
                            className="w-full h-11 shadow-md border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                            id=""
                            onChange={(event) =>
                              setMedicalpackageId(event.target.value)
                            }
                            onClick={(event) =>
                              handleFindGoiKham(event.target.value)
                            }
                          >
                            {dataGoiKham.goikham &&
                              dataGoiKham.goikham.length > 0 &&
                              dataGoiKham.goikham.map((item, index) => {
                                return (
                                  <option key={index} value={item.id}>
                                    {item.packageName}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                        <div className="col-span-3 mx-3 my-4">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            Bác sĩ tư vấn
                          </label>
                          <select
                            className="w-full h-11 shadow-md border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                            id=""
                            onClick={(e) => handleFindSchedule(e.target.value)}
                          >
                            {dataDoctor.doctor.data &&
                              dataDoctor.doctor.data.length > 0 &&
                              dataDoctor.doctor.data.map((item, index) => {
                                return (
                                  <option key={index} value={item.id}>
                                    <div>{item.name}</div>
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                      </div>

                      <div className="grid row-span-1 grid-cols-3">
                        <div className="col-span-2 flex mx-3 my-4">
                          <label
                            htmlFor=""
                            className="text-slate-600 mt-3 ml-2"
                          >
                            Chọn ngày tư vấn:
                          </label>
                          <select
                            className="w-1/3 ml-3 h-10 border rounded-lg p-2 mt-1 outline-slate-300 bg-green-500 shadow-lg"
                            id=""
                            onClick={(e) => handleFindTimeslot(e.target.value)}
                          >
                            {mang &&
                              mang?.length > 0 &&
                              mang?.map((item, index) => {
                                let day = "";
                                day = moment(item).format("DD/MM/YYYY");
                                return (
                                  <option key={index} value={item}>
                                    {day}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                      </div>

                      <div className="grid row-span-1 grid-cols-6">
                        <div className="col-span-6 mx-3 my-4">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            Khung giờ tư vấn
                          </label>
                          <div className="row-auto grid grid-cols-8">
                            {dataFindTimeslot?.data &&
                              dataFindTimeslot?.data.length > 0 &&
                              dataFindTimeslot?.data.map((item, index) => {
                                return (
                                  <>
                                    {item?.soluongdangky >= 1 ? (
                                      <>
                                        <div
                                          key={index}
                                          value={item.timeslotId}
                                          title="Đã hết chỗ"
                                          className="col-span-2 border p-2 bg-red-400 w-fit rounded-md mr-3 mt-2 cursor-not-allowed"
                                        >
                                          {
                                            item?.timeSlotDataToSchedule
                                              ?.timeslot
                                          }
                                        </div>
                                      </>
                                    ) : (
                                      <div
                                        key={index}
                                        value={item.timeslotId}
                                        onClick={() =>
                                          handleFindKhungGio(item.timeslotId)
                                        }
                                        className={
                                          item.timeslotId == timeslotId
                                            ? "col-span-2 border p-2 bg-sky-400 hover:bg-sky-300 w-fit rounded-md mr-3 mt-2 cursor-pointer"
                                            : "col-span-2 border p-2 bg-sky-200 hover:bg-sky-300 w-fit rounded-md mr-3 mt-2 cursor-pointer"
                                        }
                                      >
                                        {item?.timeSlotDataToSchedule?.timeslot}
                                      </div>
                                    )}
                                  </>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-white-600 text-red-600 hover:text-white hover:bg-red-500 hover font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleClose(false)}
                  >
                    ĐÓNG
                  </button>
                  <button
                    className="bg-green-600 text-white active:bg-green-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleSave()}
                  >
                    LƯU THÔNG TIN
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
