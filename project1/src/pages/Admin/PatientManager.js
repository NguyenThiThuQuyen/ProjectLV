import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Navbar from "../../components/Admin/Navbar";
import NavbarUser from "../../components/Admin/NavbarUser";
import { useNavigate } from "react-router-dom";
// import PatientModal from "../../components/Admin/Modal/Patient/PatientModal";
import ParentModal from "../../components/Admin/Modal/Parent/ParentModal";
import PatientModalEdit from "../../components/Admin/Modal/Patient/PatientEditModal";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import { Buffer } from "buffer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  getPatientAPI,
  getAllPatientsAPI,
  dataGetAllPatient,
  dataCheck,
  deletePatientAPI,
} from "../../redux/patientRedux";

const PatientManager = () => {
  const dispatch = useDispatch();
  const data = useSelector(dataGetAllPatient);
  const check = useSelector(dataCheck);
  useEffect(() => {
    dispatch(getAllPatientsAPI());
  }, [check]);
  const navigate = useNavigate();

  const handleDetail = (patientId) => {
    navigate(`/manager/patient-detail-manager/${patientId}`);
    dispatch(getPatientAPI(patientId));
  };

  const handleDelete = (id) => {
    dispatch(deletePatientAPI(id));
  };

  // const handleFindSchedule = (id) => {
  //   dispatch(findSchedule
  // }

  return (
    <>
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-initial w-5/6">
          <Navbar />
          <NavbarUser />
          <ToastContainer />
          <ParentModal />
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
                  {/* <th className="border border-slate-200 p-3 text-white font-medium">
                    Hình ảnh
                  </th> */}
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Tên người đại diện
                  </th>
                  {/* <th className="border border-slate-200 p-3 text-white font-medium">
                    Email
                  </th> */}
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Điện thoại
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.patients &&
                  data.patients?.length > 0 &&
                  data.patients?.map((item, index) => {
                    let imageBase64 = "";
                    if (item.image) {
                      imageBase64 = new Buffer(item?.image, "base64").toString(
                        "binary"
                      );
                    }
                    let day = "";
                    day = moment(item.birthday).format("DD/MM/YYYY");
                    return (
                      <tr key={item.id} className="hover:bg-slate-200">
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item?.childrentName}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {day}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item?.genderDataToPatient?.value}
                        </td>
                        {/* <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          <img
                            src={imageBase64}
                            alt=""
                            className=""
                            style={{ height: "80px", width: "80px" }}
                          />
                        </td> */}
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item?.parentDataToPatient?.name}
                        </td>
                        {/* <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item?.parentDataToPatient?.email}
                        </td> */}
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item?.parentDataToPatient?.phone}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          <div className="flex">
                            <div
                              className="cursor-pointer"
                              title="Sửa"
                              onClick={() => handleDetail(item?.id)}
                            >
                              <BsThreeDots className="mt-1" />
                            </div>

                            <div className="mr-3" title="Sửa">
                              <PatientModalEdit item={item} />
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

export default PatientManager;
