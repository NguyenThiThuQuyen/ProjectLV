import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsPlusLg } from "react-icons/bs";
import {
  editScheduleAPI,
  dataGetDoctor,
} from "../../../../redux/scheduleRedux";
import { datagetAllTimeslot } from "../../../../redux/timeslotRedux";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
export default function ScheduleModalEdit(props) {
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [registerDate, setRegisterDate] = useState();
  const [timeslotId, setTimeslotId] = useState();
  const [userId, setUserId] = useState();
  const [id, setId] = useState();
  const dataDoctor = useSelector(dataGetDoctor);

  const dataTimeslot = useSelector(datagetAllTimeslot);

  const params = {
    registerDate: registerDate,
    timeslotId: timeslotId,
    userId: userId,
    id: id,
  };

  const dispatch = useDispatch();
  useEffect(() => {
    let date = new Date(props?.item?.registerDate);
    setRegisterDate(date);
    setTimeslotId(props?.item?.timeSlotDataToSchedule?.id);
    setUserId(props?.item?.userDataToSchedule?.id);
    setId(props?.item?.id);
  }, [props?.item]);

  const handleSaveEdit = () => {
    dispatch(editScheduleAPI(params));
    setShowModalEdit(false);
  };

  return (
    <>
      <div className="ml-5">
        <button type="button" onClick={() => setShowModalEdit(true)}>
          <BiEdit className="cursor-pointer text-lg text-blue-600" />
        </button>
      </div>
      {showModalEdit ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-base font-bold text-slate-500">
                    SỬA LỊCH TƯ VẤN
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
                            required
                            value={userId}
                            onChange={(event) => setUserId(event.target.value)}
                          >
                            {dataDoctor?.doctor?.data &&
                              dataDoctor?.doctor?.data?.length > 0 &&
                              dataDoctor?.doctor?.data?.map((item, index) => {
                                return (
                                  <option key={index} value={item.id}>
                                    {item?.name}
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
                            required
                            value={timeslotId}
                            onChange={(event) =>
                              setTimeslotId(event.target.value)
                            }
                          >
                            {dataTimeslot?.timeslot &&
                              dataTimeslot?.timeslot?.length > 0 &&
                              dataTimeslot?.timeslot?.map((item, index) => {
                                return (
                                  <option key={index} value={item.id}>
                                    {item?.timeslot}
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
                            value={registerDate}
                            required
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
                    className="bg-white-600 text-red-600 hover:text-white hover:bg-red-500 hover font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModalEdit(false)}
                  >
                    ĐÓNG
                  </button>
                  <button
                    className="bg-green-600 text-white active:bg-green-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleSaveEdit()}
                  >
                    Lưu thông tin
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
