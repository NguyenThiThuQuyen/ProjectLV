import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Navbar from "../../components/Admin/Navbar";
import TimeslotModal from "../../components/Admin/Modal/Timeslot/TimeslotModal";
import TimeslotModalEdit from "../../components/Admin/Modal/Timeslot/TimeslotEditModal";
import { RiDeleteBinLine } from "react-icons/ri";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllTimeslotAPI,
  datagetAllTimeslot,
  dataCheck,
  deleteTimeslotAPI,
} from "../../redux/timeslotRedux";

const TimeslotManager = () => {
  const dispatch = useDispatch();
  const data = useSelector(datagetAllTimeslot);
  const check = useSelector(dataCheck);

  useEffect(() => {
    dispatch(getAllTimeslotAPI());
  }, [check]);

  const handleDelete = (id) => {
    dispatch(deleteTimeslotAPI(id));
  };

  return (
    <>
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-initial w-5/6">
          <Navbar />
          <ToastContainer />
          <TimeslotModal />
          {/* <TableUser /> */}
          <div className="w-full px-10 py-3">
            <table className="border border-slate-200">
              <thead>
                <tr className="border border-slate-200 bg-green-600">
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Khung giờ
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Điều chỉnh
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.timeslot &&
                  data.timeslot.length > 0 &&
                  data.timeslot.map((item, index) => {
                    return (
                      <tr key={item.id} className="hover:bg-slate-200">
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item.timeslot}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          <div className="flex">
                            <div className="mr-3" title="Sửa">
                              <TimeslotModalEdit item={item} />
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

export default TimeslotManager;
