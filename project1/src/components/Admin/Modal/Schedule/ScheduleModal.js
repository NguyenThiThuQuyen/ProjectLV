import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsPlusLg, BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { ImDownload3, ImUpload3 } from "react-icons/im";
import {
  createScheduleAPI,
  getAllDoctorAPI,
  dataGetDoctor,
  dataCheck,
  //   deletePatientAPI,
} from "../../../../redux/scheduleRedux";

import {
  getAllTimeslotAPI,
  datagetAllTimeslot,
} from "../../../../redux/timeslotRedux";

export default function ScheduleModal() {
  const [showModal, setShowModal] = useState(false);
  const [registerDate, setRegisterDate] = useState();
  const [timeslotId, setTimeslotId] = useState();
  const [userId, setUserId] = useState();

  const dataDoctor = useSelector(dataGetDoctor);
  const dataTimeslot = useSelector(datagetAllTimeslot);
  const check = useSelector(dataCheck);

  const params = {
    registerDate: registerDate,
    timeslotId: timeslotId,
    userId: userId,
  };

  useEffect(() => {
    dispatch(getAllTimeslotAPI());
    dispatch(getAllDoctorAPI());
  }, [check]);

  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(createScheduleAPI(params));
    setShowModal(false);
  };

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
              Thêm lịch tư vấn
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
                    THÊM LỊCH TRÌNH
                  </h3>
                </div>
                <div className="relative p-6 flex-auto">
                  <form className="">
                    <div className="grid grid-rows-2">
                      <div className="grid row-span-1 grid-cols-2">
                        <div className="col-span-1 mx-3 my-4">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            Tên bác sĩ
                          </label>
                          <select
                            className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                            id=""
                            onChange={(event) => setUserId(event.target.value)}
                          >
                            {dataDoctor.doctor.data &&
                              dataDoctor.doctor.data.length > 0 &&
                              dataDoctor.doctor.data.map((item, index) => {
                                return (
                                  <option key={index} value={item.id}>
                                    {item.name}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                        <div className="col-span-1 mx-3 my-4">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            Khung giờ
                          </label>
                          <select
                            className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                            id=""
                            onChange={(event) =>
                              setTimeslotId(event.target.value)
                            }
                          >
                            {dataTimeslot.timeslot &&
                              dataTimeslot.timeslot.length > 0 &&
                              dataTimeslot.timeslot.map((item, index) => {
                                return (
                                  <option key={index} value={item.id}>
                                    {item.timeslot}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                      </div>
                      <div className="grid row-span-1 grid-cols-2">
                        <div className="col-span-1 mx-3 my-4">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            Ngày sinh
                          </label>
                          <DatePicker
                            className="w-full border border-2 p-2 rounded-lg mt-1 bg-slate-100 outline-slate-300"
                            selected={registerDate}
                            onChange={(date) => setRegisterDate(date)}
                            dateFormat="yyyy/MM/dd"
                            minDate={new Date()}
                            isClearable
                            showYearDropdown
                            scrollableMonthYearDropdown
                          />
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
