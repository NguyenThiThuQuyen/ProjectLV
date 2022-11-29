import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { BiSearch } from "react-icons/bi";
import { BsPersonCheck } from "react-icons/bs";
import hinh1 from "../assets/upload/h1.png";
import hinh2 from "../assets/upload/h2.png";
import hinh3 from "../assets/upload/h3.png";
import hinh4 from "../assets/upload/h4.png";
import { useDispatch, useSelector } from "react-redux";
import { Buffer } from "buffer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Search from "../components/Search/Search.js";
import { getSearchAPI, dataGetSearch } from "../redux/searchRedux";
import {
  dataGetDoctorHome,
  getAllDoctorHomeAPI,
  getAUserAPI,
  dataCheck,
} from "../redux/userRedux";

import SearchImport from "../components/Search/SearchImport";
const AllDocTorHome = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState([]);
  const check = useSelector(dataCheck);
  const data = useSelector(dataGetDoctorHome);
  const dataSearch = useSelector(dataGetSearch);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllDoctorHomeAPI("ALL"));
  }, [check]);

  useEffect(() => {
    dispatch(getSearchAPI());
  }, []);

  useEffect(() => {
    if (dataSearch.search) {
      setSearch(dataSearch.search);
    }
  }, [dataSearch]);

  const handleDetail = (userId) => {
    navigate(`/detail-doctor/${userId}`);
    dispatch(getAUserAPI(userId));
  };

  return (
    <div className="h-screen">
      <Header />
      <SearchImport />
      <div className="w-full">
        <div className="w-3/4 mb-5 mx-auto">
          <div className="my-10 text-center font-medium text-green-700 text-2xl">
            Trải nghiệm tư vấn hiện đại cùng Children's Care
          </div>
          <div className="grid row-auto">
            <div className="grid grid-cols-4">
              <div className="col-span-1 px-4">
                <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-100">
                  <img src={hinh1} alt="" className="h-32 w-28 pt-5 mx-auto" />
                </div>
                <div className="text-center mt-5">
                  <div className="font-medium text-lg text-sky-600 h-[60px]">
                    Đặt khám từ xa
                  </div>
                  <div className="text-slate-600 mt-3">
                    Bác sĩ của Children's Care luôn sẵn sàng tư vấn và chăm sóc
                    sức khỏe cho bạn mọi lúc mọi nơi
                  </div>
                </div>
              </div>

              <div className="col-span-1 px-4">
                <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-100">
                  <img src={hinh2} alt="" className="h-32 w-28 pt-5 mx-auto" />
                </div>
                <div className="text-center mt-5">
                  <div className="font-medium text-lg text-sky-600 h-[60px]">
                    Đội ngũ chuyên gia và cơ sở y tế hàng đầu
                  </div>
                  <div className="text-slate-600 mt-3">
                    Dễ dàng kết nối với các bác sĩ ưu tú, tận tâm, có chuyên môn
                    cao đến từ các BV tuyến trung ương & phòng khám uy tín
                  </div>
                </div>
              </div>

              <div className="col-span-1 px-4">
                <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-100">
                  <img src={hinh3} alt="" className="h-32 w-28 pt-5 mx-auto" />
                </div>
                <div className="text-center mt-5">
                  <div className="font-medium text-lg text-sky-600 h-[60px]">
                    Tiếp đón ưu tiên với nhiều quyền lợi đặc biệt
                  </div>
                  <div className="text-slate-600 mt-3">
                    Đặt khám hẹn trước tại phòng khám tư vấn cùng nhiều đặc
                    quyền dành riêng cho bạn và gia đình
                  </div>
                </div>
              </div>

              <div className="col-span-1 px-4">
                <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-100">
                  <img src={hinh4} alt="" className="h-32 w-28 pt-5 mx-auto" />
                </div>
                <div className="text-center mt-5">
                  <div className="font-medium text-lg text-sky-600 h-[60px]">
                    Giá khám bằng với giá tại cơ sở y tế
                  </div>
                  <div className="text-slate-600 mt-3">
                    Không những vậy còn giúp bạn tiết kiệm thời gian và các chi
                    phí phát sinh khác
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full pb-32 bg-red-50">
        <div className="w-5/6 mx-auto pt-10">
          <div className="font-semibold text-xl uppercase text-sky-700">
            Chọn bác sĩ
          </div>
          <div className="grid grid-cols-4">
            {data.data &&
              data.data.length > 0 &&
              data.data.map((item, index) => {
                let imageBase64 = "";
                if (item.image) {
                  imageBase64 = new Buffer(item.image, "base64").toString(
                    "binary"
                  );
                }
                return (
                  <>
                    <div className="col-span-1 mx-5 mt-16" key={item.id}>
                      <div className="w-full hover:bg-slate-100 bg-white border h-[340px] border-green-700 shadow-2xl shadow-slate-300 relative">
                        <div
                          className="w-full mt-5"
                          onClick={() => handleDetail(item.id)}
                        >
                          <img
                            src={imageBase64}
                            alt=""
                            className="h-52 w-52 pt-5 rounded-full mx-auto"
                          />
                        </div>
                        <div className="w-full absolute">
                          <div className="w-5/6 mx-auto mt-5 bg-sky-100 border shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-200">
                            <div
                              onClick={() => handleDetail(item.id)}
                              className="text-center mt-5 text-md font-medium uppercase"
                            >
                              {item.name}
                            </div>
                            <div
                              onClick={() => handleDetail(item.id)}
                              className="text-center px-4 text-sm text-slate-500"
                            >
                              Chuyên khoa Nhi
                            </div>
                            <div
                              className="hover:bg-green-800 mt-5 grid justify-items-center bg-green-700"
                              onClick={() => handleDetail(item.id)}
                            >
                              <button className="hover:bg-green-800 mx-5 py-3 px-5 box-border border-1 bg-green-700 text-white">
                                <div className="flex hover:animate-bounce">
                                  <BsPersonCheck className="mr-1" size={25} />
                                  ĐẶT LỊCH NGAY
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AllDocTorHome;
