import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Admin/Navbar";
import Sidebar from "../../components/Admin/Sidebar";
import {
  dataGetAPhieudatcho,
  getPhieudatchoAPI,
} from "../../redux/phieudatchoRedux";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const ReservationSingle = () => {
  const params = useParams();
  const dispatch = useDispatch();
  console.log("params: ", params);

  const data = useSelector(dataGetAPhieudatcho);

  useEffect(() => {
    dispatch(getPhieudatchoAPI(params?.id));
  }, []);
  console.log("data:", data);

  const nsinh = data?.phieudatcho?.patientDataToPhieudatcho?.birthday;
  const ngaysinh = moment(nsinh).format("DD/MM/YYYY");
  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="flex-initial w-5/6">
        <Navbar />
        <div className="w-full">
          <div className="text-green-700 uppercase text-center font-medium text-xl mt-10">
            Thông tin chi tiết phiếu tư vấn
          </div>
          <div className="mx-auto w-3/4 mt-7 border shadow-lg p-5">
            <div className="">
              <div className="">
                <div className=" mt-10">
                  <div className="text-green-700 uppercase text-md font-medium mt-3 mx-3">
                    Thông tin gói tư vấn
                  </div>

                  <div className="px-3 pb-3">
                    <div className="flex mt-2">
                      <div className="text-sky-800 font-medium ml-2">
                        Bác sĩ tư vấn:
                      </div>
                      <div className="ml-2 uppercase font-medium">
                        {data?.phieudatcho?.doctorDataToPhieudatcho?.name}
                      </div>
                    </div>

                    <div className="flex mt-2">
                      <div className="text-sky-800 font-medium ml-2">
                        Gói tư vấn:
                      </div>
                      <div className="ml-2 bg-orange-400 rounded-lg px-3">
                        {
                          data?.phieudatcho?.goituvanDataToPhieudatcho
                            ?.packageName
                        }
                      </div>
                    </div>
                    <div className="flex mt-2">
                      <div className="text-sky-800 font-medium ml-2">
                        Giá gói khám:
                      </div>
                      <div className="ml-2 bg-yellow-400 rounded-lg px-3">
                        {
                          data?.phieudatcho?.goituvanDataToPhieudatcho
                            ?.medicalPackageDataToPackagePrice[0]?.price
                        }
                      </div>
                    </div>
                    <div className="flex mt-2">
                      <div className="text-sky-800 font-medium ml-2">
                        Khung giờ tư vấn:
                      </div>
                      <div className="ml-2 rounded-lg px-3 bg-sky-400">
                        {
                          data?.phieudatcho?.scheduleDataToPhieudatcho
                            ?.timeSlotDataToSchedule?.timeslot
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" mt-10">
                <div className="text-green-700 uppercase text-md font-medium mt-3 mx-3">
                  Thông tin bệnh nhân
                </div>
                <div className="grid grid-rows-1">
                  <div className="grid row-span-1 grid-cols-3">
                    <div className="col-span-1 mx-3 my-3">
                      <label
                        htmlFor=""
                        className="text-sky-800 font-medium ml-2"
                      >
                        Tên trẻ
                      </label>
                      <div
                        type="text"
                        placeholder="..."
                        disabled
                        className="border-b uppercase ml-2 border-solid border-slate-400 w-auto outline-none mt-1 bg-sky-100 text-sky-900"
                        // onChange={(event) => setName(event.target.value)}
                      >
                        {
                          data?.phieudatcho?.patientDataToPhieudatcho
                            ?.childrentName
                        }
                      </div>
                    </div>

                    <div className="col-span-1 mx-3 my-3">
                      <label
                        htmlFor=""
                        className="text-sky-800 font-medium ml-2"
                      >
                        Ngày sinh
                      </label>
                      <div
                        type="text"
                        placeholder="..."
                        disabled
                        className="border-b uppercase ml-2 border-solid border-slate-400 w-auto outline-none mt-1"
                        // onChange={(event) => setName(event.target.value)}
                      >
                        {ngaysinh}
                      </div>
                    </div>

                    <div className="col-span-1 mx-3 my-3">
                      <label
                        htmlFor=""
                        className="text-sky-800 font-medium ml-2"
                      >
                        Địa chỉ
                      </label>
                      <div
                        type="text"
                        placeholder="..."
                        disabled
                        className="border-b ml-2 border-solid border-slate-400 w-auto outline-none mt-1"
                      >
                        {data?.phieudatcho?.patientDataToPhieudatcho?.address}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" mt-10">
                <div className="text-green-700 uppercase text-md font-medium mt-3 mx-3">
                  Thông tin phụ huynh
                </div>
                <div className="grid grid-rows-1">
                  <div className="grid row-span-1 grid-cols-3">
                    <div className="col-span-1 mx-3 my-3">
                      <label
                        htmlFor=""
                        className="text-sky-800 font-medium ml-2"
                      >
                        Tên phụ huynh
                      </label>
                      <div
                        type="text"
                        placeholder="..."
                        disabled
                        className="border-b uppercase ml-2 border-solid border-slate-400 w-auto outline-none mt-1 bg-sky-100 text-sky-900"
                        // onChange={(event) => setName(event.target.value)}
                      >
                        {
                          data?.phieudatcho?.patientDataToPhieudatcho
                            ?.parentDataToPatient?.name
                        }
                      </div>
                    </div>

                    <div className="col-span-1 mx-3 my-3">
                      <label
                        htmlFor=""
                        className="text-sky-800 font-medium ml-2"
                      >
                        Điện thoại
                      </label>
                      <div
                        type="text"
                        placeholder="..."
                        disabled
                        className="border-b uppercase ml-2 border-solid border-slate-400 w-auto outline-none mt-1"
                        // onChange={(event) => setName(event.target.value)}
                      >
                        {
                          data?.phieudatcho?.patientDataToPhieudatcho
                            ?.parentDataToPatient?.phone
                        }
                      </div>
                    </div>

                    <div className="col-span-1 mx-3 my-3">
                      <label
                        htmlFor=""
                        className="text-sky-800 font-medium ml-2"
                      >
                        Email
                      </label>
                      <div
                        type="text"
                        placeholder="..."
                        disabled
                        className="border-b ml-2 border-solid border-slate-400 w-auto outline-none mt-1"
                        // onChange={(event) => setName(event.target.value)}
                      >
                        {
                          data?.phieudatcho?.patientDataToPhieudatcho
                            ?.parentDataToPatient?.email
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationSingle;
