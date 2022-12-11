import React, { useState, useEffect } from "react";
import logo from "../../assets/upload/logo.png";
import { Link, NavLink, useParams, useLocation } from "react-router-dom";
import { RiBillLine } from "react-icons/ri";
import { TbReportMedical } from "react-icons/tb";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { BiNews } from "react-icons/bi";
import { GiMedicalPackAlt } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import "./Sidebar.css";
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
  const [showActive1, setShowActive1] = useState(false);
  const [showActive2, setShowActive2] = useState(false);
  const [getParams, setGetParams] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user?.id;
  const location = useLocation();

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  useEffect(() => {
    if (location.pathname) {
      setGetParams(location.pathname);
    }
  }, [location]);

  // const handleInfor = () => {
  //   navigator(`/manager/infor-user/${id}`);
  // };

  let activeStyle = {
    display: "flex",
    padding: "12px",
    alignItems: "center",
    cursor: "pointer",
    background: "#d2e2d2",
  };

  let activeNone = {
    display: "flex",
    padding: "12px",
    alignItems: "center",
    cursor: "pointer",
    background: "white",
  };

  return (
    <div className="w-1/6 h-screen border-r-2 border-scale-700 bg-sky-100 sticky top-0">
      <div className="sticky top-0 ">
        <div className="h-12 flex items-center justify-center font-bold">
          <span className="text-slate-800">
            <NavLink to="/manager">
              <div className="flex py-8 font-Caveat text-3xl">
                <img src={logo} alt="" className="h-[2rem] " />
                Children's Care
              </div>
            </NavLink>
          </span>
        </div>

        <div className="pl-2.5 mt-5">
          {user && user.roleId == "R1" ? (
            <ul className="list-none m-0 p-0">
              <p className="text-sm font-bold text-slate-500 my-3.5">
                DANH SÁCH
              </p>
              <li>
                <NavLink
                  to="/manager/users-manager"
                  className={
                    getParams == "/manager/users-manager" ||
                    getParams == "/manager/patient-manager" ||
                    getParams == "/manager/parent-manager"
                      ? "flex p-3 items-center cursor-pointer bg-green-400"
                      : "flex p-3 items-center cursor-pointer hover:bg-slate-300"
                  }
                >
                  <div className="flex">
                    <BiUserCircle className="mx-2 mt-1 text-xl text-teal-700" />
                    <span className="text-slate-800">Người dùng</span>
                  </div>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/manager/medical-package-manager"
                  className={({ isActive }) =>
                    isActive
                      ? "flex p-3 items-center cursor-pointer bg-green-400"
                      : "flex p-3 items-center cursor-pointer hover:bg-slate-300"
                  }
                >
                  <div className="flex">
                    <GiMedicalPackAlt className="mx-2 mt-1 text-xl text-teal-700" />
                    <span className="text-slate-800">Gói tư vấn</span>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/manager/dish-manager"
                  className={
                    getParams == "/manager/dish-manager" ||
                    getParams == "/manager/category-manager"
                      ? "flex p-3 items-center cursor-pointer bg-green-400"
                      : "flex p-3 items-center cursor-pointer hover:bg-slate-300"
                  }
                >
                  <div className="flex">
                    <RiBillLine className="mx-2 mt-1 text-xl text-teal-700" />
                    <span className="text-slate-800">Thực đơn</span>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/manager/medical-manager"
                  className={
                    getParams == "/manager/medical-manager" ||
                    getParams == "/manager/medical-type-manager"
                      ? "flex p-3 items-center cursor-pointer bg-green-400"
                      : "flex p-3 items-center cursor-pointer hover:bg-slate-300"
                  }
                >
                  <div className="flex">
                    <TbReportMedical className="mx-2 mt-1 text-xl text-teal-700" />
                    <span className="text-slate-800">Thuốc hỗ trợ</span>
                  </div>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/manager/news-manager"
                  className={({ isActive }) =>
                    isActive
                      ? "flex p-3 items-center cursor-pointer bg-green-400"
                      : "flex p-3 items-center cursor-pointer hover:bg-slate-300"
                  }
                >
                  <div className="flex">
                    <BiNews className="mx-2 mt-1 text-xl text-teal-700" />
                    <span className="text-slate-800">Tin tức</span>
                  </div>
                </NavLink>
              </li>

              <p className="text-sm font-bold text-slate-500 my-3.5">DỊCH VỤ</p>
              <li>
                <NavLink
                  to="/manager/schedule-manager"
                  className={({ isActive }) =>
                    isActive
                      ? "flex p-3 items-center cursor-pointer bg-green-400"
                      : "flex p-3 items-center cursor-pointer hover:bg-slate-300"
                  }
                >
                  <div className="flex">
                    <AiOutlineSchedule className="mx-2 mt-1 text-xl text-teal-700" />
                    <span className="text-slate-800">Lịch tư vấn</span>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/manager/reservation-ticket-manager"
                  className={
                    getParams == "/manager/reservation-ticket-manager" ||
                    getParams == "/manager/reservation-ticket-date"
                      ? "flex p-3 items-center cursor-pointer bg-green-400"
                      : "flex p-3 items-center cursor-pointer hover:bg-slate-300"
                  }
                >
                  <div className="flex">
                    <BsFillJournalBookmarkFill className="mx-2 mt-1 text-xl text-teal-700" />
                    <span className="text-slate-800">Đặt chỗ</span>
                  </div>
                </NavLink>
              </li>

              <p className="text-sm font-bold text-slate-500 my-3.5">HỮU ÍCH</p>
              <li>
                <NavLink
                  to="/manager/consult-statistical"
                  className={({ isActive }) =>
                    isActive
                      ? "flex p-3 items-center cursor-pointer bg-green-400"
                      : "flex p-3 items-center cursor-pointer hover:bg-slate-300"
                  }
                >
                  <div className="flex">
                    <AiOutlineBarChart className="mx-2 mt-1 text-xl text-teal-700" />
                    <span className="text-slate-800">Thống kê</span>
                  </div>
                </NavLink>
              </li>

              <p className="text-sm font-bold text-slate-500 my-3.5">
                NGƯỜI DÙNG
              </p>
              <li>
                <NavLink
                  to={`/manager/infor-user/${id}`}
                  className={({ isActive }) =>
                    isActive
                      ? "flex p-3 items-center cursor-pointer bg-green-400"
                      : "flex p-3 items-center cursor-pointer hover:bg-slate-300"
                  }
                >
                  <div className="flex">
                    <AiOutlineUserAdd className="mx-2 mt-1 text-xl text-teal-700" />
                    <span className="text-slate-800">Thông tin người dùng</span>
                  </div>
                </NavLink>
              </li>
              <li className="sidebarli">
                <div className="flex">
                  <IoIosLogOut className="mx-2 mt-1 text-xl text-teal-700" />
                  <span
                    className="text-slate-800"
                    onClick={() => handleLogout()}
                  >
                    Đăng xuất
                  </span>
                </div>
              </li>
            </ul>
          ) : (
            <ul className="list-none m-0 p-0">
              <p className="text-sm font-bold text-slate-500 my-3.5">
                DANH SÁCH
              </p>
              <li>
                <NavLink
                  to="/manager/consult"
                  className={
                    getParams == "/manager/consult" ||
                    getParams == "/manager/consult-alldate"
                      ? "flex p-3 items-center cursor-pointer bg-green-400"
                      : "flex p-3 items-center cursor-pointer hover:bg-slate-300"
                  }
                >
                  <div className="flex">
                    <GiMedicalPackAlt className="mx-2 mt-1 text-xl text-teal-700" />
                    <span className="text-slate-800">Tư vấn</span>
                  </div>
                </NavLink>
              </li>
              <p className="text-sm font-bold text-slate-500 my-3.5">
                NGƯỜI DÙNG
              </p>
              <li>
                <NavLink
                  to={`/manager/infor-user/${id}`}
                  className={({ isActive }) =>
                    isActive
                      ? "flex p-3 items-center cursor-pointer bg-green-400"
                      : "flex p-3 items-center cursor-pointer hover:bg-slate-300"
                  }
                >
                  <div className="flex">
                    <AiOutlineUserAdd className="mx-2 mt-1 text-xl text-teal-700" />
                    <span className="text-slate-800">Thông tin người dùng</span>
                  </div>
                </NavLink>
              </li>
              <li className="sidebarli">
                <div className="flex">
                  <IoIosLogOut className="mx-2 mt-1 text-xl text-teal-700" />
                  <span
                    className="text-slate-800"
                    onClick={() => handleLogout()}
                  >
                    Đăng xuất
                  </span>
                </div>
              </li>
            </ul>
          )}
        </div>
        {/* <div className="flex items-center m-2.5">
          <div className="w-5 h-5 rounded-[5px] border border-black cursor-pointer m-1.5 bg-white"></div>
          <div className="w-5 h-5 rounded-[5px] border border-scale-700 cursor-pointer m-1.5 bg-black"></div>
        </div> */}
      </div>
    </div>
  );
};

export default Sidebar;
