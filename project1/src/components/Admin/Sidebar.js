import React from "react";
import logo from "../../assets/upload/logo.png";
import { Link } from "react-router-dom";
import { RiBillLine } from "react-icons/ri";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { GiMedicalPackAlt } from "react-icons/gi";
import {
  AiOutlineSchedule,
  AiOutlineUserAdd,
  AiOutlineBell,
  AiOutlineBarChart,
} from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";

const Sidebar = () => {
  return (
    // sidebar
    <div className="flex-initial w-1/6 min-h-screen border-r-2 border-scale-700">
      {/* top */}
      <div className="h-12 flex items-center justify-center font-bold">
        {/* logo */}
        <span className="text-slate-800">
          <div className="flex py-8 font-Caveat text-3xl">
            <img src={logo} alt="" className="h-[2rem] " />
            Children's Care
          </div>
        </span>
      </div>
      {/* <hr className="h-0 border border-slate-300" /> */}
      {/* center */}
      <div className="pl-2.5 mt-5">
        <ul className="list-none m-0 p-0">
          {/* <li className="flex p-3 items-center cursor-pointer hover:bg-slate-300">
            <MdOutlineDashboard className="mx-2 mt-1 text-xl text-teal-700" />
            <span className="text-slate-800">Bảng điều khiển</span>
          </li> */}

          <p className="text-sm font-bold text-slate-500 my-3.5">DANH SÁCH</p>
          <li className="flex p-3 items-center cursor-pointer hover:bg-slate-300">
            <Link to="/admin/users-manager" className="flex">
              <BiUserCircle className="mx-2 mt-1 text-xl text-teal-700" />
              <span className="text-slate-800">Người dùng</span>
            </Link>
          </li>
          <li className="flex p-3 items-center cursor-pointer hover:bg-slate-300">
            <Link to="/admin/medical-package-manager" className="flex">
              <GiMedicalPackAlt className="mx-2 mt-1 text-xl text-teal-700" />
              <span className="text-slate-800">Gói tư vấn</span>
            </Link>
          </li>
          <li className="flex p-3 items-center cursor-pointer hover:bg-slate-300">
            <RiBillLine className="mx-2 mt-1 text-xl text-teal-700" />
            <span className="text-slate-800">Hóa đơn</span>
          </li>

          <p className="text-sm font-bold text-slate-500 my-3.5">DỊCH VỤ</p>
          <li className="flex p-3 items-center cursor-pointer hover:bg-slate-300">
            <Link to="/admin/schedule-manager" className="flex">
              <AiOutlineSchedule className="mx-2 mt-1 text-xl text-teal-700" />
              <span className="text-slate-800">Lịch tư vấn</span>
            </Link>
          </li>
          <li className="flex p-3 items-center cursor-pointer hover:bg-slate-300">
            <BsFillJournalBookmarkFill className="mx-2 mt-1 text-xl text-teal-700" />
            <span className="text-slate-800">Đặt chỗ</span>
          </li>

          <p className="text-sm font-bold text-slate-500 my-3.5">HỮU ÍCH</p>
          <li className="flex p-3 items-center cursor-pointer hover:bg-slate-300">
            <AiOutlineBell className="mx-2 mt-1 text-xl text-teal-700" />
            <span className="text-slate-800">Thông báo</span>
          </li>
          <li className="flex p-3 items-center cursor-pointer hover:bg-slate-300">
            <AiOutlineBarChart className="mx-2 mt-1 text-xl text-teal-700" />
            <span className="text-slate-800">Thống kê</span>
          </li>
          <li className="flex p-3 items-center cursor-pointer hover:bg-slate-300">
            <FiSettings className="mx-2 mt-1 text-xl text-teal-700" />
            <span className="text-slate-800">Cài đặt</span>
          </li>

          <p className="text-sm font-bold text-slate-500 my-3.5">NGƯỜI DÙNG</p>
          <li className="flex p-3 items-center cursor-pointer hover:bg-slate-300">
            <AiOutlineUserAdd className="mx-2 mt-1 text-xl text-teal-700" />
            <span className="text-slate-800">Thông tin người dùng</span>
          </li>
          <li className="flex p-3 items-center cursor-pointer hover:bg-slate-300">
            <IoIosLogOut className="mx-2 mt-1 text-xl text-teal-700" />
            <span className="text-slate-800">Đăng xuất</span>
          </li>
        </ul>
      </div>
      {/* bottom */}
      <div className="flex items-center m-2.5">
        <div className="w-5 h-5 rounded-[5px] border border-black cursor-pointer m-1.5 bg-white"></div>
        <div className="w-5 h-5 rounded-[5px] border border-scale-700 cursor-pointer m-1.5 bg-black"></div>
      </div>
    </div>
  );
};

export default Sidebar;
