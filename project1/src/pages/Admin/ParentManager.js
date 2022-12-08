import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Navbar from "../../components/Admin/Navbar";
import NavbarUser from "../../components/Admin/NavbarUser";
import ParentModal from "../../components/Admin/Modal/Parent/ParentModal";
import PatientModal2 from "../../components/Admin/Modal/Patient/PatientModal2";
import ParentModalEdit from "../../components/Admin/Modal/Parent/ParentEditModal";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import {
  getAllParentsAPI,
  dataGetAllParent,
  dataCheck,
  deleteParentAPI,
  getAParentAPI,
} from "../../redux/parentRedux";

import { addPatientAPI } from "../../redux/patientRedux";

const ParentManager = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector(dataGetAllParent);
  const check = useSelector(dataCheck);
  console.log("check:", check);
  const [parentId, setParentId] = useState();

  const paramsphuhynh = {
    parentId: parentId,
  };
  useEffect(() => {
    dispatch(getAllParentsAPI());
  }, [check]);

  const handleDeleteParent = (id) => {
    dispatch(deleteParentAPI(id));
  };

  const handleDetail = (parentId) => {
    navigate(`/manager/parent-detail/${parentId}`);
    dispatch(getAParentAPI(parentId));
  };

  const handleDong = (test) => {
    setShowModal(test);
  };

  const handleMoLai = (data) => {
    setShowModal(data);
  };

  const handleShowModal = (id) => {
    setParentId(id);
    setShowModal(true);
  };

  return (
    <>
      <ToastContainer />
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-initial w-5/6">
          <Navbar />
          <NavbarUser />
          <ParentModal />
          <div className="w-full px-10 py-4">
            <table className="border border-slate-200">
              <thead>
                <tr className="border border-slate-200 bg-green-600">
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Thêm con
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Tên
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Email
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Điện Thoại
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Giới Tính
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Địa chỉ
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.parents &&
                  data.parents.length > 0 &&
                  data.parents.map((item, index) => {
                    return (
                      <tr key={item?.id} className="hover:bg-slate-200">
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          <div className="" title="Thêm con">
                            {/* <PatientModal2 item={item} /> */}
                            <div className="ml-5">
                              <button
                                type="button"
                                onClick={() => handleShowModal(item.id)}
                              >
                                <BsPlusLg className="cursor-pointer text-lg text-blue-600" />
                              </button>
                            </div>
                            <div className="">
                              {showModal === true ? (
                                <PatientModal2
                                  openModal={showModal}
                                  handleClose={handleDong}
                                  handleMo={handleMoLai}
                                  paramsphuhynh={paramsphuhynh}
                                  item={item}
                                />
                              ) : (
                                <>
                                  <div className=""></div>
                                </>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item?.name}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item?.email}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item?.phone}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item?.address}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item?.genderDataToParent?.value}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          <div className="flex">
                            <div
                              className=""
                              onClick={() => handleDetail(item?.id)}
                            >
                              <BsThreeDots className="mt-1" />
                            </div>

                            {/* <div className="" title="Thêm con">
                              <PatientModal2 item={item} />
                            </div> */}
                            {/* <div className="" title="Thêm con">
                              <div className="ml-5">
                                <button
                                  type="button"
                                  onClick={() => setShowModal(true)}
                                >
                                  <BsPlusLg className="cursor-pointer text-lg text-blue-600" />
                                </button>
                              </div>
                            </div> */}

                            {/* {setShowModal === true ? (
                              <>
                                <PatientModal2
                                  openModal={setShowModal}
                                  item={item}
                                />
                              </>
                            ) : (
                              <>null</>
                            )} */}

                            <div className="mr-3" title="Sửa">
                              <ParentModalEdit item={item} />
                            </div>

                            <div
                              className=""
                              title="Xóa"
                              onClick={() => handleDeleteParent(item.id)}
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

export default ParentManager;
