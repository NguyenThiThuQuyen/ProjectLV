import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/Auth/adminRedux";
import "./Header.css";
import logo from "../../assets/upload/logo.png";

function Header() {
  const [button, setButton] = useState(true);
  const [navbar, setNavbar] = useState(false);
  const dispatch = useDispatch();
  const showButton = () => {
    if (window.innerWidth < 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
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

  return (
    <>
      <div className={navbar ? "navbar active" : "navbar"}>
        <div className="flex py-5 ml-20 font-Caveat text-4xl">
          <img src={logo} alt="" className="h-[3rem] " />
          Children's Care
        </div>
        <div className="mx-auto my-auto">
          <ul className="flex">
            <li className="flex mx-8">
              <Link to="/" className="">
                <span className="">TRANG CHỦ</span>
              </Link>
            </li>
            <li className="flex mx-8">VỀ CHÚNG TÔI</li>
            <li className="flex mx-8">TRỊ LIỆU</li>
            <li className="flex mx-8">LIÊN HỆ</li>
            <li className="flex mx-8">TIN TỨC</li>
            <li className="flex ml-20 ">
              <div className="link_style">
                <Link to="/login" className="underline underline-offset-8">
                  ĐĂNG NHẬP
                </Link>
              </div>
              <div className="mx-5 link_style">
                <Link to="/register" className="underline underline-offset-8">
                  ĐĂNG KÝ
                </Link>
              </div>
              <div className="link_style">
                {/* <div
                  className="underline underline-offset-8"
                  onClick={() => handleLogout()}
                >
                  Logout
                </div> */}
              </div>
            </li>
            {/* <li className="flex mx-8">
                            <GoogleTranslate />
                        </li> */}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;
