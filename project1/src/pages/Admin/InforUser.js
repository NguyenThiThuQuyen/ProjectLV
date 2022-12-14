import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import SidebarInfor from "../../components/Admin/SidebarInfor";
import Navbar from "../../components/Admin/Navbar";
import UserModal from "../../components/Admin/Modal/User/UserModal";
import UserModalEdit from "../../components/Admin/Modal/User/UserEditModal";
import { useNavigate } from "react-router-dom";
import { FaRegAddressBook } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import { Buffer } from "buffer";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAllUsersAPI,
  getAUserAPI,
  dataGetAllUser,
  dataGetAUser,
  dataCheck,
  deleteUserAPI,
} from "../../redux/userRedux";

const InforUser = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const check = useSelector(dataCheck);
  const data = useSelector(dataGetAUser);
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user.id;
  useEffect(() => {
    dispatch(getAUserAPI(params.id));
  }, [check]);
  let imageBase64 = "";
  if (data?.user?.image) {
    imageBase64 = new Buffer(data?.user?.image, "base64").toString("binary");
  }

  return (
    <>
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-initial w-5/6">
          <Navbar />
          <ToastContainer />

          <div className="">
            <div className="grid grid-cols-4 px-10 py-14">
              <SidebarInfor />
              <div className="col-span-3 shadow-xl border-[1px] p-5 relative ml-5">
                <div className="flex pl-2 absolute top-0 right-0 px-3 py-1.5 text-xs text-indigo-600 bg-slate-200 cursor-pointer rounded-[3px]">
                  <UserModalEdit item={data?.user} />
                  Edit
                </div>
                <h1 className="mb-3 font-medium text-sm text-slate-600">
                  TH??NG TIN NG?????I D??NG
                </h1>
                <div className="flex gap-5">
                  <img
                    src={imageBase64}
                    alt=""
                    // className="rounded-full"
                    style={{ height: "120px", width: "120px" }}
                  />
                  <div className="ml-3">
                    <div className="mb-2 text-sm">
                      <span className="font-medium text-slate-500">
                        H??? t??n:
                      </span>
                      <span className="font-normal ml-2 uppercase">
                        {data?.user?.name}
                      </span>
                    </div>
                    <div className="mb-2 text-sm">
                      <span className="font-medium text-slate-500">
                        Gi???i t??nh:
                      </span>
                      <span className="font-normal ml-2">
                        {data?.user?.genderDataToUser?.value}
                      </span>
                    </div>

                    <div className="mb-2 text-sm">
                      <span className="font-medium text-slate-500">Email:</span>
                      <span className="font-normal ml-2">
                        {data?.user?.email}
                      </span>
                    </div>
                    <div className="mb-2 text-sm">
                      <span className="font-medium text-slate-500">
                        ??i???n tho???i:
                      </span>
                      <span className="font-normal ml-2">
                        {data?.user?.phone}
                      </span>
                    </div>
                    <div className="mb-2 text-sm">
                      <span className="font-medium text-slate-500">
                        ?????a ch???:
                      </span>
                      <span className="font-normal ml-2">
                        {data?.user?.address}
                      </span>
                    </div>
                    <div className="mb-2 text-sm">
                      <span className="font-medium text-slate-500">
                        Qu???c gia:
                      </span>
                      <span className="font-normal ml-2">Vi???t Nam</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InforUser;
