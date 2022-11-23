import { useState, useEffect } from "react";
import Navbar from "../../components/Admin/Navbar";
import Sidebar from "../../components/Admin/Sidebar";
import ScheduleModalEdit from "../../components/Admin/Modal/Schedule/ScheduleEditModal";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import moment from "moment";
import { Buffer } from "buffer";
import {
  getAScheduleAPI,
  dataGetSchedule,
  dataCheck,
} from "../../redux/scheduleRedux";
const ScheduleSingle = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const check = useSelector(dataCheck);
  const schedule = useSelector(dataGetSchedule);
  useEffect(() => {
    dispatch(getAScheduleAPI(params.scheduleId));
  }, [check]);

  let imageBase64 = "";
  if (schedule?.schedule?.userDataToSchedule?.image) {
    imageBase64 = new Buffer(
      schedule?.schedule?.userDataToSchedule?.image,
      "base64"
    ).toString("binary");
  }

  let dateSchedule = "";
  dateSchedule = moment(schedule?.schedule?.registerDate).format("YYYY-MM-DD");

  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="flex-initial w-5/6">
        <Navbar />
        <div className="grid grid-cols-2 p-5">
          <div className="col-span-1 shadow-xl border-[1px] p-5 relative">
            <div className="flex pl-2 absolute top-0 right-0 px-3 py-1.5 text-xs text-indigo-600 bg-slate-200 cursor-pointer rounded-[3px]">
              <ScheduleModalEdit item={schedule?.schedule} />
              Edit
            </div>
            <h1 className="mb-3 font-medium text-sm text-slate-600">
              THÔNG TIN LỊCH TƯ VẤN
            </h1>
            <div className="flex gap-5">
              <img
                src={imageBase64}
                alt=""
                className="rounded-full"
                style={{ height: "90px", width: "90px" }}
              />
              <div className="ml-3">
                <div className="mb-2 text-sm">
                  <span className="font-bold text-slate-500">
                    Bác sĩ tư vấn:
                  </span>
                  <span className="font-normal ml-2">
                    {schedule?.schedule?.userDataToSchedule?.name}
                  </span>
                </div>
                <div className="mb-2 text-sm">
                  <span className="font-bold text-slate-500">Ngày tư vấn:</span>
                  <span className="font-normal ml-2 bg-red-300 p-1 rounded-md">
                    {dateSchedule}
                  </span>
                </div>
                <div className="mb-2 text-sm">
                  <span className="font-bold text-slate-500">
                    Khung giờ tư vấn:
                  </span>
                  <span className="font-normal ml-2 bg-green-300 p-1 rounded-md">
                    {schedule?.schedule?.timeSlotDataToSchedule.timeslot}
                  </span>
                </div>

                <h1 className="mb-2	text-slate-900 font-base mt-5 italic">
                  Thông tin liên hệ bác sĩ
                </h1>
                <div className="mb-2 text-sm">
                  <span className="font-medium text-slate-500">Email:</span>
                  <span className="font-normal ml-2">
                    {schedule?.schedule?.userDataToSchedule?.email}
                  </span>
                </div>
                <div className="mb-2 text-sm">
                  <span className="font-medium text-slate-500">
                    Điện thoại:
                  </span>
                  <span className="font-normal ml-2">
                    {schedule?.schedule?.userDataToSchedule?.phone}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleSingle;
