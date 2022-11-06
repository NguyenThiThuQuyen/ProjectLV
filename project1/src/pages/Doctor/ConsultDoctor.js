import React, { useState, useEffect } from "react";
import Navbar from "../../components/Admin/Navbar";
import Sidebar from "../../components/Admin/Sidebar";
import NavbarConsult from "../../components/Doctor/NavbarConsult";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  dataGetTimthieutheongay,
  timPhieuTheoNgayAPI,
  dataCheck,
} from "../../redux/phieudatchoRedux";
import moment from "moment";
import { dataGetFindSchedule } from "../../redux/scheduleRedux";

const ConsultDoctor = () => {
  const [mang, setMang] = useState([]);
  const check = useSelector(dataCheck);

  const user = JSON.parse(localStorage.getItem("user"));
  // console.log("user: ", user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const test = new Date(date).getTime();
  // console.log("test date: ", test);

  const params = {
    doctorId: user.id,
    DateChon: test,
  };
  // console.log("params: ", params);
  const data = useSelector(dataGetTimthieutheongay);

  useEffect(() => {
    dispatch(timPhieuTheoNgayAPI(params));
    // console.log("test:");
  }, []);

  const handleConsult = (id) => {
    navigate(`/manager/prescription/${id}`);
    // dispatch(getAUserAPI(userId));
  };

  return (
    <>
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-initial w-5/6">
          <Navbar />
          <NavbarConsult />
          <div className="w-full px-10 py-4">
            <div className="flex">
              <div className="">
                <div className="">Ngày khám:</div>
                <div className="">{date}</div>
              </div>
            </div>
            <table className="border border-slate-200 mt-10">
              <thead>
                <tr className="border border-slate-200 bg-green-600">
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Tên
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Ngày sinh
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Gói tư vấn
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Giờ tư vấn
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Trạng thái
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.data &&
                  data?.data?.length > 0 &&
                  data?.data?.map((item, index) => {
                    let fotmatday = moment(
                      item?.patientDataToPhieudatcho?.birthday
                    ).format("DD/MM/YYYY");
                    return (
                      <tr key={item.id} className="hover:bg-slate-200">
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item?.patientDataToPhieudatcho?.childrentName}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {fotmatday}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item?.goituvanDataToPhieudatcho?.packageName}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {
                            item?.scheduleDataToPhieudatcho
                              ?.timeSlotDataToSchedule?.timeslot
                          }
                        </td>

                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          <div
                            className="bg-yellow-400 p-2 rounded-md hover:bg-yellow-500 hover:text-white cursor-pointer font-semibold"
                            onClick={() => handleConsult(item.id)}
                          >
                            Tư vấn
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

export default ConsultDoctor;
