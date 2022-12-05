import React from "react";
import { Link } from "react-router-dom";
import bglogin from "../../assets/upload/bglogin.jpg";
import logo from "../../assets/upload/logo.png";

function Register() {
  return (
    <>
      <div className="w-full flex flex-wrap justify-center">
        <img
          src={bglogin}
          alt=""
          className="mx-auto h-screen w-full object-cover opacity-80"
        />
        <div className="fixed py-20">
          <div className="border-2 border-slate-200 shadow-lg shadow-indigo-400 mx-auto w-full bg-white">
            <div className="grid grid-cols-2">
              <div className="col-span-2">
                <div className="w-full mt-8">
                  <img src={logo} alt="" className="h-[2.5rem] mx-auto" />
                </div>
                <div className="font-HindMadurai text-2xl mt-4 font-bold text-center text-sky-700">
                  ĐĂNG KÝ
                </div>

                <div className="grid row-auto px-8">
                  <div className="grid grid-cols-2">
                    <div className="col-span-1 my-2 px-5">
                      <label className="text-slate-800 ml-1">
                        Tên người dùng
                      </label>
                      <input
                        type="text"
                        placeholder="Nguyễn Văn A"
                        className="border rounded-md p-2 mt-2 w-full bg-slate-200"
                      />
                    </div>
                    <div className="col-span-1 my-2 px-5">
                      <label className="text-slate-800 ml-1">
                        Số điện thoại
                      </label>
                      <input
                        type="text"
                        placeholder="033123123"
                        className="border rounded-md p-2 mt-2 w-full bg-slate-200"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="col-span-1 my-2 px-5">
                      <label className="text-slate-800 ml-1">Email</label>
                      <input
                        type="text"
                        placeholder="abc@gmail.com"
                        className="border rounded-md p-2 mt-2 w-full bg-slate-200"
                      />
                    </div>
                    <div className="col-span-1 my-2 px-5">
                      <label className="text-slate-800 ml-1">Mật khẩu</label>

                      <input
                        type="password"
                        placeholder="Mật khẩu"
                        className="border rounded-md p-2 mt-2 w-full bg-slate-200"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="col-span-1 my-2 px-5">
                      <label className="text-slate-800 ml-1">Giới tính</label>
                      <select
                        type="text"
                        placeholder="Địa chỉ"
                        className="border rounded-md p-2 mt-2 w-full bg-slate-200"
                      >
                        <option value="">Nam</option>
                        <option value="">Nữ</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-span-1 my-2 px-5">
                    <label className="text-slate-800 ml-1">Địa chỉ</label>

                    <input
                      type="text"
                      placeholder="3A, Hưng Lợi, Ninh Kiều, Cần Thơ"
                      className="border rounded-md p-2 mt-2 w-full bg-slate-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 my-5 w-full">
                  <div className="col-span-1 my-2 px-5 mx-auto">
                    <button
                      className="border-2 rounded-3xl px-7 py-2 bg-sky-500 text-white font-medium
                                                                    hover:bg-transparent 
                                                                    hover:border-2
                                                                    hover:border-sky-500
                                                                    hover:text-black"
                    >
                      ĐĂNG KÝ
                    </button>
                  </div>
                  <Link to="/login-guest">
                    <div className="italic text-center text-sm hover:text-sky-700 hover:underline hover:underline-offset-2">
                      Đã có tài khoản đăng nhâp ?
                    </div>
                  </Link>
                </div>
              </div>
              {/* 
              <div className="col-span-1 bg-green-600 w-full">
                <div className="px-8 text-center mt-20">
                  <div className="text-white text-4xl font-medium">
                    Chào bạn!
                  </div>
                  <div className="text-white text-lg mt-6">
                    Bạn đã có tài khoản ?
                  </div>
                  <div className="text-white text-lg mb-6">
                    Hãy đăng nhập để được tư vấn chi tiết nhé !
                  </div>
                  <div className="w-full">
                    <button
                      className="border-2 rounded-3xl px-7 py-2 bg-transparent text-white font-medium
                                                                    hover:bg-white 
                                                                    hover:border-2
                                                                    hover:border-white
                                                                    hover:text-black"
                    >
                      <Link to="/login">ĐĂNG NHẬP</Link>
                    </button>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
