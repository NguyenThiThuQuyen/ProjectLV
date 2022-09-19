import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Navbar from "../../components/Admin/Navbar";
import NavbarUser from "../../components/Admin/NavbarUser";
// import PatientModal from "../../components/Admin/Modal/Patient/PatientModal";
import ParentModal from "../../components/Admin/Modal/Parent/ParentModal";
// import ParentModalEdit from "../../components/Admin/Modal/Parent/ParentEditModal";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineEye } from "react-icons/ai";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllPatientsAPI,
  dataGetAllPatient,
  dataCheck,
  //   deletePatientAPI,
} from "../../redux/patientRedux";

const PatientManager = () => {
  const dispatch = useDispatch();
  const data = useSelector(dataGetAllPatient);
  console.log("data patient:", data);
  const check = useSelector(dataCheck);

  useEffect(() => {
    dispatch(getAllPatientsAPI());
  }, [check]);

  // const handleDeleteParent = (id) => {
  //   dispatch(deleteParentAPI(id));
  // };

  return (
    <>
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-initial w-5/6">
          <Navbar />
          <NavbarUser />
          <ParentModal />
          {/* <PatientModal /> */}

          <div className="w-full px-10 py-4">
            <table className="border border-slate-200">
              <thead>
                <tr className="border border-slate-200 bg-green-600">
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Tên
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Ngày sinh
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Giới Tính
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Hình ảnh
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Tên người đại diện
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Email
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Điện thoại
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Điều chỉnh
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.patients &&
                  data.patients.length > 0 &&
                  data.patients.map((item, index) => {
                    console.log(
                      "item.parentDataToPatient:",
                      item.parentDataToPatient
                    );
                    return (
                      <tr key={item.id}>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item.childrentName}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item.birthday}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item.genderDataToPatient.gender}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {/* {item.image} */}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item.parentDataToPatient.name}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item.parentDataToPatient.email}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item.parentDataToPatient.phone}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          <div className="flex">
                            <div className="mr-3">
                              <AiOutlineEye className="cursor-pointer text-lg text-green-700" />
                            </div>
                            <div className="mr-3"></div>
                            <div className="">
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

export default PatientManager;
