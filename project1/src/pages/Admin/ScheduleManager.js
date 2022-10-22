import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Navbar from "../../components/Admin/Navbar";
import ScheduleModal from "../../components/Admin/Modal/Schedule/ScheduleModal";
import ScheduleModalEdit from "../../components/Admin/Modal/Schedule/ScheduleEditModal";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineEye } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSchedulesAPI,
  dataGetAllSchedule,
  dataCheck,
  deleteScheduleAPI,
  getAScheduleAPI,
} from "../../redux/scheduleRedux";

const ScheduleManager = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector(dataGetAllSchedule);
  const check = useSelector(dataCheck);

  useEffect(() => {
    dispatch(getAllSchedulesAPI());
  }, [check]);

  const handleDelete = (id) => {
    dispatch(deleteScheduleAPI(id));
  };

  const handleDetail = (scheduleId) => {
    navigate(`/admin/schedule-detail/${scheduleId}`);
    dispatch(getAScheduleAPI(scheduleId));
  };

  return (
    <>
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-initial w-5/6">
          <Navbar />
          {/* <ToastContainer /> */}
          <ScheduleModal />
          {/* <TableUser /> */}
          <div className="w-full px-10 py-3">
            <table className="border border-slate-200">
              <thead>
                <tr className="border border-slate-200 bg-green-600">
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Tên bác sĩ
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Ngày tư vấn
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Khung giờ TV
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Điều chỉnh
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.schedules &&
                  data?.schedules?.length > 0 &&
                  data?.schedules?.map((item, index) => {
                    let day = "";
                    day = moment(item?.registerDate).format(
                      "dddd - DD/MM/YYYY"
                    );
                    return (
                      <tr key={item?.id}>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item?.userDataToSchedule?.name}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {day}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item?.timeSlotDataToSchedule?.timeslot}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          <div className="flex">
                            <div
                              className=""
                              onClick={() => handleDetail(item.id)}
                            >
                              <AiOutlineEye className="cursor-pointer text-lg text-green-700" />
                            </div>
                            <div className="mr-3" title="Sửa">
                              <ScheduleModalEdit item={item} />
                            </div>
                            <div
                              className=""
                              title="Xóa"
                              onClick={() => handleDelete(item.id)}
                            >
                              <RiDeleteBinLine className="cursor-pointer text-lg text-red-700" />
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScheduleManager;
