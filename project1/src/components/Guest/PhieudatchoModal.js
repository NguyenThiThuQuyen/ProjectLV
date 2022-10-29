import { useState, useEffect } from "react";
import { BsPlusLg, BsSearch } from "react-icons/bs";
import Select from "react-select";
import moment from "moment";

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
  // const [userId, setUserId] = useState();
  const [doctorId, setDoctorId] = useState();
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
  };

  const date =
    bookingDate.getDate() +
    "-" +
    (bookingDate.getMonth() + 1) +
    "-" +
    bookingDate.getFullYear();

  // console.log("date: " + date);

  return (
    <>
      <div className="mt-4 ml-5">

      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-6xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="text-center">
                  <div className="text-orange-600 text-xl font-bold text-center">
                    Hotline: 012-345-678
                  </div>
                  <div className="text-green-700 font-bold">
                    Mở cửa: 7h30 - 17h / T2 - CN
                  </div>
                </div>
                <div className="flex items-start justify-between px-5 border-b border-solid border-slate-200">
                  <div className="text-slate-500">
                    <h3 className="text-base font-bold">ĐẶT LỊCH TƯ VẤN</h3>
                  </div>
                </div>
                <div className="relative p-6 flex-auto">
                  <form className="">
                    <div className="grid grid-rows-3">
                      <div className="grid row-span-1 grid-cols-3">
                        <div className="col-span-1 mx-3 flex">
                          <div className="">
                            <label
                              htmlFor=""
                              className="text-green-600 text-md ml-2"
                            >
                              Ngày đăng ký tư vấn:
                            </label>
                          </div>
                          <div className="ml-2">{date}</div>
                        </div>
                      </div>
                      <div className="grid row-span-1 grid-cols-3">
                        <div className="col-span-1 mx-3 my-4">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            Tên bệnh nhân
                          </label>
                          <select
                            className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                            id=""
                            onChange={(event) =>
                              setPatientId(event.target.value)
                            }
                          ></select>
                        </div>
                        <div className="col-span-2 mx-3 my-4">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            Gói tư vấn
                          </label>
                          <select
                            className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                            id=""
                            onChange={(event) =>
                              setMedicalpackageId(event.target.value)
                            }
                          ></select>
                        </div>
                      </div>
                      <div
                        className="grid row-span-1 grid-cols-3"
                        // onChange={(event) => setScheduleId(event.target.value)}
                      >
                        <div className="col-span-1 mx-3 my-4">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            Bác sĩ tư vấn
                          </label>
                          <select
                            className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                            id=""
                            // value={doctorId}
                            // onChange={(event) =>
                            //   setDoctorId(event.target.value)
                            // }
                            // onClick={(e) => handleFindSchedule(e.target.value)}
                          ></select>
                        </div>
                        <div className="col-span-1 mx-3 my-4">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            Ngày tư vấn
                          </label>
                          <select
                            className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                            id=""
                            // onChange={(event) =>
                            //   setRegisterDate(event.target.value)
                            // }
                            // onClick={(e) => handleFindTimeslot(e.target.value)}
                          ></select>
                        </div>
                        <div className="col-span-1 mx-3 my-4">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            Khung giờ tư vấn
                          </label>
                          <select
                            className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                            id=""
                            onClick={(event) =>
                              setTimeslotId(event.target.value)
                            }
                          ></select>
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
                    // onClick={() => handleSave()}
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
