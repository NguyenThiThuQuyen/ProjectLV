import { useState, useEffect } from "react";
import Navbar from "../../components/Admin/Navbar";
import Sidebar from "../../components/Admin/Sidebar";
import UserModalEdit from "../../components/Admin/Modal/User/UserEditModal";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { Buffer } from "buffer";

import { getAUserAPI, dataGetAUser, dataCheck } from "../../redux/userRedux";
import NavbarUser from "../../components/Admin/NavbarUser";
const Single = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const check = useSelector(dataCheck);
  const user = useSelector(dataGetAUser);
  useEffect(() => {
    dispatch(getAUserAPI(params.userId));
  }, [check]);
  let imageBase64 = "";
  if (user?.user?.image) {
    imageBase64 = new Buffer(user?.user?.image, "base64").toString("binary");
  }
  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="flex-initial w-5/6">
        <Navbar />
        <NavbarUser />
        <div className="grid grid-cols-2 p-5">
          <div className="col-span-1 shadow-xl border-[1px] p-5 relative">
            <div className="flex pl-2 absolute top-0 right-0 px-3 py-1.5 text-xs text-indigo-600 bg-slate-200 cursor-pointer rounded-[3px]">
              Edit
            </div>
            <h1 className="mb-3 font-medium text-sm text-slate-600">
              THÔNG TIN NGƯỜI DÙNG
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
                  {user?.user?.name}
                </h1>
                <div className="mb-2 text-md">
                  <span className="font-bold text-slate-500">Giới tính:</span>
                  <span className="font-normal ml-2">
                    {user?.user?.genderDataToUser.value}
                  </span>
                </div>
                <div className="mb-2 text-md">
                  <span className="font-bold text-slate-500">
                    Phân quyền hệ thống:
                  </span>
                  <span className="font-normal ml-2">
                    {user?.user?.roleDataToUser.value}
                  </span>
                </div>
                <div className="mb-2 text-md">
                  <span className="font-bold text-slate-500">Email:</span>
                  <span className="font-normal ml-2">{user?.user?.email}</span>
                </div>
                <div className="mb-2 text-md">
                  <span className="font-bold text-slate-500">Điện thoại:</span>
                  <span className="font-normal ml-2">{user?.user?.phone}</span>
                </div>
                <div className="mb-2 text-md">
                  <span className="font-bold text-slate-500">Địa chỉ:</span>
                  <span className="font-normal ml-2">
                    {user?.user?.address}
                  </span>
                </div>
                <div className="mb-2 text-md">
                  <span className="font-bold text-slate-500">Quốc gia:</span>
                  <span className="font-normal ml-2">Việt Nam</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
