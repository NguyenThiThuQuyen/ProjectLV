import React, { useState, useEffect } from "react";
import logo from "../../assets/upload/logo.png";
import { Link } from "react-router-dom";
import { RiBillLine } from "react-icons/ri";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { BiHistory } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { FaRegAddressBook } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import {
  AiOutlineSchedule,
  AiOutlineUserAdd,
  AiOutlineBell,
  AiOutlineBarChart,
} from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { logout, dataCheckLogout } from "../../redux/Auth/adminRedux";
const SidebarInfor = () => {
  const [check, setCheck] = useState(true);
  const navigator = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user.id;

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  const handleInfor = () => {
    navigator(`/manager/infor-user/${id}`);
    setCheck(true);
  };

  return (
    <>
      {check === true ? (
        <div className="col-span-1">
          <ul className="list-none m-0 p-0">
            <li
              className="text-sky-500  flex font-medium py-3 cursor-pointer bg-slate-200 rounded-r-full px-5"
              onClick={() => handleInfor()}
            >
              <FaRegAddressBook className="mt-1 mr-2" />
              Hồ sơ người dùng
            </li>

            <li
              className="text-slate-900 hover:text-slate-700 flex font-medium py-3 cursor-pointer hover:bg-sky-50 hover:rounded-r-full px-5"
              onClick={() => setCheck(false)}
            >
              <RiLockPasswordLine className="mt-1 mr-2" />
              Đổi mật khẩu
            </li>
          </ul>
        </div>
      ) : (
        <div className="col-span-1">
          <ul className="list-none m-0 p-0">
            <li
              className="text-slate-900 hover:text-slate-500 flex font-medium py-3 cursor-pointer hover:bg-slate-100 hover:rounded-r-full px-5"
              onClick={() => setCheck(false)}
            >
              <FaRegAddressBook className="mt-1 mr-2" />
              Hồ sơ người dùng
            </li>

            <li
              className="text-sky-600  flex font-medium py-3 cursor-pointer bg-slate-200 rounded-r-full px-5"
              onClick={() => setCheck(true)}
            >
              <FaRegAddressBook className="mt-1 mr-2" />
              Đổi mật khẩu
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default SidebarInfor;
