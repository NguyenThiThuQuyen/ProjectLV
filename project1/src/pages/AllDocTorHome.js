import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { BiSearch } from "react-icons/bi";
import { BsPersonCheck } from "react-icons/bs";
import hinh1 from "../assets/upload/bacsi2.jpg";
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
import { getFindScheduleToDoctorAPI } from "../redux/scheduleRedux";
const AllDocTorHome = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState([]);
  const check = useSelector(dataCheck);
  const data = useSelector(dataGetDoctorHome);
  const dataSearch = useSelector(dataGetSearch);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllDoctorHomeAPI());
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
    // dispatch(getFindScheduleToDoctorAPI(userId));
  };

  return (
    <div className="h-screen">
      <Header />
      <div className="w-full bg-green-50">
        <div className="w-1/2 mx-auto">
          <div
            // data-aos="fade-down"
            className="pt-32"
          >
            {/* <div className="text-center flex ml-72 font-Caveat text-4xl text-rose-600">
              Children's Care
            </div>
            <div className="text-center font-Bangers mt-2 ml-3 text-3xl text-neutral-800 drop-shadow-xl shadow-white">
              Dinh dưỡng hợp lý là nền tảng của
            </div> */}
            <div className="text-center font-SmoochSans mt-2 ml-3 text-4xl text-sky-600 font-medium drop-shadow-xl shadow-white">
              Đăng Ký Khám Qua Childrent's Care
            </div>
            <div className="text-center text-slate-800 font-[430] text-lg">
              Để được tiếp đón ưu tiên hoặc được tư vấn với bác sĩ riêng
            </div>
          </div>
          <Search data={search} placeholder={"Tìm kiếm"} />
          {/* <div className="flex pb-10 mt-5">
            <input
              type=""
              placeholder="Tìm bác sĩ ..."
              className="pl-5 w-full h-12 border hover:border-none rounded-l-3xl p-2 bg-slate-50 shadow-lg outline-slate-300"
            />
            <button className="hover:bg-green-600 border w-[90px] rounded-r-3xl h-12 bg-slate-50 shadow-lg">
              <BiSearch
                size={22}
                className="text-slate-600 ml-5 hover:text-white"
              />
            </button>
          </div> */}
        </div>
      </div>
      <div className="w-full pb-32 bg-slate-200">
        <div className="w-3/4 mx-auto pt-10">
          <div className="font-semibold text-xl">Chọn bác sĩ</div>
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
                      <div className="hover:bg-slate-100 bg-white border border-green-700 shadow-2xl shadow-slate-300">
                        <div className="w-full mt-5">
                          <img
                            src={imageBase64}
                            alt=""
                            className="h-48 w-48 pt-5 rounded-full mx-auto"
                          />
                          <div className="text-center mt-5 text-lg font-medium uppercase">
                            {item.name}
                          </div>
                          {/* <div className="text-center mt-2 px-4 py-4 text-slate-500">
                            Sức khỏe, sự an toàn của bạn là sứ mệnh và nguồn cảm
                            hứng của chúng tôi
                          </div> */}
                          <div className="text-center px-4 text-sm text-slate-500">
                            Chuyên khoa Nhi
                          </div>
                          <div
                            className="hover:bg-green-800 mt-5 grid justify-items-center bg-green-700"
                            onClick={() => handleDetail(item.id)}
                            // onClick={(e) => handleFindSchedule(e.target.value)}
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
