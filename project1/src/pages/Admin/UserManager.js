import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Navbar from "../../components/Admin/Navbar";
import UserModal from "../../components/Admin/Modal/User/UserModal";
// dispatch(getAllAllcodesAPI());
import UserModalEdit from "../../components/Admin/Modal/User/UserEditModal";
import { useNavigate } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineEye } from "react-icons/ai";
import { Buffer } from "buffer";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsersAPI,
  getAUserAPI,
  dataGetAllUser,
  dataCheck,
  deleteUserAPI,
} from "../../redux/userRedux";
import NavbarUser from "../../components/Admin/NavbarUser";

const UserManager = () => {
  const [userId, setUserId] = useState();
  const dispatch = useDispatch();
  const data = useSelector(dataGetAllUser);
  console.log("first", data);
  const navigate = useNavigate();
  const check = useSelector(dataCheck);

  useEffect(() => {
    dispatch(getAllUsersAPI());
  }, [check]);

  const handleDeleteUser = (id) => {
    dispatch(deleteUserAPI(id));
  };

  const handleDetailUser = (userId) => {
    navigate(`/admin/user-detail-manager/${userId}`);
    dispatch(getAUserAPI(userId));
  };

  return (
    <>
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-initial w-5/6">
          <Navbar />
          <NavbarUser />
          <UserModal />
          {/* <TableUser /> */}
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
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Hình ảnh
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Giới Tính
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Quyền
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Điều chỉnh
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
                      // imageBase64 = new Blob([Buffer], { type: "text/html" });
                      console.log("base64: ", item?.image);
                    }
                    return (
                      <tr key={item.id}>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item.name}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item.email}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item.phone}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          <img
                            src={imageBase64}
                            alt=""
                            className="rounded-full"
                            style={{ height: "70px", width: "70px" }}
                          />
                        </td>
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
                              onClick={() => handleDetailUser(item.id)}
                            >
                              <AiOutlineEye className="cursor-pointer text-lg text-green-700" />
                            </div>

                            <div className="mr-5">
                              <UserModalEdit item={item} />
                            </div>

                            <div
                              className=""
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
