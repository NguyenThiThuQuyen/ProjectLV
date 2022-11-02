import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import bglogin from "../assets/upload/logo.png";

const DangKyTuVan = () => {
  return (
    <div className="h-screen ">
      <Header />
      <div className="grid grid-cols-3">
        <div className="col-span-1 ">
          <div className="w-full mt-48">
            <div className="ml-10 border-2 border-green-600 py-5 px-5 rounded-md">
              <div className="">
                <img
                  src={bglogin}
                  alt=""
                  className="mx-auto w-[40px] h-[40px] object-cover opacity-80"
                />
              </div>
              <div className="text-center font-Caveat text-3xl">
                Children's Care
              </div>

              <div className="text-orange-600 text-xl font-bold mt-5">
                Hotline: 012-345-678
              </div>
              <div className="text-green-700 font-bold">
                Mở cửa: 7h30 - 17h / T2 - CN
              </div>

              <div className="mt-2 text-lg text-green-700 font-bold underline underline-offset-4">
                LƯU Ý:
              </div>
              <div className="font-bold mt-2">
                Quý khách vui lòng gửi thông tin chi tiết để chúng tôi có thể
                sắp xếp cuộc hẹn.
              </div>
              <div className="mt-3 text-justify">
                - Lịch hẹn có hiệu lực sau khi được xác nhận chính thức từ Trung
                tâm tư vấn Children's Care.
              </div>
              <div className="mt-3 text-justify">
                - Vui lòng cung cấp thông tin chính xác để được phục vụ tốt
                nhất. Trong trường hợp cung cấp sai thông tin email & điện
                thoại, việc xác nhận cuộc hẹn sẽ không hiệu lực.
              </div>
              <div className="mt-3 text-justify">
                - Quý khách sử dụng dịch vụ Đặt hẹn trực tuyến, xin vui lòng đặt
                trước ít nhất là 24 giờ trước khi đến khám.
              </div>
              <div className="mt-3 text-justify">
                - Trong những trường hợp khẩn cấp hoặc nghi ngờ có các triệu
                chứng nguy hiểm, quý khách nên ĐẾN TRỰC TIẾP hoặc trung tâm y tế
                gần nhất để kịp thời xử lý.
              </div>
            </div>
            <div className=""></div>
          </div>
        </div>
        <div className="col-span-2 ">
          <div className="w-full">
            <div className="w-5/6 mx-auto px-3">
              <div className="text-center mb-10 mt-32 font-semibold text-sky-500 text-lg underline underline-offset-8">
                ĐĂNG KÝ TƯ VẤN
              </div>
              <div className="border-l-2 border-l-slate-400">
                <span className="absolute mt-10 left-[594px] w-[20px] h-[20px] bg-sky-600 rounded-full"></span>
                <div className="ml-8 shadow-lg shadow-slate-300 border-slate-200 py-10">
                  <div className="text-sm font-semibold text-sky-700 ml-5">
                    NHẬP THÔNG TIN NGƯỜI ĐẠI DIỆN TRẺ:
                  </div>
                  <div className="mt-5">
                    <div className="text-sm text-red-600 ml-5">
                      Thông tin bắt buộc nhập *
                    </div>
                    <div className="grid grid-rows-2 mt-2">
                      <div className="grid row-span-1 grid-cols-2">
                        <div className="col-span-1 mx-5">
                          <label htmlFor="" className="text-slate-700">
                            Họ tên người đại diện
                          </label>
                          <input
                            type="text"
                            placeholder="Ví dụ: Nguyễn Văn A"
                            className="w-full h-10 border border-2 rounded-md p-2 mt-1 outline-slate-300 bg-slate-100"
                          />
                        </div>
                        <div className="col-span-1 mx-5">
                          <label htmlFor="" className="text-slate-700">
                            Chọn giới tính
                          </label>
                          <input
                            type="text"
                            placeholder="Ví dụ: Nguyễn Văn A"
                            className="w-full h-10 border rounded-md p-2 mt-1 outline-slate-300 bg-slate-100"
                          />
                        </div>
                      </div>
                      <div className="grid row-span-1 grid-cols-2 mt-2">
                        <div className="col-span-1 mx-5">
                          <label htmlFor="" className="text-slate-700">
                            Email
                          </label>
                          <input
                            type="text"
                            placeholder="Ví dụ: abc@gmail.com"
                            className="w-full h-10 border rounded-md p-2 mt-1 outline-slate-300 bg-slate-100"
                          />
                        </div>
                        <div className="col-span-1 mx-5">
                          <label htmlFor="" className="text-slate-700">
                            Điện thoại liên hệ
                          </label>
                          <input
                            type="text"
                            placeholder="Nhập địa chỉ thường trú"
                            className="w-full h-10 border rounded-md p-2 mt-1 outline-slate-300 bg-slate-100"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-l-2 border-l-slate-400 mt-10">
                <span className="absolute mt-10 left-[594px] w-[20px] h-[20px] bg-sky-600 rounded-full"></span>
                <div className="ml-8 shadow-lg shadow-slate-300 border-slate-200 py-5">
                  <div className="text-sm font-semibold text-sky-700 ml-5 mt-5">
                    NHẬP THÔNG TIN TRẺ:
                  </div>
                  <div className="mt-5">
                    <div className="text-sm text-red-600 ml-5">
                      Thông tin bắt buộc nhập *
                    </div>

                    <div className="grid grid-rows-2 mt-2">
                      <div className="grid row-span-1 grid-cols-2">
                        <div className="col-span-1 mx-5">
                          <label htmlFor="" className="text-slate-700">
                            Họ tên trẻ
                          </label>
                          <input
                            type="text"
                            placeholder="Ví dụ: Nguyễn Văn A"
                            className="w-full h-10 border border-2 rounded-md p-2 mt-1 outline-slate-300 bg-slate-100"
                          />
                        </div>
                        <div className="col-span-1 mx-5">
                          <label htmlFor="" className="text-slate-700">
                            Chọn giới tính
                          </label>
                          <input
                            type="text"
                            placeholder="Ví dụ: Nguyễn Văn A"
                            className="w-full h-10 border rounded-md p-2 mt-1 outline-slate-300 bg-slate-100"
                          />
                        </div>
                      </div>

                      <div className="grid row-span-1 grid-cols-2 mt-4">
                        <div className="col-span-1 mx-5">
                          <label htmlFor="" className="text-slate-700">
                            Ngày sinh
                          </label>
                          <input
                            type="text"
                            placeholder="Ví dụ: abc@gmail.com"
                            className="w-full h-10 border rounded-md p-2 mt-1 outline-slate-300 bg-slate-100"
                          />
                        </div>
                        <div className="col-span-1 mx-5">
                          <label htmlFor="" className="text-slate-700">
                            Địa chỉ liên hệ
                          </label>
                          <input
                            type="text"
                            placeholder="Nhập địa chỉ thường trú"
                            className="w-full h-10 border rounded-md p-2 mt-1 outline-slate-300 bg-slate-100"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-l-2 border-l-slate-400 mt-10">
                <span className="absolute mt-10 left-[594px] w-[20px] h-[20px] bg-sky-600 rounded-full"></span>
                <div className="ml-8 shadow-lg shadow-slate-300 border-slate-200 py-5">
                  <div className="text-sm font-semibold text-sky-700 ml-5 mt-5">
                    NHẬP THÔNG TIN TƯ VẤN:
                  </div>
                  <div className="mt-5">
                    <div className="text-sm text-red-600 ml-5">
                      Thông tin bắt buộc nhập *
                    </div>

                    <div className="grid grid-rows-2 mt-2">
                      <div className="grid row-span-1 grid-cols-2">
                        <div className="col-span-1 mx-5">
                          <label htmlFor="" className="text-slate-700">
                            Gói tư vấn
                          </label>
                          <input
                            type="text"
                            placeholder="Ví dụ: Nguyễn Văn A"
                            className="w-full h-10 border border-2 rounded-md p-2 mt-1 outline-slate-300 bg-slate-100"
                          />
                        </div>
                        <div className="col-span-1 mx-5">
                          <label htmlFor="" className="text-slate-700">
                            Bác sĩ tư vấn
                          </label>
                          <input
                            type="text"
                            placeholder="Ví dụ: Nguyễn Văn A"
                            className="w-full h-10 border rounded-md p-2 mt-1 outline-slate-300 bg-slate-100"
                          />
                        </div>
                      </div>

                      <div className="grid row-span-1 grid-cols-2 mt-4">
                        <div className="col-span-1 mx-5">
                          <label htmlFor="" className="text-slate-700">
                            Ngày tư vấn
                          </label>
                          <input
                            type="text"
                            placeholder="Ví dụ: abc@gmail.com"
                            className="w-full h-10 border rounded-md p-2 mt-1 outline-slate-300 bg-slate-100"
                          />
                        </div>
                        <div className="col-span-1 mx-5">
                          <label htmlFor="" className="text-slate-700">
                            Khung giờ tư vấn
                          </label>
                          <input
                            type="text"
                            placeholder="Nhập địa chỉ thường trú"
                            className="w-full h-10 border rounded-md p-2 mt-1 outline-slate-300 bg-slate-100"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 w-full pr-5 text-right">
                <button
                  className="rounded px-6 py-3 font-semibold hover:text-white text-black
                  hover:bg-sky-500 bg-white border-2 border-sky-500 mr-auto "
                >
                  NHẬP LẠI
                </button>
                <button
                  className="ml-5 mb-20 rounded px-6 py-3 font-semibold text-white hover:text-white
                                                         bg-sky-500 hover:bg-sky-800 hover:border-2
                                                         hover:border-sky-500 mr-auto "
                >
                  ĐĂNG KÝ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DangKyTuVan;
