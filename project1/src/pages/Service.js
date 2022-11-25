import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import hinh1 from "../assets/upload/Cover02-5939-1559712582.jpg";
import { Buffer } from "buffer";
import { TbBellRinging } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { getSearchAPI, dataGetSearch } from "../redux/searchRedux";
import { Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Search from "../components/Search/Search.js";

import {
  getAllMedicalPackageHomeAllAPI,
  dataGetAllGoiKhamHomeAll,
} from "../redux/goiKhamRedux";

const Service = () => {
  const [search, setSearch] = useState([]);
  const dataSearch = useSelector(dataGetSearch);
  const dispatch = useDispatch();
  const dataPackage = useSelector(dataGetAllGoiKhamHomeAll);

  useEffect(() => {
    dispatch(getAllMedicalPackageHomeAllAPI());
  }, []);

  useEffect(() => {
    if (dataSearch.search) {
      setSearch(dataSearch.search);
    }
  }, [dataSearch]);

  return (
    <div className="h-screen ">
      <Header />
      <div className="w-full">
        {/* <div className="w-full mx-auto">
          <img className="h-2/3 w-3/4 mx-auto " src={hinh1} alt="" />
        </div> */}
        <div className="w-1/2 mx-auto">
          <div className="pt-32">
            <div className="text-center font-SmoochSans mt-2 ml-3 text-4xl text-sky-600 font-medium drop-shadow-xl shadow-white">
              Đăng Ký Khám Qua Childrent's Care
            </div>
            <div className="text-center text-slate-800 font-[430] text-lg">
              Để được tiếp đón ưu tiên hoặc được tư vấn với bác sĩ riêng
            </div>
          </div>
          <Search
            data={search}
            placeholder={"Tìm kiếm bác sĩ, danh mục, dịch vụ ..."}
          />
        </div>
      </div>

      <div className="grid row-auto">
        <div className="grid grid-cols-3">
          <div className="col-span-2">
            <div className="p-16 bg-slate-200">
              <div className="text-red-700 text-xl font-semibold underline underline-offset-8">
                GÓI TƯ VẤN DINH DƯỠNG CHO TRẺ
              </div>
              <div className="" data-aos="fade-up" data-aos-duration="1500">
                {dataPackage.data &&
                  dataPackage.data.length > 0 &&
                  dataPackage.data.map((item, index) => {
                    let imageBase64 = "";
                    if (item.image) {
                      imageBase64 = new Buffer(item.image, "base64").toString(
                        "binary"
                      );
                    }
                    return (
                      <div className="bg-white hover:text-white hover:bg-blue-300 my-10 border-solid border border-slate-200 shadow-md shadow-slate-300 items-center justify-items-center h-auto mx-auto w-9/12">
                        <div className="grid grid-cols-2 justify-items-center">
                          <div className="col-span-1 my-5">
                            <img
                              src={imageBase64}
                              alt=""
                              className="h-[180px] w-[260px]"
                            />
                          </div>
                          <div className="col-span-1 w-full mt-5">
                            <div className="font-medium text-green-800 uppercase">
                              {item.packageName}
                            </div>
                            <div className="text-sm">{item.packageDecs}</div>
                            <div className=""></div>
                            <Link to="/dang-ky-tu-van">
                              <button className="font-medium mt-5 hover:text-pink-700 border-2 p-2 rounded-md bg-pink-500 hover:bg-white hover:border-pink-500">
                                {/* TƯ VẤN NGAY */}
                                <div className="flex animate-pulse">
                                  <TbBellRinging
                                    className="animate-bounce mr-1 mt-1"
                                    size={23}
                                  />
                                  TƯ VẤN NGAY
                                </div>
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="p-16 bg-lime-50">
              <div className="text-red-700 text-xl font-semibold underline underline-offset-8">
                QUY TRÌNH THANH TOÁN
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
      <Footer />
    </div>
  );
};

export default Service;
