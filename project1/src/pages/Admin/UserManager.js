import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Navbar from "../../components/Admin/Navbar";
import UserModal from "../../components/Admin/Modal/User/UserModal";
import UserModalEdit from "../../components/Admin/Modal/User/UserEditModal";
import { useNavigate } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineEye } from "react-icons/ai";
import { BsPlusLg, BsSearch } from "react-icons/bs";
import { ImDownload3, ImUpload3 } from "react-icons/im";
import { Buffer } from "buffer";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAllUsersAPI,
  getAUserAPI,
  dataGetAllUser,
  dataCheck,
  deleteUserAPI,
} from "../../redux/userRedux";
import NavbarUser from "../../components/Admin/NavbarUser";

const UserManager = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector(dataGetAllUser);
  const navigate = useNavigate();
  const check = useSelector(dataCheck);

  useEffect(() => {
    dispatch(getAllUsersAPI());
  }, [check]);

  const handleDeleteUser = (id) => {
    dispatch(deleteUserAPI(id));
  };

  const handleDetail = (userId) => {
    navigate(`/manager/user-detail-manager/${userId}`);
    dispatch(getAUserAPI(userId));
  };

  const handleUserModal = () => {
    setShowModal(true);
  };

  const handleDong = (test) => {
    setShowModal(test);
  };

  const handleMoLai = (data) => {
    setShowModal(data);
  };

  return (
    <>
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-initial w-5/6">
          <Navbar />
          <NavbarUser />
          <ToastContainer />
          {/* <UserModal /> */}
          <div className="mt-4 ml-5">
            <div className="ml-5 flex justify-start">
              <div className="flex items-center border border-scale-200 p-1 rounded">
                <input
                  className="border-0 outline-0 bg-transparent"
                  type="text"
                  placeholder="Tìm kiếm..."
                />
                <BsSearch />
              </div>
            </div>
            <div className="flex">
              <div className="ml-6 mt-8">
                <button
                  className="flex text-teal-800 font-medium hover:text-slate-600"
                  type="button"
                  onClick={() => handleUserModal()}
                >
                  <BsPlusLg className="mr-2 mt-1 text-teal-700" />
                  Thêm người dùng
                </button>
                <div className="">
                  {showModal === true ? (
                    <UserModal
                      openModal={showModal}
                      handleClose={handleDong}
                      handleMo={handleMoLai}
                    />
                  ) : (
                    <>
                      <div className=""></div>
                    </>
                  )}
                </div>
              </div>
              <div className="ml-8 mt-8">
                <button
                  className="flex text-teal-800 font-medium hover:text-slate-600"
                  type="button"
                >
                  <ImDownload3 className="mr-2 mt-1 text-teal-700" />
                  Xuất excel
                </button>
              </div>
            </div>
          </div>

          <div className="w-full px-10 py-4">
            <table className="border border-slate-200">
              <thead>
                <tr className="border border-slate-200 bg-green-600">
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Tên
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Email
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Điện Thoại
                  </th>
                  {/* <th className="border border-slate-200 p-3 text-white font-medium">
                    Hình ảnh
                  </th> */}
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Giới Tính
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Quyền
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.users &&
                  data.users.length > 0 &&
                  data.users.map((item, index) => {
                    let imageBase64 = "";
                    if (item?.image) {
                      imageBase64 = new Buffer(item.image, "base64").toString(
                        "binary"
                      );
                    }
                    return (
                      <tr
                        key={item.id}
                        className="hover:bg-slate-200"
                        // onClick={() => handleDetailUser(item.id)}
                      >
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item.name}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item.email}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item.phone}
                        </td>
                        {/* <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          <img
                            src={imageBase64}
                            alt=""
                            className="rounded-full"
                            style={{ height: "70px", width: "70px" }}
                          />
                        </td> */}
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item.genderDataToUser.value}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item.roleDataToUser.value}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          <div className="flex">
                            <div
                              className=""
                              onClick={() => handleDetail(item.id)}
                            >
                              <AiOutlineEye className="cursor-pointer text-lg text-green-700" />
                            </div>
                            <div className="mr-5" title="Sửa">
                              <UserModalEdit item={item} />
                            </div>
                            <div
                              className=""
                              title="Xóa"
                              onClick={() => handleDeleteUser(item.id)}
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

export default UserManager;
