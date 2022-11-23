import React, { useState, useEffect } from "react";
import logo from "../../assets/upload/logo.png";
import { Link } from "react-router-dom";
import { RiUserAddFill } from "react-icons/ri";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { GiMedicalPackAlt } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { FaRegAddressBook } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import PatientModal2 from "../../components/Admin/Modal/Patient/PatientModal2";
import {
  AiOutlineSchedule,
  AiOutlineUserAdd,
  AiOutlineBell,
  AiOutlineBarChart,
} from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { logout, dataCheckLogout } from "../../redux/Auth/adminRedux";
const SidebarInfor = () => {
  const [check, setCheck] = useState(true);
  const navigator = useNavigate();
  const params = useParams();
  const parent = JSON.parse(localStorage.getItem("parent"));
  const id = parent?.id;

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  const handleChangeActive = () => {
    setCheck(!check);
  };

  const handleOpenModal = () => {};

  return (
    <div className="grid-rows-2">
      <div
        className="row-span-1  flex font-medium py-3 cursor-pointer border-2 bg-white rounded-full mb-5 px-5 hover:bg-sky-700 hover:text-white"
        onClick={() => handleOpenModal()}
      >
        <RiUserAddFill className="mt-1 mr-2" size={19} />
        <div>Thêm hồ sơ bệnh nhân</div>
      </div>
      {check === true ? (
        <div className="row-span-1">
          <ul className="list-none m-0 p-0">
            <li
              className="text-sky-500  flex font-medium py-3 cursor-pointer bg-slate-200 rounded-r-full px-5"
              // onClick={() => handleInfor()}
              onClick={() => handleChangeActive()}
            >
              <FaRegAddressBook className="mt-1 mr-2" />
              Hồ sơ người dùng
            </li>
            <li
              className="text-slate-900 hover:text-slate-700 flex font-medium py-3 cursor-pointer hover:bg-sky-50 hover:rounded-r-full px-5"
              onClick={() => handleChangeActive()}
            >
              <RiLockPasswordLine className="mt-1 mr-2" />
              Đổi mật khẩu
            </li>
          </ul>
        </div>
      ) : (
        <div className="row-span-1">
          <ul className="list-none m-0 p-0">
            <li
              className="text-slate-900 hover:text-slate-500 flex font-medium py-3 cursor-pointer hover:bg-slate-100 hover:rounded-r-full px-5"
              onClick={() => handleChangeActive()}
            >
              <FaRegAddressBook className="mt-1 mr-2" />
              Hồ sơ người dùng
            </li>
            <li
              className="text-sky-600  flex font-medium py-3 cursor-pointer bg-slate-200 rounded-r-full px-5"
              onClick={() => handleChangeActive()}
            >
              <FaRegAddressBook className="mt-1 mr-2" />
              Đổi mật khẩu
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SidebarInfor;
