import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import hinh1 from "../assets/upload/new1.bb081b99.jpg";
import hinh2 from "../assets/upload/new2.6ba3e73f.jpg";
import hinh3 from "../assets/upload/new3.428dc3ad.jpg";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import { TbBellRinging } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { getSearchAPI, dataGetSearch } from "../redux/searchRedux";
import { Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import {
  getAllMedicalPackageHomeAllAPI,
  dataGetAllGoiKhamHomeAll,
  getGoiKhamAPI,
} from "../redux/goiKhamRedux";
import SearchImport from "../components/Search/SearchImport";

const Service = () => {
  const [search, setSearch] = useState([]);
  const dataSearch = useSelector(dataGetSearch);
  const dispatch = useDispatch();
  const dataPackage = useSelector(dataGetAllGoiKhamHomeAll);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllMedicalPackageHomeAllAPI());
  }, []);

  useEffect(() => {
    dispatch(getSearchAPI());
  }, []);

  useEffect(() => {
    if (dataSearch.search) {
      setSearch(dataSearch.search);
    }
  }, [dataSearch]);

  const handleDetailService = (medicalpackageId) => {
    navigate(`/detail-service/${medicalpackageId}`);
    dispatch(getGoiKhamAPI(medicalpackageId));
  };

  return (
    <div className="h-screen ">
      <Header />
      <SearchImport />

      <div className="grid row-auto">
        <div className="grid grid-cols-3 ">
          <div className="col-span-2">
            <div className="px-12 py-5">
              <div className="border-[1px] shadow-xl bg-violet-100">
                <div className="p-5 text-red-700 text-xl font-semibold underline underline-offset-8">
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
                        <div className="bg-white hover:text-white hover:bg-blue-300 my-10 border-solid border border-slate-200 shadow-xl shadow-slate-300 items-center justify-items-center h-auto mx-auto w-9/12">
                          <div className="grid grid-cols-2 justify-items-center">
                            <div
                              className="col-span-1 my-5"
                              onClick={() => handleDetailService(item.id)}
                            >
                              <img
                                src={imageBase64}
                                alt=""
                                className="h-[180px] w-[260px]"
                              />
                            </div>
                            <div className="col-span-1 w-full mt-5">
                              <div
                                className="font-medium text-green-800 uppercase"
                                onClick={() => handleDetailService(item.id)}
                              >
                                {item.packageName}
                              </div>
                              <div
                                className="text-sm"
                                onClick={() => handleDetailService(item.id)}
                              >
                                {item.packageDecs}
                              </div>
                              <Link to="/dang-ky-tu-van">
                                <button className="font-medium mt-5 text-white hover:text-yellow-700 border-2 p-2 rounded-md bg-yellow-600 hover:bg-white hover:border-yellow-500">
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
          </div>
          <div className="col-span-1 border-slate-300">
            <div className="px-16 py-5 w-full">
              <div className="ml-5 text-sky-700 text-xl font-semibold underline underline-offset-8">
                QUY TRÌNH THANH TOÁN
              </div>

              <div
                data-aos="fade-right"
                data-aos-duration="1000"
                className="mx-auto w-2/3 relative"
              >
                <div className="mt-16">
                  <img className="rounded-sm" src={hinh1} alt="" />
                </div>
                <div className="absolute px-3 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300">
                  <div className="pb-3 shadow-xl bg-white p-3 mt-[-50px]">
                    <div className="mt-2 text-center font-medium hover:text-sky-600">
                      Đặt khám nhanh chóng
                    </div>
                    <div className="mt-3 text-sm text-slate-700 text-center">
                      Bệnh nhân chủ động chọn thông tin đặt khám (ngày khám và
                      giờ khám)
                    </div>
                  </div>
                </div>
              </div>

              <div
                data-aos="fade-right"
                data-aos-duration="1000"
                className="mx-auto mt-32 w-2/3 relative"
              >
                <div className="mt-16">
                  <img className="rounded-sm" src={hinh2} alt="" />
                </div>
                <div className="absolute px-3 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300">
                  <div className="pb-3 shadow-xl bg-white p-3 mt-[-50px]">
                    <div className="mt-2 text-center font-medium hover:text-sky-600">
                      Thanh toán dễ dàng
                    </div>
                    <div className="mt-3 text-sm text-slate-700 text-center">
                      Người dùng chọn và thực hiện thanh toán trực tiếp tại quầy
                    </div>
                  </div>
                </div>
              </div>

              <div
                data-aos="fade-right"
                data-aos-duration="1000"
                className="mx-auto mt-32 w-2/3 relative"
              >
                <div className="mt-16">
                  <img className="rounded-sm" src={hinh3} alt="" />
                </div>
                <div className="absolute px-3 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300">
                  <div className="pb-3 shadow-xl bg-white p-3 mt-[-50px]">
                    <div className="mt-2 text-center font-medium hover:text-sky-600">
                      Nhận phiếu trực tiếp
                    </div>
                    <div className="mt-3 text-sm text-slate-700 text-center">
                      Bệnh nhân sẽ nhận phiếu khám trực tiếp thông qua gmail
                      hoặc tại quầy
                    </div>
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

export default Service;
