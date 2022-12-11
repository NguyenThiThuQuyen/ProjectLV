import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutguest, dataCheckLogoutGuest } from "../../redux/Auth/guestRedux";
import { IoIosLogOut } from "react-icons/io";
import { FaUserCircle, FaRegAddressBook } from "react-icons/fa";
import { BiBookmarkAltPlus, BiBellMinus } from "react-icons/bi";
import "./Header.css";
import logo from "../../assets/upload/logo.png";
import { UserMenuClasses } from "react-admin";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
function Header() {
  const [showModal, setShowModal] = useState(false);
  const [showInfor, setShowInfor] = useState(false);
  const [button, setButton] = useState(true);
  const [navbar, setNavbar] = useState(false);
  const dispatch = useDispatch();
  const checklogoutguest = useSelector(dataCheckLogoutGuest);
  const navigate = useNavigate();
  const showButton = () => {
    if (window.innerWidth < 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  const parent = JSON.parse(localStorage.getItem("parent"));
  const id = parent?.id;

  useEffect(() => {
    showButton();
  }, []);

  const handleLogout = () => {
    dispatch(logoutguest());
  };

  window.addEventListener("resize", showButton);
  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", changeBackground);

  const handleOpenClose = () => {
    setShowInfor(!showInfor);
  };

  const handleInforPatient = () => {
    navigate(`/infor-patient/${id}`);
  };

  const handleHosoBenhNhan = () => {
    navigate(`/consulting-history/${id}`);
  };

  return (
    <>
      <ToastContainer />
      <div className="">
        <div className={navbar ? "navbar active" : "navbar"}>
          <div className="flex py-5 text-white ml-20 font-Caveat text-4xl">
            <img src={logo} alt="" className="h-[3rem] " />
            Children's Care
          </div>
          <div className="mx-auto my-auto">
            <ul className="flex">
              <li className="mx-8">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "underline underline-offset-8 text-rose-600 font-medium shadow-sm"
                      : "text-white uppercase font-medium shadow-sm hover:text-rose-700"
                  }
                >
                  <span className="">TRANG CHỦ</span>
                </NavLink>
              </li>
              <li className="mx-8">
                <NavLink
                  to="/service"
                  className={({ isActive }) =>
                    isActive
                      ? "underline underline-offset-8 text-rose-600 font-medium shadow-sm"
                      : "text-white uppercase font-medium shadow-sm hover:text-rose-700"
                  }
                >
                  <span className="">DỊCH VỤ</span>
                </NavLink>
              </li>
              <li className="mx-8">
                <NavLink
                  to="/all-doctor"
                  className={({ isActive }) =>
                    isActive
                      ? "underline underline-offset-8 text-rose-600 font-medium shadow-sm"
                      : "text-white uppercase font-medium shadow-sm hover:text-rose-700"
                  }
                >
                  <span className="uppercase">Bác sĩ</span>
                </NavLink>
              </li>
              <li className="mx-8">
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive
                      ? "underline underline-offset-8 text-rose-600 font-medium shadow-sm"
                      : "text-white uppercase font-medium shadow-sm hover:text-rose-700"
                  }
                >
                  <span className="">LIÊN HỆ</span>
                </NavLink>
              </li>
              <li className="mx-8">
                <NavLink
                  to="/news"
                  className={({ isActive }) =>
                    isActive
                      ? "underline underline-offset-8 text-rose-600 font-medium shadow-sm"
                      : "text-white uppercase font-medium shadow-sm hover:text-rose-700"
                  }
                >
                  <span className="">TIN TỨC</span>
                </NavLink>
              </li>
              <li className="flex ml-20 ">
                {parent != null ? (
                  <div className="flex">
                    <div className="flex" onClick={() => handleOpenClose()}>
                      <div className="">
                        <img
                          src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                          alt=""
                          //   avatar
                          className="w-8 h-8 rounded-[50%]"
                        />
                      </div>
                      <div
                        className="mx-2 text-rose-600 font-medium shadow-sm"
                        // onClick={() => setShowModal(true)}
                      >
                        {parent?.name}
                      </div>
                    </div>
                    {showInfor == true ? (
                      <>
                        <div className="grid justify-items-end fixed inset-0 z-50 outline-none focus:outline-none mt-12 mr-32">
                          <div className="relative w-auto my-6 max-w-5xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                              <div className="flex items-start justify-between pr-10 pl-5 py-5 border-b border-solid border-slate-300">
                                <div className="text-black">
                                  <div className="flex">
                                    <FaUserCircle
                                      size={40}
                                      className="mt-2 mr-4 text-slate-400"
                                    />
                                    <div className="">
                                      <div className="text-slate-800">
                                        Xin chào!
                                      </div>
                                      <div className="font-medium">
                                        {parent?.name}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="relative px-6 pb-5 flex-auto">
                                <div className="flex mt-6">
                                  <div
                                    className="flex"
                                    onClick={() => handleInforPatient()}
                                  >
                                    <FaRegAddressBook className="mt-1 text-slate-700 cursor-pointer" />
                                    <div className="text-slate-700 ml-2 hover:text-sky-600 cursor-pointer">
                                      Hồ sơ bệnh nhân
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="flex mt-6"
                                  onClick={() => handleHosoBenhNhan()}
                                >
                                  <BiBookmarkAltPlus
                                    size={18}
                                    className="mt-1 text-slate-700 cursor-pointer"
                                  />
                                  <div className="text-slate-700 ml-2 hover:text-sky-600 cursor-pointer">
                                    Phiếu khám bệnh
                                  </div>
                                </div>
                                <div className="flex mt-6">
                                  <BiBellMinus
                                    size={18}
                                    className="mt-1 text-slate-700 cursor-pointer"
                                  />
                                  <div className="text-slate-700 ml-2 hover:text-sky-600 cursor-pointer">
                                    Thông báo
                                  </div>
                                </div>
                                <div className="flex mt-6">
                                  <div
                                    className="flex"
                                    onClick={() => handleLogout()}
                                  >
                                    <IoIosLogOut
                                      size={18}
                                      className="mt-1 text-slate-700 cursor-pointer"
                                    />
                                    <div className="text-slate-700 ml-2 hover:text-sky-600 cursor-pointer">
                                      Thoát
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {/* <div className="ml-2 mt-1" onClick={() => handleLogout()}>
                      <IoIosLogOut size={18} />
                    </div> */}
                  </div>
                ) : (
                  <>
                    <div className="Navlink_style">
                      <NavLink
                        to="/login-guest"
                        className="text-rose-600 font-medium"
                      >
                        ĐĂNG NHẬP
                      </NavLink>
                    </div>
                    <div className="mx-5 Navlink_style">
                      <NavLink
                        to="/register"
                        className="text-rose-600 font-medium"
                      >
                        ĐĂNG KÝ
                      </NavLink>
                    </div>
                  </>
                )}
              </li>
              {/* <li className="flex mx-8">
                  <GoogleTranslate />
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
