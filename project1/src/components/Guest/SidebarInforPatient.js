import React, { useState, useEffect } from "react";
import logo from "../../assets/upload/logo.png";
import { Link, NavLink } from "react-router-dom";
import { RiUserAddFill } from "react-icons/ri";
import { GrHistory } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { FaRegAddressBook } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
// import PatientModal2 from "../../components/Admin/Modal/Patient/PatientModal2";
import PatientModal from "../../components/Admin/Modal/Patient/PatientModal";
import { useNavigate, useParams } from "react-router-dom";
import { logout } from "../../redux/Auth/adminRedux";
const SidebarInfor = () => {
  const [showModalInforPatient, setShowModalInforPatient] = useState(false);

  const [check, setCheck] = useState(true);
  const navigator = useNavigate();
  const params = useParams();
  const item = JSON.parse(localStorage.getItem("parent"));
  // const id = parent?.id;
  console.log("params:", params);

  const dispatch = useDispatch();

  // const handleHistory = () => {
  //   navigator(`/consulting-history/${params?.id}`);
  // };

  // const handleUserInfor = () => {
  //   navigator(`/infor-patient/${params?.id}`);
  // };

  const handleDong = (test) => {
    setShowModalInforPatient(test);
  };

  const handleMoLai = (data) => {
    setShowModalInforPatient(data);
  };

  return (
    <div className="grid-rows-2">
      <div
        className="row-span-1 flex font-medium py-3 cursor-pointer border-2
      bg-white rounded-full mb-5 px-5 hover:bg-sky-700 hover:text-white"
        onClick={() => setShowModalInforPatient(true)}
      >
        <RiUserAddFill className="mt-1 mr-2" size={19} />
        <div>Thêm hồ sơ bệnh nhân</div>
      </div>
      <div className="">
        {showModalInforPatient === true ? (
          <PatientModal
            openModal={showModalInforPatient}
            handleClose={handleDong}
            handleMo={handleMoLai}
            item={item}
          />
        ) : (
          <>
            <div className=""></div>
          </>
        )}
      </div>
      <div className="row-span-1">
        <ul className="list-none m-0 p-0">
          <li>
            <NavLink
              to={`/infor-patient/${params?.id}`}
              className={({ isActive }) =>
                isActive
                  ? "text-sky-500  flex font-medium py-3 cursor-pointer bg-slate-200 rounded-r-full px-5"
                  : "text-slate-900 hover:text-slate-500 flex font-medium py-3 cursor-pointer hover:bg-slate-100 hover:rounded-r-full px-5"
              }
            >
              <FaRegAddressBook className="mt-1 mr-2" />
              <span>Hồ sơ người dùng</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to={`/consulting-history/${params?.id}`}
              className={({ isActive }) =>
                isActive
                  ? "text-sky-500  flex font-medium py-3 cursor-pointer bg-slate-200 rounded-r-full px-5"
                  : "text-slate-900 hover:text-slate-500 flex font-medium py-3 cursor-pointer hover:bg-slate-100 hover:rounded-r-full px-5"
              }
            >
              <GrHistory className="mt-1 mr-2" />
              <span>Lịch sử tư vấn</span>
            </NavLink>
          </li>
          <li className="text-slate-900 hover:text-slate-700 flex font-medium py-3 cursor-pointer hover:bg-sky-50 hover:rounded-r-full px-5">
            <RiLockPasswordLine className="mt-1 mr-2" />
            Đổi mật khẩu
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarInfor;
