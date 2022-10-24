import { useState, useEffect } from "react";
import { BsPlusLg, BsSearch } from "react-icons/bs";
import Select from "react-select";
import moment from "moment";
import { createPhieudatchoAPI } from "../../../../redux/phieudatchoRedux";
import {
  getAllPatientsAPI,
  dataGetAllPatient,
  ArrayPatient,
} from "../../../../redux/patientRedux";
import {
  getAllDoctorAPI,
  dataGetDoctor,
} from "../../../../redux/scheduleRedux";
import {
  getAllGoiKhamAPI,
  dataGetAllGoiKham,
} from "../../../../redux/goiKhamRedux";
import {
  getAllSchedulesAPI,
  getFindScheduleToDoctorAPI,
  dataGetFindSchedule,
  dataGetAllSchedule,
  getFindTimeslotAPI,
  dataGetFindTimeslot,
} from "../../../../redux/scheduleRedux";
import { useDispatch, useSelector } from "react-redux";
import { ImDownload3, ImUpload3 } from "react-icons/im";
import { data } from "autoprefixer";
export default function PhieudatchoModal() {
  const [showModal, setShowModal] = useState(false);
  const [bookingDate, setBookingDate] = useState();
  const [arrivalDate, setArrivalDate] = useState();
  const [status, setStatus] = useState();
  const [medicalpackageId, setMedicalpackageId] = useState();
  const [scheduleId, setScheduleId] = useState();
  const [patientId, setPatientId] = useState();
  const [doctorId, setDoctorId] = useState();
  const [array, setArray] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const params = {
    bookingDate: bookingDate,
    arrivalDate: arrivalDate,
    status: status,
    medicalpackageId: medicalpackageId,
    scheduleId: scheduleId,
    patientId: patientId,
    doctorId: doctorId,
  };

  const dataDoctor = useSelector(dataGetDoctor);
  const dataGoiKham = useSelector(dataGetAllGoiKham);
  const dataFindSchedule = useSelector(dataGetFindSchedule);
  const dataFindTimeslot = useSelector(dataGetFindTimeslot);

  console.log("dataFindTimeslot", dataFindTimeslot);
  console.log("dataFindSchedule", dataFindSchedule);
  console.log("dataDoctor", dataDoctor);
  // console.log("dataSchedule", dataSchedule);

  const dispatch = useDispatch();
  const dataPatient = useSelector(dataGetAllPatient);
  const array1 = useSelector(ArrayPatient);
  // console.log(array1);
  useEffect(() => {
    dispatch(getAllPatientsAPI());
    dispatch(getAllDoctorAPI());
    dispatch(getAllGoiKhamAPI());
    dispatch(getAllGoiKhamAPI());
    dispatch(getAllSchedulesAPI());
    dispatch(getFindScheduleToDoctorAPI());
  }, [showModal]);

  const handleSave = () => {
    dispatch(createPhieudatchoAPI(params));
    setShowModal(false);
  };

  const handleFindSchedule = (id) => {
    console.log("id", id);
    dispatch(getFindScheduleToDoctorAPI(id));
  };

  const handleFindTimeslot = (id) => {
    console.log("id timeslot", id);
    dispatch(getFindTimeslotAPI(id));
  };

  // const handleUnique = (arr) => {
  //   let newArr = [];
  //   for (var i = 0; i < arr.dataFindSchedule.schedule.data.length; i++) {
  //     if (newArr.indexOf(arr[i]) === -1) {
  //       newArr.push(arr[i]);
  //     }
  //   }
  //   return newArr;
  // };
  // console.log("handle unique:", handleUnique);

  return (
    <>
      <div className="mt-4 ml-5">
        <div className="ml-5 flex justify-start">
          <div className="flex items-center border border-scale-200 p-1 rounded">
            <input
              className="border-0 outline-0 bg-transparent"
              type="text"
              placeholder="Search..."
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
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-base font-bold text-slate-500">
                    ĐẶT CHỖ
                  </h3>
                </div>
                <div className="relative p-6 flex-auto">
                  <form className="">
                    <div className="grid grid-rows-2">
                      <div className="grid row-span-1 grid-cols-3">
                        <div className="col-span-1 mx-3 my-4">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            Tên bệnh nhân
                          </label>
                          {/* <Select
                            className="w-full h-10 mt-1"
                            id=""
                            onChange={(event) =>
                              setPatientId(event.target.value)
                            }
                            options={unique}
                          /> */}
                          <select
                            className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                            id=""
                            onChange={(event) =>
                              setPatientId(event.target.value)
                            }
                          >
                            {dataPatient.patients &&
                              dataPatient.patients.length > 0 &&
                              dataPatient.patients.map((item, index) => {
                                return (
                                  <option key={index} value={item.id}>
                                    {item.childrentName}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                        <div className="col-span-1 mx-3 my-4">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            Gói tư vấn
                          </label>
                          <select
                            className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                            id=""
                            onChange={(event) =>
                              setMedicalpackageId(event.target.value)
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
                        <div className="col-span-1 mx-3 my-4">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            Bác sĩ tư vấn
                          </label>
                          <select
                            className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                            id=""
                            // value={doctorId}
                            onChange={(event) =>
                              setDoctorId(event.target.value)
                            }
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
                        <div className="col-span-1 mx-3 my-4">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            Ngày tư vấn
                          </label>
                          <select
                            className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                            id=""
                            onChange={(event) =>
                              setScheduleId(event.target.value)
                            }
                            onClick={(e) => handleFindTimeslot(e.target.value)}
                          >
                            {dataFindSchedule.schedule.data &&
                              dataFindSchedule.schedule.data.length > 0 &&
                              dataFindSchedule.schedule.data.map(
                                (item, index) => {
                                  let day = [];
                                  day = moment(item.registerDate).format(
                                    "YYYY-MM-DD"
                                  );
                                  let newArr1111111 = [...day];
                                  console.log("newArr1111111", newArr1111111);
                                  return (
                                    <option key={index} value={item.id}>
                                      {day}
                                    </option>
                                  );
                                }
                              )}
                          </select>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleSave()}
                  >
                    Save Changes
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
