import React, { useState, useEffect } from "react";
import Navbar from "../../components/Admin/Navbar";
import Sidebar from "../../components/Admin/Sidebar";
import NavbarConsult from "../../components/Doctor/NavbarConsult";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import {
  dataGetTimthieutheongay,
  timPhieuTheoNgayAPI,
  dataCheck,
} from "../../redux/phieudatchoRedux";
import { dataGetFindSchedule } from "../../redux/scheduleRedux";

const ConsultAllDate = () => {
  const [mang, setMang] = useState([]);
  const [dateChon, setDateChon] = useState();
  const check = useSelector(dataCheck);

  const user = JSON.parse(localStorage.getItem("user"));
  console.log("user: ", user);

  const dispatch = useDispatch();

  //   const today = new Date();
  //   let date =
  //     today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  //   const test = new Date(date).getTime();
  //   console.log("test date: ", test);

  const params = {
    doctorId: user.id,
  };
  console.log("params: ", params);

  const data = useSelector(dataGetTimthieutheongay);

  console.log("data", data);

  useEffect(() => {
    dispatch(timPhieuTheoNgayAPI(params));
    console.log("test:");
  }, []);

  useEffect(() => {
    data?.data &&
      data?.data?.length > 0 &&
      data?.data?.map((item, index) => {
        const kt = XoaTrungTrongMang(item?.arrivalDate);
        if (kt) {
          mang.push(item?.arrivalDate);
        }
      });

    // const params = {
    //   arrivalDate: mang[0],
    // };
    // dispatch(getFindTimeslotAPI(params));
  }, [data]);

  const XoaTrungTrongMang = (date) => {
    for (var i = 0; i < mang.length; i++) {
      if (mang[i].toString() == date.toString()) {
        return false;
      }
    }
    return true;
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
                <label htmlFor="" className="text-slate-600 ml-2">
                  Chọn ngày:
                </label>
                <select
                  className="w-full h-10 border rounded-md p-2 mt-1 bg-slate-100 outline-slate-300"
                  id=""
                  onChange={(event) => setDateChon(event.target.value)}
                >
                  {mang &&
                    mang.length > 0 &&
                    mang.map((item, index) => {
                      let fotmatday = moment(item).format("DD/MM/YYYY");
                      return (
                        <option key={index} value={item}>
                          {fotmatday}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            {/* <table className="border border-slate-200 mt-10">
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
            </table> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ConsultAllDate;