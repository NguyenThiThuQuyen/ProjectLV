import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { BiSearch } from "react-icons/bi";
import { BsPersonCheck } from "react-icons/bs";
import hinh1 from "../assets/upload/bacsi2.jpg";
const AllDocTorHome = () => {
  return (
    <div className="h-screen ">
      <Header />
      <div className="w-full bg-slate-200">
        <div className="w-1/2 mx-auto">
          <div className="flex pb-20 pt-52">
            <input
              type=""
              placeholder="Tìm bác sĩ ..."
              className="pl-5 w-full h-12 border rounded-l-3xl p-2 bg-white outline-slate-300"
            />
            <button className="hover:bg-green-600 border w-[90px] rounded-r-3xl h-12 bg-white">
              <BiSearch
                size={22}
                className="text-slate-600 ml-5 hover:text-white"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="w-3/4 mx-auto">
          <div className="grid grid-cols-3">
            <div className="col-span-1 mx-5">
              <div className=" bg-slate-200">
                <div className="w-full mt-5">
                  <img
                    src={hinh1}
                    alt=""
                    className="h-52 w-52 pt-5 rounded-full mx-auto"
                  />
                  <div className="text-center mt-5 text-lg font-medium">
                    TRAN NGOC KIEU
                  </div>
                  <div className="text-center mt-2 px-4 py-4">
                    Sức khỏe, sự an toàn của bạn là sứ mệnh và nguồn cảm hứng
                    của chúng tôi
                  </div>
                  {/* <div className="w-full justify-center">
                    <div className="flex text-center border-2 py-3 bg-green-600 font-semibold text-white">
                      <BsPersonCheck className="mt-1" />
                      ĐẶT KHÁM
                    </div>
                  </div> */}
                  <div className="mt-5 grid justify-items-center">
                    <button className="mx-5 py-3 px-5 box-border border-1 bg-rose-600  hover:bg-rose-500 text-white">
                      <div className="flex">
                        <BsPersonCheck className="mr-1" size={25} />
                        ĐẶT LỊCH NGAY
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AllDocTorHome;
