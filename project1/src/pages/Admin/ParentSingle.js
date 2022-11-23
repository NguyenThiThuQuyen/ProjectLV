import { useState, useEffect } from "react";
import Navbar from "../../components/Admin/Navbar";
import Sidebar from "../../components/Admin/Sidebar";
import PatientEdit from "../../components/Admin/Modal/Patient/PatientEditModal";
import ParentEdit from "../../components/Admin/Modal/Parent/ParentEditModal";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import moment from "moment";
import { Buffer } from "buffer";

import {
  getAParentAPI,
  dataGetAParent,
  dataCheck,
} from "../../redux/parentRedux";
import NavbarUser from "../../components/Admin/NavbarUser";
import { ToastContainer } from "react-toastify";
const ParentSingle = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const check = useSelector(dataCheck);
  const data = useSelector(dataGetAParent);
  useEffect(() => {
    dispatch(getAParentAPI(params.parentId));
  }, [check]);
  return (
    <>
      <ToastContainer />
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-initial w-5/6">
          <Navbar />
          <NavbarUser />
          <div className="font-medium text-center text-xl text-green-600">
            CHI TIẾT NGƯỜI ĐẠI DIỆN
          </div>
          <h1 className="ml-5 mt-10 font-medium text-md italic text-slate-600">
            Thông tin người đại diện
          </h1>
          <div className="grid grid-cols-2 p-5">
            <div className="col-span-1 shadow-md shadow-green-200 border-[1px] p-5 relative">
              <div className="flex pl-2 absolute top-0 right-0 px-3 py-1.5 text-xs text-indigo-600 bg-slate-200 cursor-pointer rounded-[3px]">
                Edit
              </div>
              <div className="flex">
                <div className="flex pl-2 absolute top-0 right-0 px-3 py-1.5 text-xs text-indigo-600 bg-slate-200 cursor-pointer rounded-[3px]">
                  <ParentEdit item={data?.parent} />
                  Edit
                </div>
                <div className="ml-3">
                  <div className="mb-2 text-sm">
                    <span className="font-bold text-slate-500">Tên:</span>
                    <span className="font-normal ml-2">
                      {data?.parent?.name}
                    </span>
                  </div>
                  <div className="mb-2 text-sm">
                    <span className="font-bold text-slate-500">Giới tính:</span>
                    <span className="font-normal ml-2">
                      {data?.parent?.genderDataToParent.value}
                    </span>
                  </div>
                  <div className="mb-2 text-sm">
                    <span className="font-bold text-slate-500">
                      Điện thoại:
                    </span>
                    <span className="font-normal ml-2">
                      {data?.parent?.phone}
                    </span>
                  </div>
                  <div className="mb-2 text-sm">
                    <span className="font-bold text-slate-500">Email:</span>
                    <span className="font-normal ml-2">
                      {data?.parent?.email}
                    </span>
                  </div>
                  <div className="mb-2 text-sm">
                    <span className="font-bold text-slate-500">Địa chỉ:</span>
                    <span className="font-normal ml-2">
                      {data?.parent?.address}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h1 className="ml-5 mt-10 font-medium text-md italic text-slate-600">
            Thông tin trẻ
          </h1>
          <div className="grid grid-cols-2 px-5">
            {data?.parent?.parentDataToPatient &&
              data?.parent?.parentDataToPatient.length > 0 &&
              data?.parent?.parentDataToPatient.map((item, index) => {
                let imageBase64 = "";
                if (item?.image) {
                  imageBase64 = new Buffer(item?.image, "base64").toString(
                    "binary"
                  );
                }
                let day = "";
                day = moment(item.birthday).format("YYYY-MM-DD");
                return (
                  <div className="col-span-1 mt-5 mr-5 shadow-md shadow-red-200 border-[1px] p-5 relative">
                    <div className="flex pl-2 absolute top-0 right-0 px-3 py-1.5 text-xs text-indigo-600 bg-slate-200 cursor-pointer rounded-[3px]">
                      <PatientEdit item={item} />
                      Edit
                    </div>
                    <div className="flex">
                      <img
                        src={imageBase64}
                        alt=""
                        className="rounded-full"
                        style={{ height: "90px", width: "90px" }}
                      />
                      <div className="ml-3">
                        <div className="mb-2 text-sm">
                          <span className="font-bold text-slate-500">Tên:</span>
                          <span className="font-normal ml-2">
                            {item?.childrentName}
                          </span>
                        </div>
                        <div className="mb-2 text-sm">
                          <span className="font-bold text-slate-500">
                            Giới tính:
                          </span>
                          <span className="font-normal ml-2">
                            {item?.genderDataToPatient?.value}
                          </span>
                        </div>
                        <div className="mb-2 text-sm">
                          <span className="font-bold text-slate-500">
                            Ngày sinh:
                          </span>
                          <span className="font-normal ml-2">{day}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ParentSingle;
