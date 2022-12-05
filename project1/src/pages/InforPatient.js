import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { AiFillEdit } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import hinh1 from "../assets/upload/bacsi2.jpg";
import { useDispatch, useSelector } from "react-redux";
import { Buffer } from "buffer";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import SidebarInforPatient from "../components/Guest/SidebarInforPatient";
import ParentEdit from "../components/Admin/Modal/Parent/ParentEditModal";
import {
  dataGetDoctorHome,
  getAllDoctorHomeAPI,
  getAUserAPI,
  dataCheck,
} from "../redux/userRedux";
import { getAParentAPI, dataGetAParent } from "../redux/parentRedux";
import { getFindScheduleToDoctorAPI } from "../redux/scheduleRedux";
import moment from "moment/moment";
import { ToastContainer } from "react-toastify";
const InforPatient = () => {
  const dispatch = useDispatch();
  const check = useSelector(dataCheck);
  const data = useSelector(dataGetDoctorHome);
  const dataParent = useSelector(dataGetAParent);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAParentAPI(params.id));
  }, [check]);

  useEffect(() => {
    dispatch(getAllDoctorHomeAPI());
    // dispatch(getFindScheduleToDoctorAPI());
  }, [check]);

  return (
    <div className="h-screen w-full">
      <ToastContainer />
      <Header />
      <div className="mt-28 mx-auto w-7/8">
        <div className="grid grid-cols-4 px-10 py-14">
          <SidebarInforPatient />
          <div className="col-span-3 shadow-xl border-[1px] pl-10 py-5 relative ml-5">
            <div className="mb-3 font-medium text-xl text-sky-700 text-center">
              THÔNG TIN HỒ SƠ NGƯỜI DÙNG
            </div>
            {/* ho so ba me */}
            <div className="border-l-2 border-l-slate-400">
              <span className="absolute right-[1015px] mt-5 w-[20px] h-[20px] bg-sky-600 rounded-full"></span>
              <div className="px-10">
                <div className="flex mb-3 mt-5">
                  <div className="font-medium text-md text-slate-700 ml-2">
                    THÔNG TIN NGƯỜI ĐẠI DIỆN
                  </div>
                  <div className="">
                    <ParentEdit item={dataParent?.parent} />
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="ml-3">
                    <div className="mb-2 text-md">
                      <span className="font-medium text-slate-500">
                        Họ tên:
                      </span>
                      <span className="font-normal ml-2 uppercase">
                        {dataParent?.parent?.name}
                      </span>
                    </div>
                    <div className="mb-2 text-md">
                      <span className="font-medium text-slate-500">
                        Giới tính:
                      </span>
                      <span className="font-normal ml-2">
                        {dataParent?.parent?.genderDataToParent?.value}
                      </span>
                    </div>

                    <div className="mb-2 text-md">
                      <span className="font-medium text-slate-500">Email:</span>
                      <span className="font-normal ml-2">
                        {dataParent?.parent?.email}
                      </span>
                    </div>
                    <div className="mb-2 text-md">
                      <span className="font-medium text-slate-500">
                        Điện thoại:
                      </span>
                      <span className="font-normal ml-2">
                        {dataParent?.parent?.phone}
                      </span>
                    </div>
                    <div className="mb-2 text-md">
                      <span className="font-medium text-slate-500">
                        Quốc gia:
                      </span>
                      <span className="font-normal ml-2">Việt Nam</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hồ sơ bệnh nhân */}
            <div className="border-l-2 border-l-slate-400 mt-16">
              <span className="absolute right-[1015px] mt-5 w-[20px] h-[20px] bg-sky-600 rounded-full"></span>
              <div className="px-10">
                <div className="flex mb-3 mt-5">
                  <div className="font-medium text-md text-slate-700 ml-2">
                    THÔNG TIN BỆNH NHÂN
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="grid grid-cols-2 w-full">
                    {dataParent?.parent?.parentDataToPatient &&
                      dataParent?.parent?.parentDataToPatient.length > 0 &&
                      dataParent?.parent?.parentDataToPatient.map(
                        (item, index) => {
                          let ngaysinh = moment(item?.birthday).format(
                            "DD/MM/YYYY"
                          );
                          let imageBase64 = "";
                          if (item?.image) {
                            imageBase64 = new Buffer(
                              item?.image,
                              "base64"
                            ).toString("binary");
                          }
                          return (
                            <div className="border-[1px] shadow-lg shadow-sky-200 rounded-md mt-5 mx-2 pb-8">
                              <div className="w-full text-xl text-sky-700 cursor-pointer rounded-[3px]">
                                <BiEdit className="ml-auto" title="Chỉnh sửa" />
                              </div>
                              <div className="flex col-span-1 ml-3">
                                <div className="">
                                  <img
                                    src={imageBase64}
                                    alt=""
                                    className="rounded-full"
                                    style={{ height: "90px", width: "90px" }}
                                  />
                                </div>
                                <div className="ml-3">
                                  <div className="mb-2 text-md">
                                    <span className="font-medium text-slate-500">
                                      Họ tên trẻ:
                                    </span>
                                    <span className="font-normal ml-2 uppercase">
                                      {item?.childrentName}
                                    </span>
                                  </div>
                                  <div className="mb-2 text-md">
                                    <span className="font-medium text-slate-500">
                                      Giới tính:
                                    </span>
                                    <span className="font-normal ml-2">
                                      {item?.genderDataToPatient?.value}
                                    </span>
                                  </div>

                                  <div className="mb-2 text-md">
                                    <span className="font-medium text-slate-500">
                                      Ngày sinh:
                                    </span>
                                    <span className="font-normal ml-2">
                                      {ngaysinh}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default InforPatient;
