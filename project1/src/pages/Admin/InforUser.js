import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Navbar from "../../components/Admin/Navbar";
import UserModal from "../../components/Admin/Modal/User/UserModal";
import UserModalEdit from "../../components/Admin/Modal/User/UserEditModal";
import { useNavigate } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineEye } from "react-icons/ai";
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

const InforUser = () => {
  return (
    <>
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-initial w-5/6">
          <Navbar />
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default InforUser;
