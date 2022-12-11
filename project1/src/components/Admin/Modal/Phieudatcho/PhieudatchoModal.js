import { useState, useEffect } from "react";
import { BsPlusLg, BsSearch } from "react-icons/bs";
import Select from "react-select";
import moment from "moment";
import logo from "../../../../assets/upload/logo.png";
import { createPhieudatchoAPI } from "../../../../redux/phieudatchoRedux";
import { getATimeslotAPI } from "../../../../redux/timeslotRedux";
import {
  getAllPatientsAPI,
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
  getGoiKhamAPI,
} from "../../../../redux/goiKhamRedux";
import {
  getAllSchedulesAPI,
  getFindScheduleToDoctorAPI,
  dataGetFindSchedule,
  getFindTimeslotAPI,
  dataGetFindTimeslot,
  getFindIdScheduleAPI,
} from "../../../../redux/scheduleRedux";
import { useDispatch, useSelector } from "react-redux";
import { data } from "autoprefixer";
export default function PhieudatchoModal(props) {
  const [showModal, setShowModal] = useState(false);
  const [bookingDate, setBookingDate] = useState(new Date());
  const [mangTim, setMangTim] = useState([]);
  const [mangGoiKham, setMangGoiKham] = useState([]);
  const [mangBacSi, setMangBacSi] = useState([]);
  const [mangBenhNhan, setMangBenhNhan] = useState([]);
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
        if (kt && day2 <= temp) {
          mang.push(item?.registerDate);
        }
      });
    if (dataFindSchedule?.schedule?.data?.length > 0) {
      const params = {
        registerDate: mang[0],
        userId: doctorId,
      };
      dispatch(getFindTimeslotAPI(params));
    }
  }, [dataFindSchedule]);

  const XoaTrungTrongMang = (date) => {
    for (var i = 0; i < mang.length; i++) {
      if (mang[i].toString() == date.toString()) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    let arr = [];
    dataAllParent.parents &&
      dataAllParent.parents.length > 0 &&
      dataAllParent.parents.map((item, index) => {
        const options = { value: item.id, label: item.phone };
        arr.push(options);
      });
    setMangTim(arr);
  }, [dataAllParent]);

  useEffect(() => {
    let arr = [];
    dataGoiKham?.goikham &&
      dataGoiKham?.goikham.length > 0 &&
      dataGoiKham?.goikham.map((item, index) => {
        const options = { value: item.id, label: item.packageName };
        arr.push(options);
      });
    setMangGoiKham(arr);
  }, [dataGoiKham]);

  useEffect(() => {
    let arr = [];
    dataDoctor?.doctor?.data &&
      dataDoctor?.doctor?.data.length > 0 &&
      dataDoctor?.doctor?.data.map((item, index) => {
        const options = { value: item.id, label: item.name };
        arr.push(options);
      });
    setMangBacSi(arr);
  }, [dataDoctor]);

  useEffect(() => {
    let arr = [];
    dataFind?.parent &&
      dataFind?.parent.length > 0 &&
      dataFind?.parent.map((item, index) => {
        const options = { value: item.id, label: item.childrentName };
        arr.push(options);
      });
    setMangBenhNhan(arr);
  }, [dataFind]);

  useEffect(() => {
    setShowModal(true);
  }, [props?.openModal === true]);

  const handleClose = () => {
    setMang([]);
    setShowModal(false);
    props.handleClose(false);
  };

  const handleSave = () => {
    if (!email || !patientId || !medicalpackageId || !doctorId || !timeslotId) {
      setShowModal(true);
      alert("Vui lòng nhập đầy đủ thông tin !");
    } else {
      dispatch(createPhieudatchoAPI(params));
      setShowModal(false);
      props.handleMo(false);
    }
  };

  const handleFindSchedule = (item) => {
    setMang([]);
    dispatch(getFindScheduleToDoctorAPI(item.value));
    setDoctorId(item.value);
  };

  const handleFindTimeslot = (item) => {
    const params = {
      registerDate: item,
      userId: doctorId,
    };
    dispatch(getFindTimeslotAPI(params));
    setRegisterDate(item);
  };

  const dateformat = moment(data).format("DD/MM/YYYY");

  const handleFindPatient = async (item) => {
    let dataId = await dispatch(getFindAllPatientAPI(item?.value));
    let findemail = dataId?.payload?.parent[0]?.parentDataToPatient?.email;
    let findphone = dataId?.payload?.parent[0]?.parentDataToPatient?.phone;
    setEmail(findemail);
    setPhone(findphone);
  };

  const handleFindInfor = async (item) => {
    setPatientId(item.value);
    let dataInfor = await dispatch(getPatientAPI(item.value));
    let testNameBame = dataInfor?.payload?.patient?.parentDataToPatient?.name;
    setName(testNameBame);
    let testPhone = dataInfor?.payload?.patient?.parentDataToPatient?.phone;
    setPhone(testPhone);
    let testTenTre = dataInfor?.payload?.patient?.childrentName;
    setChildrentName(testTenTre);
  };

  const handleFindGoiKham = async (item) => {
    setMedicalpackageId(item.value);
    let goikham = await dispatch(getGoiKhamAPI(item.value));
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
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto max-w-4xl w-full">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between px-5 py-3 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-base font-bold text-slate-500">
                    PHIẾU ĐẶT CHỖ
                  </h3>
                  <img src={logo} alt="" className="h-[1.8rem] " />
                </div>
                <div className="relative p-6 flex-auto">
                  <form className="">
                    <div className="grid row-auto">
                      <div className="grid row-span-1">
                        <div className="grid grid-cols-3">
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
                      </div>
                      <div className="grid row-span-1">
                        <div className="grid grid-cols-6">
                          <div className="col-span-3 mx-3 my-4">
                            <label htmlFor="" className="text-slate-600 ml-2">
                              Số điện thoại
                            </label>
                            <Select
                              className="w-full"
                              options={mangTim}
                              onChange={handleFindPatient}
                            />
                          </div>
                          <div className="col-span-3 mx-3 my-4">
                            <label htmlFor="" className="text-slate-600 ml-2">
                              Tên bệnh nhân
                            </label>
                            <Select
                              className="w-full"
                              options={mangBenhNhan}
                              onChange={handleFindInfor}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid row-span-1">
                        <div className="grid grid-cols-6">
                          <div className="col-span-3 mx-3 my-4">
                            <label htmlFor="" className="text-slate-600 ml-2">
                              Gói tư vấn
                            </label>
                            <Select
                              className="w-full"
                              options={mangGoiKham}
                              onChange={handleFindGoiKham}
                            />
                          </div>
                          <div className="col-span-3 mx-3 my-4">
                            <label htmlFor="" className="text-slate-600 ml-2">
                              Bác sĩ tư vấn
                            </label>
                            <Select
                              className="w-full"
                              options={mangBacSi}
                              onChange={handleFindSchedule}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid row-span-1">
                        <div className="grid-cols-3">
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
                              onClick={(e) =>
                                handleFindTimeslot(e.target.value)
                              }
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
                      </div>

                      <div className="grid row-span-1">
                        <div className="grid-cols-6 h-[100px]">
                          <div className="col-span-6 mx-3 my-4 ">
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
                                          {
                                            item?.timeSlotDataToSchedule
                                              ?.timeslot
                                          }
                                        </div>
                                      )}
                                    </>
                                  );
                                })}
                            </div>
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
