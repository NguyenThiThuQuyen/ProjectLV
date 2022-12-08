import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import bglogin from "../../assets/upload/bglogin.jpg";
import logo from "../../assets/upload/logo.png";
import { getLoginGuestAPI, dataCheck } from "../../redux/Auth/guestRedux";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginGuest = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigator = useNavigate();
  const check = useSelector(dataCheck);

  const PARENT = localStorage.getItem("parent")
    ? JSON.parse(localStorage.getItem("parent"))
    : false;

  const params = {
    email: email,
    password: password,
  };
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email && password) {
      toast.error("Vui lòng nhập email!");
    } else if (!password && email) {
      toast.error("Vui lòng nhập mật khẩu!");
    } else if (!email && !password) {
      toast.error("Vui lòng nhập email và mật khẩu!");
    } else if (email && password) {
      dispatch(getLoginGuestAPI(params));
    }
  };

  useEffect(() => {
    if (PARENT) {
      navigator("/");
    }
  }, [check]);

  return (
    <>
      <ToastContainer />
      <div className="w-full flex flex-wrap justify-center">
        <img
          src={bglogin}
          alt=""
          className="mx-auto h-screen w-full object-cover opacity-80"
        />
        <div className="fixed py-40">
          <div className="border-2 border-slate-200 shadow-lg shadow-indigo-400 mx-auto w-11/12 bg-white">
            <div className="grid grid-cols-2">
              <div className="col-span-1">
                <div className="w-full mt-8">
                  <img src={logo} alt="" className="h-[2.5rem] mx-auto" />
                </div>
                <div className="text-3xl mt-4 font-medium text-center text-sky-700">
                  ĐĂNG NHẬP
                </div>
                <form
                  className="xl:mx-24 md:mx-8 xs:mx-6 mt-5"
                  onSubmit={handleSubmit}
                >
                  <div className="grid grid-cols-1">
                    <div className="col-span-1 my-2">
                      <input
                        type="text"
                        placeholder="Email"
                        onChange={(event) => setEmail(event.target.value)}
                        className="border rounded-lg p-2 mt-1 w-full bg-slate-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1">
                    <div className="col-span-1 my-2">
                      <input
                        type="password"
                        placeholder="Password"
                        className="border rounded-lg p-2 mt-1 w-full bg-slate-200"
                        onChange={(event) => setPassword(event.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 my-5 w-full">
                    <div className="col-span-1 my-2 mx-auto">
                      <button
                        className="border-2 rounded-3xl px-7 py-2 bg-sky-500 text-white font-medium
                                                                  hover:bg-transparent 
                                                                  hover:border-2
                                                                  hover:border-sky-500
                                                                  hover:text-black"
                        type="submit"
                      >
                        ĐĂNG NHẬP
                      </button>
                    </div>
                    <Link to="/login">
                      <div className="italic text-center text-sm hover:text-sky-700 hover:underline hover:underline-offset-2">
                        Đăng nhập với quyền khác
                      </div>
                    </Link>
                  </div>
                </form>
              </div>

              <div className="col-span-1 bg-indigo-600">
                <div className="px-8 text-center mt-20">
                  <div className="text-white text-4xl font-medium">
                    Chào bạn!
                  </div>
                  <div className="text-white text-lg my-6">
                    Đăng ký tài khoản để có trải nghiệm thú vị cùng chúng tôi!
                  </div>
                  <div className="w-full">
                    <button
                      className="border-2 rounded-3xl px-7 py-2 bg-transparent text-white font-medium
                                                                  hover:bg-white 
                                                                  hover:border-2
                                                                  hover:border-white
                                                                  hover:text-black"
                    >
                      <Link to="/register">ĐĂNG KÝ</Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginGuest;
