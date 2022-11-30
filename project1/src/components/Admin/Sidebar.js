import React from "react";
import logo from "../../assets/upload/logo.png";
import { Link } from "react-router-dom";
import { RiBillLine } from "react-icons/ri";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { GiMedicalPackAlt } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";

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
const Sidebar = () => {
  const navigator = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user.id;

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  const handleInfor = () => {
    navigator(`/manager/infor-user/${id}`);
  };

  return (
    <div className="w-1/6 border-r-2 border-scale-700">
      <div className="sticky top-0">
        <div className="h-12 flex items-center justify-center font-bold">
          <span className="text-slate-800">
            <Link to="/manager">
              <div className="flex py-8 font-Caveat text-3xl">
                <img src={logo} alt="" className="h-[2rem] " />
                Children's Care
              </div>
            </Link>
          </span>
        </div>

        <div className="pl-2.5 mt-5 ">
          {user && user.roleId == "R1" ? (
            <ul className="list-none m-0 p-0">
              <p className="text-sm font-bold text-slate-500 my-3.5">
                DANH SÁCH
              </p>
              <li className="flex p-3 items-center cursor-pointer hover:bg-slate-300">
                <Link to="/manager/users-manager" className="flex">
                  <BiUserCircle className="mx-2 mt-1 text-xl text-teal-700" />
                  <span className="text-slate-800">Người dùng</span>
                </Link>
              </li>
              <li className="flex p-3 items-center cursor-pointer hover:bg-slate-300">
                <Link to="/manager/medical-package-manager" className="flex">
                  <GiMedicalPackAlt className="mx-2 mt-1 text-xl text-teal-700" />
                  <span className="text-slate-800">Gói tư vấn</span>
                </Link>
              </li>
              <li className="flex p-3 items-center cursor-pointer hover:bg-slate-300">
                <Link to="/manager/dish-manager" className="flex">
                  <RiBillLine className="mx-2 mt-1 text-xl text-teal-700" />
                  <span className="text-slate-800">Thực đơn</span>
                </Link>
              </li>
              <li className="flex p-3 items-center cursor-pointer hover:bg-slate-300">
                <Link to="/manager/medical-manager" className="flex">
                  <RiBillLine className="mx-2 mt-1 text-xl text-teal-700" />
                  <span className="text-slate-800">Thuốc hỗ trợ</span>
                </Link>
              </li>

              <p className="text-sm font-bold text-slate-500 my-3.5">DỊCH VỤ</p>
              <li className="flex p-3 items-center cursor-pointer hover:bg-slate-300">
                <Link to="/manager/schedule-manager" className="flex">
                  <AiOutlineSchedule className="mx-2 mt-1 text-xl text-teal-700" />
                  <span className="text-slate-800">Lịch tư vấn</span>
                </Link>
              </li>
              <li className="flex p-3 items-center cursor-pointer hover:bg-slate-300">
                <Link to="/manager/reservation-ticket-manager" className="flex">
                  <BsFillJournalBookmarkFill className="mx-2 mt-1 text-xl text-teal-700" />
                  <span className="text-slate-800">Đặt chỗ</span>
                </Link>
              </li>

              <p className="text-sm font-bold text-slate-500 my-3.5">HỮU ÍCH</p>
              <li className="flex p-3 items-center cursor-pointer hover:bg-slate-300">
                <AiOutlineBell className="mx-2 mt-1 text-xl text-teal-700" />
                <span className="text-slate-800">Thông báo</span>
              </li>
              <li className="flex p-3 items-center cursor-pointer hover:bg-slate-300">
                <Link to="/manager/" className="flex">
                  <AiOutlineBarChart className="mx-2 mt-1 text-xl text-teal-700" />
                  <span className="text-slate-800">Thống kê</span>
                </Link>
              </li>
              <li className="flex p-3 items-center cursor-pointer hover:bg-slate-300">
                <FiSettings className="mx-2 mt-1 text-xl text-teal-700" />
                <span className="text-slate-800">Cài đặt</span>
              </li>

              <p className="text-sm font-bold text-slate-500 my-3.5">
                NGƯỜI DÙNG
              </p>
              <li
                className="flex p-3 items-center cursor-pointer hover:bg-slate-300"
                onClick={() => handleInfor()}
              >
                <AiOutlineUserAdd className="mx-2 mt-1 text-xl text-teal-700" />
                <span className="text-slate-800">Thông tin người dùng</span>
              </li>
              <li className="flex p-3 items-center cursor-pointer hover:bg-slate-300">
                <IoIosLogOut className="mx-2 mt-1 text-xl text-teal-700" />
                <span className="text-slate-800" onClick={() => handleLogout()}>
                  Đăng xuất
                </span>
              </li>
            </ul>
          ) : (
            <ul className="list-none m-0 p-0">
              <p className="text-sm font-bold text-slate-500 my-3.5">
                DANH SÁCH
              </p>
              <li className="flex p-3 items-center cursor-pointer hover:bg-slate-300">
                <Link to="/manager/schedule-doctor" className="flex">
                  <BiUserCircle className="mx-2 mt-1 text-xl text-teal-700" />
                  <span className="text-slate-800">Lịch tư vấn</span>
                </Link>
              </li>
              <li className="flex p-3 items-center cursor-pointer hover:bg-slate-300">
                <Link to="/manager/consult" className="flex">
                  <GiMedicalPackAlt className="mx-2 mt-1 text-xl text-teal-700" />
                  <span className="text-slate-800">Tư vấn</span>
                </Link>
              </li>
              <p className="text-sm font-bold text-slate-500 my-3.5">
                NGƯỜI DÙNG
              </p>
              <li
                className="flex p-3 items-center cursor-pointer hover:bg-slate-300"
                onClick={() => handleInfor()}
              >
                <AiOutlineUserAdd className="mx-2 mt-1 text-xl text-teal-700" />
                <span className="text-slate-800">Thông tin người dùng</span>
              </li>
              <li className="flex p-3 items-center cursor-pointer hover:bg-slate-300">
                <IoIosLogOut className="mx-2 mt-1 text-xl text-teal-700" />
                <span className="text-slate-800" onClick={() => handleLogout()}>
                  Đăng xuất
                </span>
              </li>
            </ul>
          )}
        </div>
        <div className="flex items-center m-2.5">
          <div className="w-5 h-5 rounded-[5px] border border-black cursor-pointer m-1.5 bg-white"></div>
          <div className="w-5 h-5 rounded-[5px] border border-scale-700 cursor-pointer m-1.5 bg-black"></div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
