import { useState, useEffect } from "react";
import Navbar from "../../components/Admin/Navbar";
import Sidebar from "../../components/Admin/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import ParentModalEdit from "../../components/Admin/Modal/Parent/ParentEditModal";
import PatientModalEdit from "../../components/Admin/Modal/Patient/PatientEditModal";
import { Buffer } from "buffer";

import {
  getPatientAPI,
  dataGetPatient,
  dataCheck,
} from "../../redux/patientRedux";
import NavbarUser from "../../components/Admin/NavbarUser";
// import { MenuItem } from "@mui/material";
// import { email } from "react-admin";
const PatientSingle = () => {
  const dispatch = useDispatch();
  const params = useParams();
  // const location = useLocation();
  // const id = location.search.split("=")[1];
  const check = useSelector(dataCheck);
  const patient = useSelector(dataGetPatient);

  useEffect(() => {
    dispatch(getPatientAPI(params.patientId));
  }, [check]);

  let imageBase64 = "";
  if (patient?.patient?.image) {
    imageBase64 = new Buffer(patient?.patient?.image, "base64").toString(
      "binary"
    );
  }
  return (
    // single
    <div className="flex w-full">
      <Sidebar />
      {/* singleContainer */}
      <div className="flex-initial w-5/6">
        <Navbar />
        <NavbarUser />
        {/* top */}
        <div className="grid grid-cols-2 p-5">
          <div className="col-span-1 shadow-xl border-[1px] p-5 mx-5 relative">
            {/* editButton */}
            <div className="flex pl-2 absolute top-0 right-0 px-3 py-1.5 text-xs text-indigo-600 bg-slate-200 cursor-pointer rounded-[3px]">
              <PatientModalEdit item={patient?.patient} />
              Edit
            </div>
            <h1 className="mb-3 font-medium text-sm text-slate-600">
              THÔNG TIN BỆNH NHÂN
            </h1>
            <div className="flex gap-5">
              <img
                src={imageBase64}
                alt=""
                className="rounded-full"
                style={{ height: "90px", width: "90px" }}
              />
              <div className="ml-3">
                <h1 className="mb-2	text-slate-800 font-medium">
                  {patient?.patient?.childrentName}
                </h1>
                <div className="mb-2 text-md">
                  <span className="font-bold text-slate-500">Ngày sinh:</span>
                  <span className="font-normal ml-2">
                    {patient?.patient?.birthday.slice(0, 10)}
                  </span>
                </div>
                <div className="mb-2 text-md">
                  <span className="font-bold text-slate-500">Giới tính:</span>
                  <span className="font-normal ml-2">
                    {patient?.patient?.genderDataToPatient.value}
                  </span>
                </div>
                <div className="mb-2 text-md">
                  <span className="font-bold text-slate-500">Quốc gia:</span>
                  <span className="font-normal ml-2">Việt Nam</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-1 shadow-xl border-[1px] p-5 mx-5 relative">
            {/* editButton */}
            <div className="flex pl-2 absolute top-0 right-0 px-3 py-1.5 text-xs text-indigo-600 bg-slate-200 cursor-pointer rounded-[3px]">
              <ParentModalEdit item={patient?.patient?.parentDataToPatient} />
              Edit
            </div>
            <h1 className="mb-3 font-medium text-sm text-slate-600">
              THÔNG TIN NGƯỜI ĐẠI DIỆN
            </h1>
            <div className="flex gap-5">
              <div className="ml-5 mt-3">
                <div className="mb-2 text-md">
                  <span className="font-bold text-slate-500">
                    Tên phụ huynh:
                  </span>
                  <span className="font-normal ml-2">
                    {patient?.patient?.parentDataToPatient.name}
                  </span>
                </div>
                <div className="mb-2 text-md">
                  <span className="font-bold text-slate-500">Email:</span>
                  <span className="font-normal ml-2">
                    {patient?.patient?.parentDataToPatient.email}
                  </span>
                </div>
                {/* <div className="mb-2 text-md">
                  <span className="font-bold text-slate-500">Giới tính:</span>
                  <span className="font-normal ml-2">
                    {patient?.patient?.parentDataToPatient.email}
                  </span>
                </div> */}
                <div className="mb-2 text-md">
                  <span className="font-bold text-slate-500">Điện thoại:</span>
                  <span className="font-normal ml-2">
                    {patient?.patient?.parentDataToPatient.phone}
                  </span>
                </div>
                <div className="mb-2 text-md">
                  <span className="font-bold text-slate-500">Địa chỉ:</span>
                  <span className="font-normal ml-2">
                    {patient?.patient?.parentDataToPatient?.address}
                  </span>
                </div>

                <div className="mb-2 text-md">
                  <span className="font-bold text-slate-500">Country:</span>
                  <span className="font-normal ml-2">Việt Nam</span>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div> */}
        </div>
        {/* <div className="bottom">
        <h1 className="title">Last Transactions</h1>
        <List />
      </div> */}
      </div>
    </div>
  );
};

export default PatientSingle;
